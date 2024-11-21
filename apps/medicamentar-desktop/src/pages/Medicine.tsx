import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Stack } from "@mui/material";
import Header from "@components/Header.tsx";
import SideBar from "@components/SideBar.tsx";
import CardUniversal from "@components/CardUniversal.tsx";
import { SectionContainer } from "@components/SectionContainer.tsx";
import ModalMedicineType from "@components/Modals/ModalMedicineType";
import { ContainerUniversal } from "@components/ContainerUniversal.tsx";
import { useTheme } from "@theme/useTheme";
import ModalNewMedication from "@components/Modals/ModalNewMedication";
import ModalDelete from "@components/Modals/ModalDelete";
import ModalEditMedicine from "@components/Modals/ModalEditMedicine";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import axios from "axios";
import { AddBtn } from "@components/AddBtn";

interface MedicationData {
  id: string;
  title: string;
  continuousUse: string;
  qtDdose: string;
  dose: string;
  period: string;
  expirationDate: string;
  dateTime: string;
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
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        console.log(token);
        const response = await axiosInstance.get("/medication", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
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
        await axiosInstance.delete(
          `/medication/${selectedMedicationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMedications(
          medications.filter((med) => med.id !== selectedMedicationId)
        );
        closeDeleteModal();
      } catch (error) {
        console.log("Erro ao deletar medicamento: ", error);
      }
    }
  };

  const handleOpenEditModal = (id: string) => {
    setSelectedMedicationId(id);
    setOpenEdit(true);
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
        <Grid container spacing={3} pb="75px">
          {medications.length > 0 ? (
            medications.map((medication) => (
              <CardUniversal
                key={medication.id}
                title={medication.title}
                continuousUse={medication.continuousUse}
                qtpDose={medication.qtDdose}
                dose={medication.dose}
                period={medication.period}
                expirationDate={medication.expirationDate}
                dateTime={medication.dateTime}
                onDelete={() => openDeleteModal(medication.id)}
                onEdit={() => handleOpenEditModal(medication.id)}
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
          {openEdit && (
            <ModalEditMedicine
              open={openEdit}
              setOpen={setOpenEdit}
              id= {selectedMedicationId}
              type = {type}
            />
          )}
        </Grid>
      </SectionContainer>
    </ContainerUniversal>
  );
};

export default Medicine;
