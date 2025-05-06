import {
  Box,
  Grid,
  Modal,
  Button,
  Select,
  Checkbox,
  MenuItem,
  FormGroup,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";
import axiosInstance from "@utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ThemedTextField from "@components/ThemedTextField";
import { useTheme } from "@theme/useTheme";

interface FormErrors {
  name?: string;
  dose?: string;
  amount?: string;
  unity?: string;
  continuo?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
}

interface NewMedicationProps {
  type: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const frequencyOptions = [
  { value: 2, label: "A cada 2 Horas" },
  { value: 4, label: "A cada 4 Horas" },
  { value: 6, label: "A cada 6 Horas" },
  { value: 8, label: "A cada 8 Horas" },
  { value: 12, label: "A cada 12 Horas" },
  { value: 24, label: "A cada 24 Horas" },
  { value: 168, label: "Semanal" },
];

const periodOptions = [
  { value: 5, label: "5 Dias" },
  { value: 7, label: "7 Dias" },
  { value: 10, label: "10 Dias" },
  { value: 12, label: "12 Dias" },
  { value: 15, label: "15 Dias" },
  { value: 20, label: "20 Dias" },
  { value: 25, label: "25 Dias" },
  { value: 30, label: "30 Dias" },
];

const NewMedication = ({ open, setOpen, type }: NewMedicationProps) => {
  const { darkMode, largeFont } = useTheme();
  const [isOpen] = useState<boolean>(true);
  const [user] = useLocalStorage<{ token: { data: string } } | null>("user", null);
  const [name, setName] = useState<string>("");
  const [dose, setDose] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [unity, setUnity] = useState<string>("");
  const [continuo, setContinuo] = useState<boolean>(false);
  const [period, setPeriod] = useState<number>(1);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  enum Unity {
    ML = 0,
    MG = 1,
    GTS = 2,
    CPS = 3,
    SC = 4,
  }

  const calcEndDate = (startDate: dayjs.Dayjs | null, period: number) => {
    if (!startDate || period <= 0) return null;
    return startDate.add(period, "day");
  };

  const handlePeriodChange = (newPeriod: number | null) => {
    if (!newPeriod || newPeriod <= 0) {
      setPeriod(1);
      setEndDate(null);
      return;
    }
    setPeriod(newPeriod);
    if (!startDate) {
      setEndDate(null);
      return;
    }
    setEndDate(calcEndDate(startDate, newPeriod));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance({
        headers: { Authorization: `Bearer ${user?.token.data}` },
        method: "post",
        url: "/medication",
        data: {
          name,
          type: Number(type),
          dose,
          amount,
          unity: Number(unity),
          period,
          isContinuousUse: continuo,
          start_date: startDate,
        },
      });
      setOpen(false);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (!isOpen) return null;

  const fontSize = largeFont ? "1.5rem" : "1rem";

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        component="div"
        sx={{
          position: "absolute",
          p: "60px",
          top: "50%",
          left: "50%",
          boxShadow: 24,
          borderRadius: "5px",
          transform: "translate(-50%, -50%)",
          backgroundColor: darkMode ? "grey.900" : "common.white",
          width: { xs: "90vw", md: "720px" },
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            top: 30,
            right: 30,
            position: "absolute",
            color: "#80828D",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h3"
          sx={{
            fontSize: largeFont ? "2rem" : "1.8rem",
            fontWeight: 600,
            textAlign: "center",
            mb: 4,
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          NOVO MEDICAMENTO
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ThemedTextField
                  label="NOME DO MEDICAMENTO"
                  fullWidth
                  onChange={(e) => setName(String(e.target.value))}
                  inputProps={{ style: { fontSize } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    value={dose?.toString()}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        const numValue = Number(newValue.replace(/[^0-9]/g, ""));
                        setDose(Math.max(1, numValue));
                      }
                    }}
                    freeSolo
                    options={frequencyOptions.map((o) => o.label)}
                    renderInput={(params) => (
                      <ThemedTextField
                        {...params}
                        label="FREQUÊNCIA"
                        type="number"
                        value={dose?.toString()}
                        onChange={(event) => {
                          const numValue = Number(event.target.value);
                          setDose(Math.max(1, numValue));
                        }}
                        inputProps={{ ...params.inputProps, min: 1, style: { fontSize } }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <ThemedTextField
                  fullWidth
                  type="number"
                  value={amount}
                  label="QUANTIDADE"
                  onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                  inputProps={{ min: 1, style: { fontSize } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontSize }} id="unity-label">UNIDADE</InputLabel>
                  <Select
                    labelId="unity-label"
                    value={unity}
                    label="UNIDADE"
                    onChange={(e) => setUnity(String(e.target.value))}
                    sx={{ fontSize }}
                  >
                    <MenuItem value={Unity.ML}>Mililitros (ML)</MenuItem>
                    <MenuItem value={Unity.MG}>Miligramas (MG)</MenuItem>
                    <MenuItem value={Unity.GTS}>Gotas (GTS)</MenuItem>
                    <MenuItem value={Unity.CPS}>Comprimidos (CPS)</MenuItem>
                    <MenuItem value={Unity.SC}>Subcutânea (SC)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox checked={continuo} onChange={(e) => setContinuo(e.target.checked)} />
                  }
                  label="USO CONTÍNUO"
                  sx={{ fontSize }}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  views={["day", "hours", "minutes"]}
                  value={startDate}
                  label="DATA DE INÍCIO"
                  onChange={(newValue) => setStartDate(newValue)}
                  components={{ OpenPickerIcon: CalendarTodayIcon }}
                  renderInput={(params) => (
                    <ThemedTextField
                      {...params}
                      fullWidth
                      inputProps={{ ...params.inputProps, style: { fontSize } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    disabled={continuo}
                    value={period?.toString() || ""}
                    onChange={(_e, newValue) => {
                      if (newValue) {
                        const num = Number(newValue.replace(/[^0-9]/g, ""));
                        handlePeriodChange(Math.max(1, num));
                      }
                    }}
                    freeSolo
                    options={periodOptions.map((o) => o.label)}
                    renderInput={(params) => (
                      <ThemedTextField
                        {...params}
                        type="number"
                        label="PERÍODO"
                        disabled={continuo}
                        onChange={(e) => {
                          const num = Number(e.target.value);
                          handlePeriodChange(Math.max(1, num));
                        }}
                        inputProps={{ ...params.inputProps, min: 1, style: { fontSize } }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <ThemedTextField
                  disabled
                  fullWidth
                  value={endDate ? dayjs(endDate).format("DD/MM/YYYY") : ""}
                  label="FINAL DO TRATAMENTO"
                  inputProps={{ style: { fontSize } }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: "20%",
                mx: "auto",
                my: 4,
                py: 2,
                fontWeight: 800,
                fontSize,
              }}
            >
              SALVAR
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default NewMedication;
