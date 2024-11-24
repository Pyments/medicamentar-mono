import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { useEffect, useState } from "react";
import { AddBtn } from "@components/AddBtn";
import axiosInstance from "@utils/axiosInstance";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { Box, Grid, Typography, Stack, Pagination } from "@mui/material";

import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";

interface ExamData {
  id: string;
  type: string;
  name: string;
  date: string;
  local: string;
}
interface User {
  token: {
    data: string;
  };
}
const Exam = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const [exams, setExams] = useState<ExamData[]>([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get(`/exam?page=${page}&size=9`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Lista de Exames e Consultas:", response.data.data);
      setExams(response.data.data);
      setPageCount(response.data.getTotalPages);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExams();
    }
  }, [token, page]);

  const handleModal = () => {
    setOpen(!open);
  };

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
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
              CONSULTAS E EXAMES
            </Box>
          </Typography>
          <AddBtn handleModal={handleModal} text="consulta ou exame" />
        </Stack>
        <Grid container spacing={3} pb="75px">
          {exams.length > 0 ? (
            exams.map((exam) => (
              <CardUniversal
                key={exam.id}
                title={exam.name}
                dateTime={exam.date}
                description={exam.local}
                type="events"
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
              Nenhuma consulta ou exame encontrado.
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
      {open && (
        <ExamModal open={open} onClose={handleModal} fetchExams={fetchExams} />
      )}
    </ContainerUniversal>
  );
};

export default Exam;
