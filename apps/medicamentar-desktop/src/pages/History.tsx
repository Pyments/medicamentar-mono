import Header from "@components/Header";
import Sidebar from "@components/SideBar";
import GridItem from "@components/GridItem";
import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { lazy, Suspense, useEffect, useState } from "react";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { PageTitle } from "@components/PageTitle";
const Typography = lazy(() => import("@mui/material/Typography"));

const History = () => {
  const { darkMode } = useTheme();
  const [user] = useLocalStorage<{ token?: { data: string } } | undefined>(
    "user",
    undefined
  );
  const token = user?.token?.data;
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    try {
      const getHistory = async () => {
        const response = await axiosInstance.get("/eventsLog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setPageCount(response.data.totalPages);
      };
      getHistory();
    } catch (e) {
    }
  }, [token, page]);

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
            <PageTitle>HISTÓRICO</PageTitle>
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
