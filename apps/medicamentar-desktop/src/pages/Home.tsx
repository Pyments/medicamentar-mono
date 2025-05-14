import Header from "@components/Header";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";
import CardUniversal from "@components/CardUniversal";
import { useLocalStorage } from "@hooks/UseLocalStorage.tsx";
import { SectionContainer } from "@components/SectionContainer";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { PageTitle } from "@components/PageTitle";

import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { Loader } from "@components/Loader";
import { useActiveAndSorted } from "@hooks/useActiveAndSorted";
import { Dayjs } from "dayjs";

interface EventData {
  id: string;
  type: string;
  name?: string;
  local?: string;
  unity?: number;
  amount?: number;
  date?: Dayjs;
  endDate?: Dayjs;
  startDate?: Dayjs;
  doctorName?: string;
  description?: string;
  continuousUse?: boolean;
  dose?: string;
  period?: number;
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
  const [page, setPage] = useState(0);
  const [_pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          `/events?page=${page}&size=9`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const consultationEvents =
          response.data.data.consultationResponse || [];
        const examEvents = response.data.data.examResponse || [];
        const medicationEvents = response.data.data.medicationResponse || [];
        setPageCount(response.data.totalPages);
        setEvents([...consultationEvents, ...examEvents, ...medicationEvents]);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchEvents();
    }
  }, [token, page]);

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const sortedEvents = useActiveAndSorted(events, {
    type: "event",
    continuousField: "continuousUse",
    startDateField: "startDate",
    endDateField: "endDate",
    dateField: "date",
  });

  const pageSize = 9;
  const totalPages = Math.ceil(sortedEvents.length / pageSize);
  const paginatedEvents = sortedEvents.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <ContainerUniversal>
      <Header />
      <SideBar />
      <SectionContainer>
        <PageTitle>EVENTOS PRÓXIMOS</PageTitle>

        <Grid
          container
          spacing={3}
          pb="75px"
          sx={{
            gap: 2,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {loading ? (
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: "50vh",
                  width: "100%",
                }}
              >
                <Loader
                  sx={{
                    color: darkMode ? "common.white" : "primary.main",
                  }}
                />
              </Stack>
            </Grid>
          ) : paginatedEvents.length > 0 ? (
            events.map((event) => {
              const isMedication = "startDate" in event;
              const title = event.name || event.doctorName || "Sem título";

              return (
                <Grid item key={event.id}>
                  <CardUniversal
                    type={event.type}
                    title={title}
                    unity={event.unity}
                    description={event.description || undefined}
                    dateTime={!isMedication ? event.date : undefined}
                    startDate={isMedication ? event.startDate : undefined}
                    endDate={isMedication ? event.endDate : undefined}
                    continuousUse={
                      isMedication ? event.continuousUse : undefined
                    }
                    dose={isMedication ? Number(event.dose) : undefined}
                    qtpDose={isMedication ? event.amount : undefined}
                    period={isMedication ? event.period : undefined}
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography
                sx={{
                  margin: "auto",
                  mt: "50px",
                  color: darkMode ? "common.white" : "common.dark",
                }}
              >
                Nenhum evento encontrado.
              </Typography>
            </Grid>
          )}

          {paginatedEvents.length > 0 && totalPages > 1 && (
            <Box
              gridColumn="1 / -1"
              display="flex"
              justifyContent="center"
              mt={2}
            >
              <Pagination
                page={page + 1}
                color="primary"
                count={totalPages}
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
            </Box>
          )}
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Home;
