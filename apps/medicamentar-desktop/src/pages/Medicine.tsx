import Header from "@components/Header.tsx";
import { useEffect, useState } from "react";
import { AddBtn } from "@components/AddBtn";
import SideBar from "@components/SideBar.tsx";
import axiosInstance from "@utils/axiosInstance";
import { Typography, Grid, Stack, Pagination } from "@mui/material";
import ModalDelete from "@components/Modals/ModalDelete";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CardUniversal from "@components/CardUniversal.tsx";
import ModalEditMedicine from "@components/Modals/ModalEditMedicine";
import { SectionContainer } from "@components/SectionContainer.tsx";
import ModalMedicineType from "@components/Modals/ModalMedicineType";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import ModalNewMedication from "@components/Modals/ModalNewMedication";

import { useTheme } from "@theme/useTheme";

interface MedicationData {
  id: string;
  name: string;
  dose: string;
  amount: string;
  period: string;
  endDate: string;
  dateTime: string;
  continuousUse: boolean;
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
  const [type, setType] = useState<string>("");
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
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
        console.log("Lista de Medicamentos:", response.data.data);
        setPageCount(response.data.getTotalPages);
        setMedications(response.data.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (token) {
      fetchMedications();
    }
  }, [token]);
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
        closeDeleteModal();
      } catch (error) {
        console.log("Erro ao deletar medicamento: ", error);
      }
    }
  };

  const openEditModal = (id: string) => {
    setSelectedMedicationId(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedMedicationId(null);
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
        <Grid container spacing={3} mb="75px">
          {medications.length > 0 ? (
            medications.map((medication) => (
              <CardUniversal
                key={medication.id}
                title={medication.name}
                continuousUse={medication.continuousUse}
                qtpDose={medication.amount}
                dose={medication.dose}
                period={medication.period}
                expirationDate={medication.endDate}
                dateTime={medication.dateTime}
                onDelete={() => openDeleteModal(medication.id)}
                onEdit={() => openEditModal(medication.id)}
                type="medication"
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
              Nenhum medicamento encontrado.
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
            />
          )}
          {isDeleteModalOpen && (
            <ModalDelete
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={handleDeleteMedication}
            />
          )}
          {isEditModalOpen && (
            <ModalEditMedicine
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
            />
          )}
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Medicine;
