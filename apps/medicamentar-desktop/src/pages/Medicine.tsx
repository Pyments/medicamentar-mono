import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  AlertColor,
  Pagination,
  Typography,
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
  unity: string;
  amount: number;
  period: number;
  continuousUse: boolean;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}
interface User {
  token: {
    data: string;
  };
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
  new: boolean;
  type: boolean;
  edit: boolean;
  delete: boolean;
}

const Medicine = () => {
  const { darkMode } = useTheme();
  const [type, setType] = useState(0);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  const [pagination, setPagination] = useState({
    page: 0,
    pageCount: 0,
  });
  const [feedback, setFeedback] = useState<FeedbackState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [modals, setModals] = useState<ModalState>({
    type: false,
    new: false,
    edit: false,
    delete: false,
  });
  const [selected, setSelected] = useState<{
    id: string | null;
    item: MedicationData | null;
  }>({ id: null, item: null });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchMedications();
    }
  }, [token, pagination.page]);

  const showFeedback = (message: string, severity: AlertColor) => {
    setFeedback({
      open: true,
      message,
      severity,
    });
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({ ...prev, page: value - 1 }));
  };

  const closeNewModal = () => {
    setModals((prev) => ({ ...prev, new: false }));
  };

  const openNewModal = () => {
    setModals((prev) => ({ ...prev, new: true }));
  };

  const openTypeModal = () => {
    setModals((prev) => ({ ...prev, type: true }));
  };

  const openDeleteModal = (id: string) => {
    setSelected({ id, item: null });
    setModals((prev) => ({ ...prev, delete: true }));
  };

  const openEditModal = (exam: MedicationData) => {
    setSelected({ id: exam.id, item: exam });
    setModals((prev) => ({ ...prev, edit: true }));
  };

  const closeDeleteModal = () => {
    setSelected({ id: null, item: null });
    setModals((prev) => ({ ...prev, delete: false }));
  };

  const closeEditModal = () => {
    setSelected({ id: null, item: null });
    setModals((prev) => ({ ...prev, edit: false }));
  };

  const closeTypeModal = () => {
    setSelected({ id: null, item: null });
    setModals((prev) => ({ ...prev, type: false }));
  };

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/medication?page=${pagination.page}&size=9`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMedications(response.data.data);
      setPagination((prev) => ({
        ...prev,
        pageCount: response.data.totalPages,
      }));
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedication = async () => {
    if (selected.id) {
      closeDeleteModal();
      setLoading(true);
      try {
        await axiosInstance.delete(`/medication/${selected.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedications(medications.filter((med) => med.id !== selected.id));
        showFeedback("Medicamento deletado com sucesso!", "success");
      } catch (error) {
        showFeedback("Erro ao deletar Medicamento!", "error");
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
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component="h2"
            sx={{
              w: 1,
              p: 0,
              mt: 0,
              fontSize: "2rem",
              fontWeight: "bold",
              color: darkMode ? "common.white" : "primary.main",
              textAlign: { sm: "center", md: "left" },
            }}
          >
            MEDICAMENTOS
          </Typography>
          <AddBtn handleModal={openTypeModal} text="medicamento" />
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
                <Loader
                  sx={{ color: darkMode ? "common.white" : "primary.main" }}
                />
              </Stack>
            </Grid>
          ) : medications.length > 0 ? (
            medications.map((medication) => (
              <Grid item key={medication.id}>
                <CardUniversal
                  title={medication.name}
                  continuousUse={medication.continuousUse}
                  qtpDose={medication.amount}
                  dose={medication.dose}
                  period={medication.period}
                  onDelete={() => openDeleteModal(medication.id)}
                  onEdit={() => openEditModal(medication)}
                  startDate={medication.startDate}
                  endDate={medication.endDate}
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
        </Grid>
        {modals.type && (
          <ModalMedicineType
            setType={setType}
            isOpen={modals.type}
            setOpen={openNewModal}
            onClose={closeTypeModal}
          />
        )}
        {modals.new && (
          <ModalNewMedication
            type={type}
            isOpen={modals.new}
            onClose={closeNewModal}
            showFeedback={showFeedback}
            fetchMedications={fetchMedications}
          />
        )}
        {modals.delete && (
          <ModalDelete
            isOpen={modals.delete}
            onClose={closeDeleteModal}
            onDelete={handleDeleteMedication}
          />
        )}
        {modals.edit && selected.item && (
          <ModalEditMedicine
            id={selected.id}
            isOpen={modals.edit}
            onClose={closeEditModal}
            showFeedback={showFeedback}
            fetchMedications={fetchMedications}
            currentMedication={{
              id: selected.item.id,
              name: selected.item.name,
              type: selected.item.type,
              dose: selected.item.dose,
              unity: selected.item.unity,
              period: selected.item.period,
              amount: selected.item.amount,
              endDate: selected.item.endDate,
              startDate: selected.item.startDate,
              continuousUse: selected.item.continuousUse,
            }}
          />
        )}
        {!loading && pagination.pageCount > 1 && (
          <Box
            gridColumn="1 / -1"
            display="flex"
            justifyContent="center"
            mt={2}
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
                  backgroundColor: darkMode ? "primary.darker" : "primary.main",
                  color: "white",
                },
              }}
            />
          </Box>
        )}
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Medicine;
