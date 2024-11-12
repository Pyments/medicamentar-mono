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
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        console.log(token);
        const response = await axios.get("http://localhost:8080/medication", {
          headers: {
            Authorization: `Bearer ${token}`
          }          
        });
        console.log(response.data);
        setMedications(response.data);
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

  const handleDeleteMedication = () => {
    if (selectedMedicationId) {
      setMedications(medications.filter(med => med.id !== selectedMedicationId));
      closeDeleteModal(); 
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
              component="h1"
              sx={{
                p: 0,
                mt: 0,
                color: darkMode ? "common.white" : "primary.main",
              }}
            >
              MEDICAMENTOS
            </Box>
          </Typography>

          <Button
            onClick={handleModal}
            sx={{
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              fontWeight: "bold",
              padding: "14px",
              color: "white",
              fontSize: "14px",
            }}
          >
            + ADICIONAR MEDICAMENTO
          </Button>
        </Stack>
        <Grid container spacing={3} pb="75px">
        {medications.length > 0 ? (
              medications.map((medication: any) => (
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
                  onEdit={() => openEditModal(medication.id)}
                  type="medication"
                />
              ))
            ) : (
              <Typography>Nenhum medicamento encontrado.</Typography>
            )}

        </Grid>
      </SectionContainer>
      {openType && (
        <ModalMedicineType
          open={openType}
          setOpen={setOpenType}
          setOpenNew={setOpenNew}
          setType={setType}
        />
      )}
      {openNew && (
        <ModalNewMedication type={type} open={openNew} setOpen={setOpenNew} />
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
    </ContainerUniversal>
  );
};

export default Medicine;
