import Header from "@components/Header";
import SideBar from "@components/SideBar";
import { useEffect, useState } from "react";
import { AddBtn } from "@components/AddBtn";
import axiosInstance from "@utils/axiosInstance";
import ExamModal from "@components/Modals/ExamModal";
import CardUniversal from "@components/CardUniversal";
import { SectionContainer } from "@components/SectionContainer";
import { ContainerUniversal } from "@components/ContainerUniversal";
import { Grid, Typography, Stack, Pagination, AlertColor } from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import ModalDelete from "@components/Modals/ModalDelete";
import ExamEditModal from "@components/Modals/ExamEditModal";
import { Feedback } from "@components/Feedback";
import { Loader } from "@components/Loader";
import { useActiveAndSorted } from "@hooks/useActiveAndSorted";
import { PageTitle } from "@components/PageTitle";

interface ExamData {
  id: string;
  name?: string;
  doctorName?: string;
  date: dayjs.Dayjs;
  local: string;
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
  const token = user?.token.data;
  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState<{
    exams: ExamData[];
    consultations: ExamData[];
  }>({ exams: [], consultations: [] });
  const [pagination, setPagination] = useState({
    page: 0,
    pageCount: 0,
  });
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

  const sortedExams = useActiveAndSorted(events.exams, {
    type: "exam",
    dateField: "date",
  });

  const sortedConsultations = useActiveAndSorted(events.consultations, {
    type: "exam",
    dateField: "date",
  });

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/consultations?page=${pagination.page}&size=9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents({
        consultations: response.data.data.consultations || [],
        exams: response.data.data.exams || [],
      });

      setPagination((prev) => ({
        ...prev,
        pageCount: response.data.data.totalPages || 0,
      }));
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  const allEvents = [...sortedExams, ...sortedConsultations];

  useEffect(() => {
    if (token) {
      fetchExams();
    }
  }, [token, pagination.page]);

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({ ...prev, page: value - 1 }));
  };

  const handleModal = () => {
    setModals((prev) => ({ ...prev, add: !prev.add }));
  };

  const openDeleteModal = (id: string) => {
    setSelected({ id, item: null });
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
    if (selected.id) {
      closeDeleteModal();
      setLoading(true);
      try {
        await axiosInstance.delete(`/consultation/${selected.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents((prev) => ({
          exams: prev.exams.filter((item) => item.id !== selected.id),
          consultations: prev.consultations.filter(
            (item) => item.id !== selected.id
          ),
        }));

        showFeedback("Exame ou consulta deletado com sucesso!", "success");
      } catch (error) {
        showFeedback("Erro ao deletar exame!", "error");
      } finally {
        setLoading(false);
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
            <Grid item xs={12}>
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
            </Grid>
          ) : allEvents.length > 0 ? (
            allEvents.map((event: ExamData) => {
              const isConsultation = !!event.doctorName;
              return (
                <Grid item key={event.id}>
                  <CardUniversal
                    title={
                      isConsultation
                        ? `${event.doctorName || ""}`
                        : event.name || ""
                    }
                    dateTime={event.date}
                    description={event.local || event.description}
                    type="events"
                    onDelete={() => openDeleteModal(event.id)}
                    onEdit={() => openEditModal(event)}
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
          {allEvents.length > 0 && pagination.pageCount > 1 && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
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
            </Grid>
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
