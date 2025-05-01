import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { useEffect, useState } from "react";
import { AddBtn } from "@components/AddBtn";
import axiosInstance from "@utils/axiosInstance";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { Box, Grid, Typography, Stack, Pagination, AlertColor } from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import ModalDelete from "@components/Modals/ModalDelete";
import ExamEditModal from "@components/Modals/ExamEditModal";
import { Feedback } from "@components/Feedback";

interface ExamData {
  id: string;
  name: string;
  date: dayjs.Dayjs;
  local: string;
  description: string;
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

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState<AlertColor>("success");

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get(`/exam?page=${page}&size=9`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExams(response.data.data);
      setPageCount(response.data.totalPages);
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

  const openDeleteModal = (id: string) => {
    setSelectedExamId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedExamId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteExams = async () => {
    if (selectedExamId) {
      try {
        await axiosInstance.delete(`/exam/${selectedExamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExams(exams.filter((med) => med.id !== selectedExamId));
        setFeedbackMessage("Exame ou consulta deletado com sucesso!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);
        closeDeleteModal();
      } catch (error) {
        setFeedbackMessage("Erro ao deletar exame ou consulta!");
        setFeedbackSeverity("error");
        setFeedbackOpen(true);
        closeDeleteModal();
      }
    }
  };

  const openEditModal = (exam: ExamData) => {
    setSelectedExam(exam);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedExamId(null);
    setEditModalOpen(false);
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  return (
    <ContainerUniversal>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage} />
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
                onDelete={() => openDeleteModal(exam.id)}
                onEdit={() => openEditModal(exam)}
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
      {isDeleteModalOpen && (
        <ModalDelete
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteExams}
        />
      )}
      {isEditModalOpen && (
        <ExamEditModal
          currentExam={selectedExam}
          isOpen={isEditModalOpen}
          onClose={() => closeEditModal()}
          fetchExams={fetchExams}
        />
      )}
    </ContainerUniversal>
  );
};

export default Exam;
