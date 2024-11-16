import axios from "axios";

const API_BASE_URL = "https://medicamentar-api-latest.onrender.com";

export async function checkEventsAndMedications() {
  const userString = window.localStorage.getItem("user");
  //   window.electron.ipcRenderer.showNotification("test", "test");

  if (userString) {
    try {
      const user = JSON.parse(userString);

      // Requisições para eventos e medicamentos
      const eventsResponse = await axios.get(
        "https://medicamentar-api-latest.onrender.com/events?page=0&size=6",
        {
          headers: { Authorization: `Bearer ${user.token.data}` },
        }
      );

      const consultationEvents = eventsResponse.data.data.consultationResponse;
      console.log(consultationEvents);

      const examEvents = eventsResponse.data.data.examResponse;
      console.log(examEvents);

      const medicationsResponse = await axios.get(
        `${API_BASE_URL}/medication`,
        {
          headers: { Authorization: `Bearer ${user.token.data}` },
        }
      );
      const medications = medicationsResponse.data.data;
      console.log(medications);

      const now = new Date();

      consultationEvents.forEach((event: { date: string; name: string }) => {
        const eventTime = new Date(event.date);
        const diffMinutes = (eventTime.getTime() - now.getTime()) / 1000 / 60;

        if (diffMinutes > 0 && diffMinutes <= 15) {
          window.electron.ipcRenderer.showNotification(
            "Consulta próxima",
            `Consulta ${event.name} começa às ${eventTime.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}!`
          );
        }
      });

      examEvents.forEach((event: { date: string; name: string }) => {
        const eventTime = new Date(event.date);
        const diffMinutes = (eventTime.getTime() - now.getTime()) / 1000 / 60;

        if (diffMinutes > 0 && diffMinutes <= 15) {
          window.electron.ipcRenderer.showNotification(
            "Exame próximo",
            `Exame ${event.name} começa às ${eventTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}!`
          );
        }
      });

      // Verifica medicamentos próximos
      medications.forEach((med: { date: string; name: string }) => {
        const medTime = new Date(med.date);
        const diffMinutes = (medTime.getTime() - now.getTime()) / 1000 / 60;

        if (diffMinutes > 0 && diffMinutes <= 5) {
          // Chama o método exposto pelo preload.js para mostrar a notificação
          window.electron.ipcRenderer.showNotification(
            "Hora de tomar medicação",
            `Tome ${med.name} às ${medTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}!`
          );
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    console.error("Usuário não encontrado no localStorage");
  }
}

// Agendar a execução da verificação a cada 5 minutos
setInterval(checkEventsAndMedications, 5 * 60 * 1000);
