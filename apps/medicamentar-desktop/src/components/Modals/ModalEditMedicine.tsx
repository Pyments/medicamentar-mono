import axiosInstance from "@utils/axiosInstance";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Box, Grid, Modal, Button, Select, Checkbox, MenuItem, FormGroup, InputLabel, Typography, IconButton, FormControl, FormControlLabel, TextField } from "@mui/material";
import { useTheme } from "@theme/useTheme";
import CloseIcon from "@mui/icons-material/Close";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import ThemedTextField from "@components/ThemedTextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface ModalEditMedicineProps{
    open:boolean;
    setOpen: (open: boolean) => void;
    fetchMedications: () => Promise<void>;
    currentMedication: {
      id: string;
      name: string;
      type: string;
      dose: number;
      amount: number;
      unity: string;
      continuo: boolean;
      period: number;
      startDate: dayjs.Dayjs;
    } | null;
    id: string | null;
}

interface FormErrors {
  name?: string;
  type?: string;
  dose?: string;
  amount?: string;
  unity?: string;
  continuo?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
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

enum Type {
  ORAL = 0,
  TOPICO = 1,
  OFTALMICO = 2,
  INTRANASAL = 3,
  INJETAVEL = 4,
  SUBLINGUAL = 5,
  TRANSDERMICO = 6,
  RETAL = 7,
  VAGINAL = 8,
}

enum Unity {
  mililitros = 0,
  miligramas = 1,
  gotas = 2,
  comprimidos = 3,
  subcutanea = 4,
}

const ModalEditMedicine = ({ open, setOpen, id, fetchMedications, currentMedication}: ModalEditMedicineProps) => {
  const { darkMode, largeFont } = useTheme();
  const [isOpen] = useState<boolean>(true);
  const [user] = useLocalStorage<{ token: { data: string } } | null>(
    "user",
    null
  );
  const [name, setName] = useState<string>("");
  const [tipoMedicamento, setTipoMedicamento] = useState<number>(Type[currentMedication?.type as keyof typeof Type]);
  const [dose, setDose] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [unity, setUnity] = useState<number>(Unity[currentMedication?.unity as keyof typeof Unity]);
  const [continuo, setContinuo] = useState<boolean>(currentMedication?.continuo || false);
  const [period, setPeriod] = useState<number>(1);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);

  // Estilos baseados no tamanho da fonte
  const fontSizeStyle = {
    fontSize: largeFont ? "1.4rem" : "0.9rem",
  };

  const labelFontSizeStyle = {
    fontSize: largeFont ? "1.2rem" : "0.9rem",
  };

  const buttonFontSizeStyle = {
    fontSize: largeFont ? "1.4rem" : "1rem",
  };

  if (!isOpen) return null;

