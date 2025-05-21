import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { useState, useEffect } from "react";
import { useSwrFetch } from "@hooks/swr/useSwrFetch";
import { AddBtn } from "@components/AddBtn";
import axiosInstance from "@utils/axiosInstance";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import {
  Grid,
  Typography,
  Stack,
  Pagination,
  AlertColor,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import ModalDelete from "@components/Modals/ModalDelete";
import ExamEditModal from "@components/Modals/ExamEditModal";
import { Feedback } from "@components/Feedback";
import { Loader } from "@components/Loader";
import { PageTitle } from "@components/PageTitle";

interface ExamData {
  id: string;
  name?: string;
  doctorName?: string;
  date: dayjs.Dayjs;
  local: string;
  type: string;
  isCompleted: boolean;
  description: string;
}
interface User {
  token: {
    data: string;
  };
}
interface FeedbackState {
  open: boolean;
  message: string;
  severity: AlertColor;
}
interface ModalState {
  add: boolean;
  delete: boolean;
  edit: boolean;
}

const Exam = () => {
  const { darkMode } = useTheme();
  const [user] = useLocalStorage<User | null>("user", null);
  
  const [pagination, setPagination] = useState({
    page: 0,
    pageCount: 0,
  });
  
  const { data, isLoading: loading, mutate } = useSwrFetch<{
    data: { events: ExamData[], totalPages: number };
  }>('/consultations', { page: pagination.page, size: 9 });
  
  const events = data?.data?.events || [];
  const [modals, setModals] = useState<ModalState>({
    add: false,
    delete: false,
    edit: false,
  });
  const [selected, setSelected] = useState<{
    id: string | null;
    item: ExamData | null;
  }>({ id: null, item: null });
  const [feedback, setFeedback] = useState<FeedbackState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showFeedback = (message: string, severity: AlertColor) => {
    setFeedback({
      open: true,
      message,
      severity,
    });
  };

  useEffect(() => {
    if (data?.data?.totalPages && data.data.totalPages !== pagination.pageCount) {
      setPagination(prev => ({
        ...prev,
        pageCount: data.data.totalPages
      }));
    }
  }, [data]);
  
  const fetchExams = async () => {
    return mutate();
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({ ...prev, page: value - 1 }));
  };

  const handleModal = () => {
    setModals((prev) => ({ ...prev, add: !prev.add }));
  };

  const openDeleteModal = (event: ExamData) => {
    setSelected({ id: event.id, item: event });
    setModals((prev) => ({ ...prev, delete: true }));
  };

  const closeDeleteModal = () => {
    setSelected({ id: null, item: null });
    setModals((prev) => ({ ...prev, delete: false }));
  };

  const openEditModal = (exam: ExamData) => {
    setSelected({ id: exam.id, item: exam });
    setModals((prev) => ({ ...prev, edit: true }));
  };

  const closeEditModal = () => {
    setSelected({ id: null, item: null });
    setModals((prev) => ({ ...prev, edit: false }));
  };

  const handleDeleteExams = async () => {
    if (selected.id && selected.item) {
      closeDeleteModal();
      const token = user?.token.data;
      const type = selected.item.type.toLowerCase();
      console.log(
        `Deleting ${type} with ID: ${selected.id}, Type: ${selected.item.type}`
      );
      try {
        await axiosInstance.delete(`/${type}/${selected.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchExams();

        const isConsultation = selected.item.type === "CONSULTATION";
        showFeedback(
          `${isConsultation ? "Consulta" : "Exame"} deletado com sucesso!`,
          "success"
        );
      } catch (error) {
        const isConsultation = selected.item.type === "CONSULTATION";
        showFeedback(
          `Erro ao deletar ${isConsultation ? "consulta" : "exame"}!`,
          "error"
        );
        console.error(`Error deleting ${type}:`, error);
      }
    }
  };

  return (
    <ContainerUniversal>
      <Feedback
        open={feedback.open}
        message={feedback.message}
        severity={feedback.severity}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      />
      <Header />
      <SideBar />
      <SectionContainer>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <PageTitle>CONSULTAS E EXAMES</PageTitle>
          <AddBtn handleModal={handleModal} text="consulta ou exame" />
        </Stack>
        <Grid container spacing={3} pb="75px">
          {loading ? (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                minHeight: "50vh",
                width: "100%",
              }}
            >
              <Loader
                sx={{ color: darkMode ? "common.white" : "primary.main" }}
              />
            </Stack>
          ) : events.length > 0 ? (
            events.map((event: ExamData) => {
              return (
                <Grid item key={event.id}>
                  <CardUniversal
                    id={event.id}
                    name={event.name}
                    date={event.date}
                    isCompleted={event.isCompleted}
                    description={event.description}
                    local={event.local}
                    doctorName={event.doctorName}
                    onDelete={() => openDeleteModal(event)}
                    onEdit={() => openEditModal(event)}
                    onComplete={fetchExams}
                    showFeedback={showFeedback}
                    type={event.type}
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
                  color: darkMode ? "common.white" : "commonm.dark",
                }}
              >
                Nenhuma consulta ou exame encontrado.
              </Typography>
            </Grid>
          )}
          {events.length > 0 && pagination.pageCount > 1 && (
            <Box
              gridColumn="1 / -1"
              display="flex"
              justifyContent="center"
              mt={2}
              width="100%"
            >
              <Pagination
                page={pagination.page + 1}
                color="primary"
                count={pagination.pageCount}
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
      {modals.add && (
        <ExamModal
          open={modals.add}
          onClose={handleModal}
          fetchExams={fetchExams}
          showFeedback={showFeedback}
        />
      )}
      {modals.delete && (
        <ModalDelete
          isOpen={modals.delete}
          onClose={closeDeleteModal}
          onDelete={handleDeleteExams}
        />
      )}
      {modals.edit && selected.item && (
        <ExamEditModal
          currentExam={{
            id: selected.item.id,
            date: selected.item.date,
            local: selected.item.local,
            name: selected.item.name || "",
            description: selected.item.description,
            type: selected.item.type,
            doctorName: selected.item.name,
          }}
          isOpen={modals.edit}
          fetchExams={fetchExams}
          onClose={closeEditModal}
          showFeedback={showFeedback}
        />
      )}
    </ContainerUniversal>
  );
};

export default Exam;
