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
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    string | null
  >(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        console.log(token);
        const response = await axios.get("https://medicamentar-api-latest.onrender.com/medication", {
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
        await axios.delete(
          `https://medicamentar-api-latest.onrender.com/medication/${selectedMedicationId}`,
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

          <Button
            onClick={handleModal}
            sx={{
              color: "white",
              borderRadius: { xs: "50%", md: "4px" },
              padding: { xs: 0, md: "14px" },
              px: { xs: 3.5, md: 2 },
              fontWeight: "bold",
              right: { xs: "30px", md: "auto" },
              bottom: { xs: "30px", md: "auto" },
              position: { xs: "fixed", md: "relative" },
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              "&:hover": {
                backgroundColor: darkMode ? "primary.light" : "primary.main",
              },
            }}
          >
            <Box component="span" sx={{ fontSize: { xs: "3rem", md: "1rem" } }}>
              +
            </Box>
            <Box component="span" sx={{ display: { xs: "none", md: "block" } }}>
              ADICIONAR MEDICAMENTO
            </Box>
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
