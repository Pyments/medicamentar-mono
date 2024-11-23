import Header from "@components/Header";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardUniversal from "@components/CardUniversal";
import { useLocalStorage } from "@hooks/UseLocalStorage.tsx";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";

import { useTheme } from "@constants/theme/useTheme";
import axiosInstance from "@utils/axiosInstance";

interface EventData {
  type: string;
  amount: string;
  id: string;
  name: string;
  description: string;
  date: string;
  local: string;
  unity:string;
  doctorName:string;
}
interface User {
  token: {
    data: string;
  };
}

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [events, setEvents] = useState<EventData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events?page=0&size=6", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Resposta completa da API:", response.data);
        const consultationEvents =response.data.data.consultationResponse || [];
        const examEvents = response.data.data.examResponse || [];
        const medicationEvents = response.data.data.medicationResponse || [];

        const combinedEvents = [
          ...consultationEvents,
          ...examEvents,
          ...medicationEvents,
        ];

        console.log("LISTA DE TODOS OS EVENTOS: ", combinedEvents);
        setEvents(combinedEvents);
      } catch (error) {
        console.error("Erro na requisição:", error);
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
            sx={{
              p: 0,
              mt: 0,
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: { xs: "center", md: "left" },
              color: darkMode ? "common.white" : "primary.main",
            }}
          >
            EVENTOS PRÓXIMOS
          </Box>
        </Typography>
       
          <Grid container spacing={3} pb="75px">
            {events.length > 0 ? (
              events.map((event) => (
                <CardUniversal
                  key={event.id}
                  type="events"
                  title={event.name || event.doctorName}
                  description={event.description || event.type }
                  dateTime={event.date || event.amount + " " +event.unity}
                />
              ))
            ) : (
              <Typography
              sx={{
                margin: "auto",
                mt: "50px",
                color: darkMode ? "common.white" : "commonm.dark",
              }}
            >
              Nenhum evento encontrado.
            </Typography>
            )}
          </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Home;
