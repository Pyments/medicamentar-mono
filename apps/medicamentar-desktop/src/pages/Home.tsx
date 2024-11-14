import { Box, Grid, Typography } from "@mui/material";
import Header from "../components/Header.tsx";
import SideBar from "../components/SideBar.tsx";
import CardUniversal from "../components/CardUniversal.tsx";
import { useTheme } from "../constants/theme/useTheme";
import { SectionContainer } from "../components/SectionContainer.tsx";
import { ContainerUniversal } from "../components/ContainerUniversal.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/UseLocalStorage.tsx";

interface EventData {
  type: string;
  period: string;
  id: string;
  name: string;
  description: string;
  date: string;
  local: string;
  doctorName: string;
}
interface User {
  token: {
    data: string;
  };
}

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events?page=0&size=6", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Resposta completa da API:", response.data);
        const consultationEvents = response.data.data.consultationResponse || [];
        const examEvents = response.data.data.examResponse || [];
        const medicationEvents = response.data.data.medicationResponse || [];
  
       //console.log("EVENTOS: consultationResponse:", consultationEvents);
        //console.log("EVENTOS: examResponse:", examEvents);
       // console.log("EVENTOS: medicationResponse:", medicationEvents);

        const combinedEvents = [
          ...consultationEvents,
          ...examEvents,
          ...medicationEvents,
        ];

        console.log("LISTA DE TODOS OS EVENTOS: ", combinedEvents);
        setEvents(combinedEvents);
        setError(null); 
      } catch (error) {
        console.error("Erro na requisição:", error);
        setError("Erro ao carregar eventos.");
      } finally {
        setLoading(false); 
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token]);

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
        <Typography
          sx={{
            color: "primary.dark",
          }}
        >
          <Box
            component="h1"
            sx={{
              p: 0,
              mt: 0,
              color: darkMode ? "common.white" : "primary.main",
            }}
          >
            EVENTOS PRÓXIMOS
          </Box>
        </Typography>
        {loading ? (
          <Typography>Carregando eventos...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3} pb="75px">
            {events.length > 0 ? (
              events.map((event) => (
                <CardUniversal
                  key={event.id}
                  type="events"
                  title={event.name || event.doctorName}
                  description={event.description || event.type}
                  dateTime={event.date || event.period}
                />
              ))
            ) : (
              <Typography>Nenhum evento encontrado.</Typography>
            )}
          </Grid>
        )}
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Home;