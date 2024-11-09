import { app, BrowserWindow, ipcMain } from "electron";
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
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.mjs"),
      devTools: true
    },
  });

  // Add extensive error logging
  win.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  win.webContents.on('did-finish-load', () => {
    console.log('Page finished loading');
    // Log the HTML content for debugging
    win?.webContents.executeJavaScript(`
      console.log('Document HTML:', document.documentElement.innerHTML);
      console.log('Root element:', document.getElementById('root'));
    `);
  });

  if (app.isPackaged) {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    console.log('Loading file from:', indexPath);
    win.loadFile(indexPath).catch(err => {
      console.error('Error loading file:', err);
    });
  } else {
    win.loadURL(VITE_DEV_SERVER_URL || "http://localhost:5173/");
  }
}

// Add this before app.whenReady()
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

app.on('web-contents-created', (_event, contents) => {
  contents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
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
