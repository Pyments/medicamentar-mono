import { app, BrowserWindow, Menu, Notification, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import Store from "electron-store";
import path from "node:path";

const store = new Store();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

ipcMain.handle("electron-store-get", (_event, key) => {
  return store.get(key);
});

ipcMain.handle("electron-store-set", (_event, key, value) => {
  store.set(key, value);
});

ipcMain.handle("electron-store-delete", (_event, key) => {
  store.delete(key);
});

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icons/medicamentar_logo_sm.svg"),
    width: 1200,
    height: 800,
    minWidth: 720,
    minHeight: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.mjs"),
      devTools: true,
    },
  });

  Menu.setApplicationMenu(null);

  // Add extensive error logging
  win.webContents.on("did-fail-load", (_event, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.executeJavaScript(`
    `);
  });

  if (app.isPackaged) {
    const indexPath = path.join(__dirname, "..", "dist", "index.html");
    win.loadFile(indexPath).catch((err) => {
      console.error("Error loading file:", err);
    });
  } else {
    win.loadURL(VITE_DEV_SERVER_URL || "http://localhost:5173/");
  }
}

// Add this before app.whenReady()
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

app.on("web-contents-created", (_event, contents) => {
  contents.on("did-fail-load", (_event, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
  });
});

app.whenReady().then(createWindow);

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

interface OphthalmicDetails {
  leftEyeDrops: number;
  rightEyeDrops: number;
}

interface MedicationResponse {
  id: string;
  name: string;
  type:
  | "ORAL"
  | "TOPICO"
  | "OFTALMICO"
  | "INTRANASAL"
  | "INJETAVEL"
  | "SUBLINGUAL"
  | "TRANSDERMICO"
  | "RETAL"
  | "VAGINAL";
  dose: string;
  amount: number;
  unity: string;
  ophthalmicDetails?: OphthalmicDetails;
  startDate: string;
}

interface ConsultationResponse {
  doctorName: string;
  date: string;
}

interface ExamResponse {
  name: string;
  date: string;
}

interface ApiResponse {
  medicationResponse: MedicationResponse[];
  consultationResponse: ConsultationResponse[];
  examResponse: ExamResponse[];
}

let token: { token: { data: string } } | null = null;

interface NotificationSent {
  id: string;
  timestamp: number;
}

function getMedicationMessage(med: MedicationResponse): string {
  const { name, type, dose, amount, unity, ophthalmicDetails } = med;

  switch (type) {
    case "ORAL":
      return `Está na hora de tomar ${amount} ${unity} de ${name}.`;
    case "TOPICO":
      return `Aplique ${amount} ${unity} de ${name}.`;
    case "OFTALMICO":
      if (ophthalmicDetails) {
        const { leftEyeDrops, rightEyeDrops } = ophthalmicDetails;
        return `Aplique ${leftEyeDrops} gotas no olho esquerdo e ${rightEyeDrops} no olho direito de ${name}.`;
      }
      return `Siga as instruções para aplicar ${name}.`;
    case "INTRANASAL":
      return `Administre ${amount} ${unity} de ${name} por via intranasal.`;
    case "INJETAVEL":
      return `Administre ${amount} ${unity} de ${name} por injeção.`;
    case "SUBLINGUAL":
      return `Coloque ${amount} ${unity} de ${name} debaixo da língua.`;
    case "TRANSDERMICO":
      return `Aplique o adesivo de ${name} na pele.`;
    case "RETAL":
      return `Administre ${amount} ${unity} de ${name} por via retal.`;
    case "VAGINAL":
      return `Insira ${amount} ${unity} de ${name} por via vaginal.`;
    default:
      return `Está na hora de usar ${name}.`;
  }
}

const sentNotifications = new Map<string, NotificationSent>();

function shouldNotify(eventId: string, thresholdMinutes: number): boolean {
  const now = Date.now();
  const notification = sentNotifications.get(eventId);

  if (
    !notification ||
    now - notification.timestamp > thresholdMinutes * 60 * 1000
  ) {
    sentNotifications.set(eventId, { id: eventId, timestamp: now });
    return true;
  }
  return false;
}

async function checkEvents() {
  if (!token) {
    console.warn("Token não disponível. Ignorando verificação de eventos.");
    return;
  }

  try {
    const response = await fetch(
      "https://medicamentar-api-latest-9piq.onrender.com/events",
      {
        headers: {
          Authorization: `Bearer ${token.token.data}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar eventos:", response.statusText);
      return;
    }

    const { data }: { data: ApiResponse } = await response.json();
    const now = new Date();

    const processEvent = (
      event: { id: string; date: string; message: string },
      thresholdMinutes: number,
      title: string
    ) => {
      const eventTime = new Date(event.date);
      const diffMinutes = (eventTime.getTime() - now.getTime()) / (1000 * 60);
      if (
        diffMinutes <= thresholdMinutes &&
        diffMinutes > 0 &&
        shouldNotify(event.id, thresholdMinutes)
      ) {
        new Notification({ title, body: event.message }).show();
      }
    };

    data.medicationResponse.forEach((med: MedicationResponse) =>
      processEvent(
        { id: med.id, date: med.startDate, message: getMedicationMessage(med) },
        5,
        "Medicamento Próximo"
      )
    );

    data.consultationResponse.forEach((consult: ConsultationResponse) =>
      processEvent(
        {
          id: consult.doctorName,
          date: consult.date,
          message: `Consulta com ${consult.doctorName}`,
        },
        15,
        "Consulta Próxima"
      )
    );

    data.examResponse.forEach((exam: ExamResponse) =>
      processEvent(
        { id: exam.name, date: exam.date, message: `Exame ${exam.name}` },
        15,
        "Exame Próximo"
      )
    );
  } catch (error) {
    console.error("Erro ao verificar eventos:", error);
  }
}

ipcMain.on("send-user-data", (_event, userData) => {
  try {
    if (typeof userData === "string") {
      userData = JSON.parse(userData);
    }

    if (userData?.token?.data) {
      store.set("user", JSON.stringify(userData));
      token = userData;
    } else {
      console.warn("Estrutura de userData não é válida:", userData);
    }
  } catch (error) {
    console.error("Erro ao analisar userData recebido:", error);
  }
});

app.whenReady().then(() => {
  const rawToken = store.get("user");
  token = rawToken ? JSON.parse(rawToken as string) : null;
  setInterval(checkEvents, 60 * 1000);
});