  useEffect(() => {
    if (open && currentMedication) {
      setName(currentMedication.name || "");
      setTipoMedicamento(tipoMedicamento);
      setDose(currentMedication.dose || 1);
      setAmount(currentMedication.amount || 1);
      setUnity(unity);
      setContinuo(currentMedication.continuo);
      setPeriod(currentMedication.dose || 1);
      setStartDate(currentMedication.startDate ? dayjs(currentMedication.startDate) : null);
    }
  }, [open, currentMedication]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance({
        headers: { Authorization: `Bearer ${user?.token.data}` },
        method: "put",
        url: `/medication/${id}`,
        data: {
          name: name,
          type: Number(tipoMedicamento),
          dose: dose,
          amount: amount,
          unity: Number(unity),
          period: period,
          isContinuousUse: continuo,
          start_date: startDate
        },
      });
      setOpen(false);
      fetchMedications();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const [errors, _setErrors] = useState<FormErrors>({});

  const themedProps = {
    textField: {
      InputProps: {
        sx: {
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: darkMode ? "#CDCED7" : "-moz-initial",
            fontSize: largeFont ? "1.8rem" : "1.5rem",
          },
          ...fontSizeStyle,
          color: darkMode ? "common.white" : "text.primary",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "rgba(128, 128, 128, 0.6)" : "-moz-initial",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "common.white" : "primary.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#103952" : "primary.main",
          },
        },
      },
      InputLabelProps: {
        sx: {
          ...labelFontSizeStyle,
          color: darkMode ? "common.white" : "text.primary",
          "&.Mui-focused": {
            color: darkMode ? "#103952" : "primary.main",
          },
        },
      },
    },
  };

  const gridTransition = {
    transition: "all 0.3s ease-in-out",
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        component="div"
        sx={{
          position: "absolute",
          p: "60px",
          top: "50%",
          gap: "10px",
          left: "50%",
          boxShadow: 24,
          display: "flex",
          borderRadius: "5px",
          alignItems: "center",
          flexDirection: "column",
          width: largeFont ? "800px" : { xs: "1", md: "720px" },
          height: { xs: "1", md: "auto" },
          transform: "translate(-50%, -50%)",
          backgroundColor: darkMode ? "grey.900" : "common.white",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            top: 30,
            right: 30,
            position: "absolute",
            color: "#80828D",
            fontSize: largeFont ? "2rem" : "1.5rem",
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Typography
          variant="h3"
          sx={{
            p: "20px 0 50px 0",
            fontSize: largeFont ? "2.2rem" : "1.8rem",
            fontWeight: 600,
            textAlign: "center",
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          EDITAR MEDICAMENTO
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <FormControl fullWidth>
                  <InputLabel sx={labelFontSizeStyle}>TIPO DE MEDICAMENTO</InputLabel>
                  <Select
                    id="tipo"
                    value={tipoMedicamento}
                    label="TIPO DE MEDICAMENTO"
                    sx={fontSizeStyle}
                    onChange={(event) => setTipoMedicamento(Number(event.target.value))}
                  >
                    <MenuItem value={Type.ORAL} sx={fontSizeStyle}>ORAL</MenuItem>
                    <MenuItem value={Type.TOPICO} sx={fontSizeStyle}>TÓPICO</MenuItem>
                    <MenuItem value={Type.OFTALMICO} sx={fontSizeStyle}>OFTÁLMICO</MenuItem>
                    <MenuItem value={Type.INTRANASAL} sx={fontSizeStyle}>INTRANASAL</MenuItem>
                    <MenuItem value={Type.INJETAVEL} sx={fontSizeStyle}>INJETÁVEL</MenuItem>
                    <MenuItem value={Type.SUBLINGUAL} sx={fontSizeStyle}>SUBLINGUAL</MenuItem>
                    <MenuItem value={Type.TRANSDERMICO} sx={fontSizeStyle}>TRANSDÉRMICO</MenuItem>
                    <MenuItem value={Type.RETAL} sx={fontSizeStyle}>RETAL</MenuItem>
                    <MenuItem value={Type.VAGINAL} sx={fontSizeStyle}>VAGINAL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <ThemedTextField
                  variant="outlined"
                  label="NOME DO MEDICAMENTO"
                  value={name}
                  fullWidth
                  onChange={(e) => setName(String(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <FormControl fullWidth>
                  <Autocomplete
                    value={dose?.toString()}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        const numValue = Number(
                          newValue.replace(/[^0-9]/g, "")
                        );
                        setDose(Number(Math.max(1, numValue)));
                      }
                    }}
                    freeSolo
                    options={frequencyOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <ThemedTextField
                        {...params}
                        label="FREQUÊNCIA"
                        type="number"
                        value={dose}
                        onChange={(event) => {
                          const numValue = Number(event.target.value);
                          setDose(Number(Math.max(1, numValue)));
                        }}
                        inputProps={{
                          ...params.inputProps,
                          min: 1,
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <ThemedTextField
                  variant="outlined"
                  label="QUANTIDADE"
                  type="number"
                  value={amount}
                  fullWidth
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <FormControl fullWidth>
                  <InputLabel sx={labelFontSizeStyle}>UNIDADE</InputLabel>
                  <Select
                    id="unidade"
                    value={unity}
                    label="UNIDADE"
                    sx={fontSizeStyle}
                    onChange={(event) => setUnity(Number(event.target.value))}
                  >
                    <MenuItem value={Unity.mililitros} sx={fontSizeStyle}>Mililitros</MenuItem>
                    <MenuItem value={Unity.miligramas} sx={fontSizeStyle}>Miligramas</MenuItem>
                    <MenuItem value={Unity.gotas} sx={fontSizeStyle}>Gotas</MenuItem>
                    <MenuItem value={Unity.comprimidos} sx={fontSizeStyle}>Comprimidos</MenuItem>
                    <MenuItem value={Unity.subcutanea} sx={fontSizeStyle}>Subcutânea</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={continuo}
                      onChange={(e) => setContinuo(e.target.checked)}
                      sx={{ ...fontSizeStyle }}
                    />
                  }
                  label="Uso contínuo"
                  labelPlacement="end"
                  sx={{ fontSize: largeFont ? "1.4rem" : "1rem" }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridTransition}>
                <FormControl fullWidth>
                  <Autocomplete
                    disabled={continuo}
                    value={period?.toString()}
                    onChange={(_event, newValue) => {
                      if (newValue) {
                        const numValue = Number(
                          newValue.replace(/[^0-9]/g, "")
                        );
                        setPeriod(Number(Math.max(1, numValue)));
                      }
                    }}
                    freeSolo
                    options={periodOptions.map((option) => option.label)}
                    renderInput={(params) => (
                      <ThemedTextField
                        {...params}
                        label="PERÍODO"
                        type="number"
                        value={period}
                        disabled={continuo}
                        onChange={(event) => {
                          const numValue = Number(event.target.value);
                          setPeriod(Number(Math.max(1, numValue)));
                        }}
                        inputProps={{
                          ...params.inputProps,
                          min: 1,
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={gridTransition}>
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
                      error={Boolean(errors.startDate)}
                      helperText={errors.startDate}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  backgroundColor: darkMode ? "#103952" : "#32B5D2",
                  color: "white",
                  ...buttonFontSizeStyle,
                  '&:hover': {
                    backgroundColor: darkMode ? "#1a4f6d" : "#2999b3"
                  }
                }}
              >
                SALVAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEditMedicine;
