import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import GridItem from "@components/GridItem";
import { Loader } from "@components/Loader";
import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { lazy, Suspense, useState } from "react";
import { useSwrFetch } from "@hooks/swr/useSwrFetch";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { longDate, shortDate } from "../types/sanitizeDate";

const Typography = lazy(() => import("@mui/material/Typography"));

const History = () => {
  const { darkMode } = useTheme();
  const [user] = useLocalStorage<{ token?: { data: string } } | undefined>(
    "user",
    undefined
  );
  const [page, setPage] = useState(0);
  
  const { data: historyData, isLoading: loading, mutate } = useSwrFetch<{
    data: any[];
    totalPages: number;
  }>('/eventsLog', { page });
  
  const data = historyData?.data || [];
  const pageCount = historyData?.totalPages || 0;
  
  const getHistory = async () => {
    return mutate();
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const displayHistoryCards = () => {
    return data.map((event: any) => {
      if (!event?.eventData) return null;

      const processedEvent = {
        id: event.id,
        name: event.eventData.name,
        date: longDate(event.eventData.date),
        eventDate: shortDate(event.eventDate),
        doctorName: event.eventData.doctorName,
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
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              display: "flex",
              flexGrow: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: darkMode
                ? "primary.darker"
                : "background.default",
            }}
          >
            <Loader />
          </Box>
        )}
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
            {pageCount > 1 && (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Pagination
                  page={page + 1}
                  color="primary"
                  count={pageCount}
                  onChange={handlePagination}
                  sx={{
                    "& .MuiPaginationItem-ellipsis": {
                      color: darkMode ? "common.white" : "primary.main",
                    },
                    "& .MuiPaginationItem-page.Mui-selected": {
                      backgroundColor: darkMode
                        ? "primary.darker"
                        : "primary.main",
                      color: "white",
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default History;
