import Header from "@components/Header";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";
import CardUniversal from "@components/CardUniversal";
import { useLocalStorage } from "@hooks/UseLocalStorage.tsx";
import { SectionContainer } from "@components/SectionContainer";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { ContainerUniversal } from "@components/ContainerUniversal";

import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";

interface EventData {
  id: string;
  type: string;
  name: string;
  date: string;
  local: string;
  unity: string;
  amount: string;
  doctorName: string;
  description: string;
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
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
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
        const combinedEvents = [
          ...consultationEvents,
          ...examEvents,
          ...medicationEvents,
        ];
        handlePagination;
        setPageCount(response.data.totalPages);
        setEvents(combinedEvents);
      } catch (error) {
        console.error("Erro na requisição:", error);
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
                description={event.description || event.type}
                dateTime={event.date || event.amount + " " + event.unity}
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
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Home;
