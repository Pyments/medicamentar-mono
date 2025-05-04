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
import { useActiveAndSorted } from "@hooks/useActiveAndSorted";

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
  const [openType, setOpenType] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationData | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] =
    useState<AlertColor>("success");

  const fetchMedications = async () => {
    try {
      const response = await axiosInstance.get(
        `/medication?page=${page}&size=9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setPageCount(response.data.totalPages);
      setMedications(response.data.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMedications();
    }
  }, [token, page]);

  const handleModal = () => {
    setOpenType(!openType);
  };

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
      try {
        await axiosInstance.delete(`/medication/${selectedMedicationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedications(
          medications.filter((med) => med.id !== selectedMedicationId)
        );
        setFeedbackMessage("Medicamento deletado com sucesso!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);

        closeDeleteModal();
      } catch (error) {
        setFeedbackMessage("Erro ao deletar Medicamento!");
        setFeedbackSeverity("error");
        setFeedbackOpen(true);
        closeDeleteModal();
      }
    }
  };

  const openEditModal = (medication: MedicationData) => {
    setSelectedMedication(medication);
    setSelectedMedicationId(medication.id);
    setOpenEdit(true);
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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

          <AddBtn handleModal={handleModal} text="medicamento" />
        </Stack>
        <Grid container spacing={3} pb="75px">
          {paginatedMedications.length > 0 ? (
            paginatedMedications.map((medication) => (
              <Grid item key={medication.id}>
                <CardUniversal
                  title={medication.name}
                  continuousUse={medication.continuo}
                  qtpDose={medication.amount}
                  dose={medication.dose}
                  period={medication.period}
                  dateTime={medication.startDate}
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
                  color: darkMode ? "common.white" : "commonm.dark",
                }}
              >
                Nenhum medicamento encontrado.
              </Typography>
            </Grid>
          )}
          {paginatedMedications.length > 0 && totalPages > 1 && (
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
            />
          )}
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Medicine;
