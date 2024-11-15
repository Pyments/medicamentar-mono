import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { Box, Grid, Stack } from "@mui/material";
import { useTheme } from "../constants/theme/useTheme";
import GridItem from "../components/GridItem";
import axios from "axios";
import { SectionContainer } from "../components/SectionContainer.tsx";
import { ContainerUniversal } from "../components/ContainerUniversal.tsx";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/UseLocalStorage.tsx";

const History = () => {
  const { darkMode } = useTheme();
  const [user] = useLocalStorage<{ token?: { data: string } } | undefined>(
    "user",
    undefined
  );
  const token = user?.token?.data;
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getHistory = async () => {
        const response = await axios.get(
          "https://medicamentar-api-latest.onrender.com/eventsLog",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
        console.log(response.data.data);
        console.log(response.data);
      };
      getHistory();
    } catch (e) {
      console.log(e);
    }
  }, [token]);

  const displayHistoryCards = () => {
    return data.map((event: any) => {
      if (!event?.eventData) return null;
      
      const processedEvent = {
        id: event.eventData.id,
        name: event.eventData.name,
        date: new Date(event.eventData.date).toLocaleString(),
        eventDate: new Date(event.eventDate).toLocaleString(),
        doctorName: event.eventData.doctorName || null,
        local: event.eventData.local,
        description: event.eventData.description,
        action: event.eventAction,
      };
      
      return (
        <Grid item key={processedEvent.id}>
          <GridItem
            description={processedEvent.description?.toUpperCase()}
            name={processedEvent.name?.toUpperCase()}
            actionType={processedEvent.action}
            date={processedEvent.date}
            eventDate={processedEvent.eventDate}
            medic={processedEvent.doctorName && 
              "CONSULTA COM DOUTOR(A) " + processedEvent.doctorName.toUpperCase()}
          />
        </Grid>
      );
    });
  };

  return (
    <ContainerUniversal>
      <Header />
      <Sidebar />
      <SectionContainer>
        <Stack sx={{ alignItems: "center" }} spacing="67px">
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: darkMode ? "text.primary" : "primary.darker",
              alignSelf: "start",
            }}
          >
            HISTÓRICO
          </Box>
          <Grid container spacing={2}>
            {displayHistoryCards()}
          </Grid>
        </Stack>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default History;
