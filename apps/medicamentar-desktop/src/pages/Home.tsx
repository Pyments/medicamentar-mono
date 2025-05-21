import Header from "@components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { useSwrFetch } from "@hooks/swr/useSwrFetch";
import CardUniversal from "@components/CardUniversal";
import { useLocalStorage } from "@hooks/UseLocalStorage.tsx";
import { SectionContainer } from "@components/SectionContainer";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { PageTitle } from "@components/PageTitle";

import { useTheme } from "@constants/theme/useTheme";
import { Loader } from "@components/Loader";
import { useActiveAndSorted } from "@hooks/useActiveAndSorted";
import { Dayjs } from "dayjs";

interface EventData {
  id: string;
  name?: string;
  details: {
    type: string;
    endDate?: Dayjs;
    startDate?: Dayjs;
    nextDose?: Dayjs;
    dose?: string;
    period?: number;
    amount?: number;
    unity?: string;
    continuousUse?: boolean;
  };
  local?: string;
  date?: Dayjs;
  doctorName?: string;
  description?: string;
  isCompleted: boolean;
  type: string;
}

interface User {
  token: {
    data: string;
  };
}

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [page, setPage] = useState(0);
  const [user] = useLocalStorage<User | null>("user", null);
  
  const { data, isLoading: loading, mutate } = useSwrFetch<{
    totalPages: number;
    data: { events: EventData[] };
  }>('/events', { page, size: 9 });
  
  const events = data?.data?.events || [];
  const _pageCount = data?.totalPages || 0;
  
  const fetchEvents = () => {
    mutate();
  };

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
        <Grid container spacing={3} pb="75px">
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
            events.map((event: EventData) => {
              const isMedication = "startDate" in event;
              const title = event.name || event.doctorName || "Sem título";

              return (
                <Grid item key={event.id}>
                  <CardUniversal
                    id={event.id}
                    type={event.type}
                    isCompleted={event.isCompleted}
                    title={title}
                    unity={event.details.unity}
                    description={event.description || undefined}
                    date={event.date || undefined}
                    local={event.details.local || undefined}
                    startDate={
                      isMedication ? event.details.startDate : undefined
                    }
                    endDate={isMedication ? event.details.endDate : undefined}
                    continuousUse={event.details.continuousUse || undefined}
                    amount={event.details.amount || undefined}
                    dose={Number(event.details.dose) || undefined}
                    nextDose={event.details.nextDose || undefined}
                    period={event.details.period || undefined}
                    onComplete={() => fetchEvents()}
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
              width="100%"
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
