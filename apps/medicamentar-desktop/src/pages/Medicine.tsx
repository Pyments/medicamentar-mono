import { useEffect, useState } from "react";
import {
  Pagination,
  Typography,
  Grid,
  Stack,
  AlertColor,
  Box,
} from "@mui/material";
import Header from "@components/Header.tsx";
import SideBar from "@components/SideBar.tsx";
import CardUniversal from "@components/CardUniversal.tsx";
import { SectionContainer } from "@components/SectionContainer.tsx";
import ModalMedicineType from "@components/Modals/ModalMedicineType";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import dayjs from "dayjs";
import { useTheme } from "@theme/useTheme";
import ModalNewMedication from "@components/Modals/ModalNewMedication";
import ModalDelete from "@components/Modals/ModalDelete";
import ModalEditMedicine from "@components/Modals/ModalEditMedicine";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import axiosInstance from "@utils/axiosInstance";
import { AddBtn } from "@components/AddBtn";
import { Feedback } from "@components/Feedback";
import { Loader } from "@components/Loader";
import { useActiveAndSorted } from "@hooks/useActiveAndSorted";
import { PageTitle } from "@components/PageTitle";

interface MedicationData {
  id: string;
  name: string;
  type: string;
  dose: number;
  amount: number;
  unity: string;
  continuo: boolean;
  period: number;
  startDate: dayjs.Dayjs;
}
interface User {
  token: {
    data: string;
  };
}

const Medicine = () => {
  const { darkMode } = useTheme();
  const [openType, setOpenType] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [type, setType] = useState(0);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<MedicationData | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const [page, setPage] = useState(0);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState<AlertColor>("success");

  const [loading, setLoading] = useState(false);

  const showFeedback = (message: string, severity: AlertColor) => {
    setFeedbackMessage(message);
    setFeedbackSeverity(severity);
    setFeedbackOpen(true);
  };

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/medication?page=${page}&size=9`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedications(response.data.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMedications();
    }
  }, [token, page]);

  const handleModal = () => setOpenType(!openType);

  const openDeleteModal = (id: string) => {
    setSelectedMedicationId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedMedicationId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteMedication = async () => {
    if (selectedMedicationId) {
      closeDeleteModal();
      setLoading(true);
      try {
        await axiosInstance.delete(`/medication/${selectedMedicationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedications(medications.filter((med) => med.id !== selectedMedicationId));
        showFeedback("Medicamento deletado com sucesso!", "success");
      } catch (error) {
        showFeedback("Erro ao deletar Medicamento!", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const openEditModal = (medication: MedicationData) => {
    setSelectedMedication(medication);
    setSelectedMedicationId(medication.id);
    setOpenEdit(true);
  };

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const sortedMedications = useActiveAndSorted(medications, {
    type: "medication",
    continuousField: "continuo",
    startDateField: "startDate",
  });

  const pageSize = 9;
  const totalPages = Math.ceil(sortedMedications.length / pageSize);
  const paginatedMedications = sortedMedications.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <ContainerUniversal>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage}
      />
      <Header />
      <SideBar />
      <SectionContainer>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <PageTitle>MEDICAMENTOS</PageTitle>
          <AddBtn handleModal={handleModal} text="medicamento" />
        </Stack>

        <Grid container spacing={3} pb="75px">
          {loading ? (
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "50vh", width: "100%" }}
              >
                <Loader sx={{ color: darkMode ? "common.white" : "primary.main" }} />
              </Stack>
            </Grid>
          ) : paginatedMedications.length > 0 ? (
            paginatedMedications.map((medication) => (
              <Grid item key={medication.id}>
                <CardUniversal
                  title={medication.name}
                  continuousUse={medication.continuo}
                  qtpDose={medication.amount}
                  dose={medication.dose}
                  period={medication.period}
                  startDate={medication.startDate ? dayjs(medication.startDate).format("YYYY-MM-DD HH:mm:ss") : undefined}
                  onDelete={() => openDeleteModal(medication.id)}
                  onEdit={() => openEditModal(medication)}
                  type="medication"
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                sx={{
                  margin: "auto",
                  mt: "50px",
                  color: darkMode ? "common.white" : "common.dark",
                  textAlign: "center",
                }}
              >
                Nenhum medicamento encontrado.
              </Typography>
            </Grid>
          )}

          {!loading && totalPages > 1 && (
            <Box gridColumn="1 / -1" display="flex" justifyContent="center" mt={2}>
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
                    backgroundColor: darkMode ? "primary.darker" : "primary.main",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}

          {openType && (
            <ModalMedicineType
              open={openType}
              setOpen={setOpenType}
              setOpenNew={setOpenNew}
              setType={setType}
            />
          )}
          {openNew && (
            <ModalNewMedication
              type={type}
              open={openNew}
              setOpen={setOpenNew}
              fetchMedications={fetchMedications}
              showFeedback={showFeedback}
            />
          )}
          {isDeleteModalOpen && (
            <ModalDelete
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={handleDeleteMedication}
            />
          )}
          {openEdit && (
            <ModalEditMedicine
              open={openEdit}
              setOpen={setOpenEdit}
              id={selectedMedicationId}
              currentMedication={selectedMedication}
              fetchMedications={fetchMedications}
              showFeedback={showFeedback}
            />
          )}
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Medicine;
