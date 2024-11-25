import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import { lazy, Suspense, useEffect, useState } from "react";
import GridItem from "@components/GridItem";
import { Box, Grid, Stack } from "@mui/material";
import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
const Typography = lazy(() => import("@mui/material/Typography"));

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
        const response = await axiosInstance.get("/eventsLog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        doctorName: event.eventData.doctorName,
        local: event.eventData.local,
        description: event.eventData.description,
        action: event.eventAction,
      };

      return (
        <Grid item key={processedEvent.id}>
          <GridItem
            id={processedEvent.id}
            description={processedEvent.description?.toUpperCase()}
            name={processedEvent.name?.toUpperCase()}
            actionType={processedEvent.action}
            date={processedEvent.date}
            eventDate={processedEvent.eventDate}
            doctorName={
              processedEvent.doctorName &&
              "CONSULTA COM DOUTOR(A) " +
                processedEvent.doctorName.toUpperCase()
            }
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
            {displayHistoryCards() || (
              <Suspense fallback="Carregando...">
                <Typography>Ainda não foi realizada nenhuma ação</Typography>
              </Suspense>
            )}
          </Grid>
        </Stack>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default History;
