import { useEffect, useState } from "react";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { AddBtn } from "@components/AddBtn";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import axiosInstance from "@utils/axiosInstance";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";

interface ExamData{
  id:string,
  type:string,
  name: string,
  local:string,
  date:string,
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


  
    const fetchExams  = async () => {
      try {
        const response = await axiosInstance.get("/exam", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Lista de Exames e Consultas:",response.data.data);
        setExams(response.data.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    useEffect(() => {
      if (token) {
        fetchExams();
      }
    }, [token]);

  const handleModal = () => {
    setOpen(!open);
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
         
        </Grid>
      </SectionContainer>
      {open && <ExamModal open={open} onClose={handleModal} fetchExams={fetchExams} />}
    </ContainerUniversal>
  );
};

export default Exam;
