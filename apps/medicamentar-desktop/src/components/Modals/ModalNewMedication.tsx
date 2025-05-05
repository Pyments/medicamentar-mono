import {
  Box,
  Grid,
  Modal,
  Button,
  Select,
  Checkbox,
  MenuItem,
  FormGroup,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  FormControl,
  Autocomplete,
  FormControlLabel,
  AlertColor,
  FormHelperText,
} from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";
import axiosInstance from "@utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useTheme } from "@theme/useTheme";
import { Feedback } from "@components/Feedback";

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
  fetchMedications: () => void;
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

const NewMedication = ({ open, setOpen, type, fetchMedications }: NewMedicationProps) => {
  const { darkMode } = useTheme();
  const [isOpen] = useState<boolean>(true);
  const [user] = useLocalStorage<{ token: { data: string } } | null>(
    "user",
    null
  );
  const [name, setName] = useState<string>("");
  const [dose, setDose] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [unity, setUnity] = useState<string>("");
  const [continuo, setContinuo] = useState<boolean>(false);
  const [period, setPeriod] = useState<number>(1);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, _setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [errors, _setErrors] = useState<FormErrors>({});

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState<AlertColor>("success");

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
      _setEndDate(null);
      return;
    }
    setPeriod(newPeriod);
    if (!startDate) {
      _setEndDate(null);
      return;
    }
    _setEndDate(calcEndDate(startDate, newPeriod));
  };
  /*  const validadeForm = () => {
    const newErrors: FormErrors = {};
    const requiredFields = {
      name: "O nome do medicamento é obrigatório.",
      dose: "A frequência (dose) é obrigatória.",
      amount: "A quantidade é obrigatória.",
      unity: "A unidade é obrigatória.",
      period: "O período é obrigatório.",
      startDate: "A data de início é obrigatória.",
      continuo: "O uso contínuo é obrigatório.",
    };
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!eval(field)) {
        newErrors[field as keyof FormErrors] = message;
      }
    });
    return newErrors;
  }; */

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "O nome do medicamento é obrigatório.";
    if (!unity) newErrors.unity = "A unidade é obrigatória.";
    if (!startDate) newErrors.startDate = "A data de início é obrigatória.";

    return newErrors;
  };

  if (!isOpen) return null;

  // Request

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      _setErrors(validationErrors); // Atualiza os erros
      return; // Se tiver erro, não faz a requisição
    }

    try {
      await axiosInstance({
        headers: { Authorization: `Bearer ${user?.token.data}` },
        method: "post",
        url: "/medication",
        data: {
          name: name, // string
          type: Number(type), // presets
          dose: dose, // string = 2/2 4/4 6/6 8/8 12/12 24/24 semanal personalizavel
          amount: amount, // num
          unity: Number(unity), // presets = ml(mililitros), mg(miligramas), gts(gotas), cps(comprimidos), sc(subcutânea)
          period: period, // num = 5,7,10,12,15,20,25,30,60,90,120, personalizado
          isContinuousUse: continuo, // bool
          start_date: startDate,
          /*ophthalmicDetails: {
            leftEyeFrequency: null, 
            leftEyeQuantity: null, 
            leftEyeDrops: null, 
            rightEyeFrequency: null, 
            rightEyeQuantity: null, 
            rightEyeDrops: null, 
          }, */
        },
      });
      setFeedbackMessage("Medicamento adicionado com sucesso!");
      setFeedbackSeverity("success");
      setFeedbackOpen(true);

      fetchMedications();
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const themedProps = {
    textField: {
      InputProps: {
        sx: {
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: darkMode ? "#CDCED7" : "-moz-initial",
          },
          fontSize: "0.9rem",
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
          fontSize: "0.9rem",
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
    <>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage} />
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
            width: { xs: "1", md: "720px" },
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
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h3"
            sx={{
              p: "20px 0 50px 0",
              fontSize: "1.8rem",
              fontWeight: 600,
              textAlign: "center",
              color: darkMode ? "common.white" : "primary.main",
            }}
          >
            NOVO MEDICAMENTO
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    variant="outlined"
                    label="NOME DO MEDICAMENTO"
                    fullWidth
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) _setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
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
                        <TextField
                          {...params}
                          label="FREQUÊNCIA"
                          type="number"
                          value={dose?.toString()}
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
                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    fullWidth
                    type="number"
                    value={amount}
                    variant="outlined"
                    label="QUANTIDADE"
                    onChange={(event) => {
                      if (Number(event.target.value) < 1) {
                        setAmount(1);
                      } else {
                        setAmount(Number(event.target.value));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                  <FormControl
                    fullWidth
                    error={Boolean(errors.unity)}
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <InputLabel id="unity-label">UNIDADE</InputLabel>
                    <Select
                      id="unidade"
                      value={unity}
                      label="UNIDADE"
                      labelId="unity-label"
                      onChange={(event) => {
                        setUnity(String(event.target.value));
                        if (errors.unity) _setErrors((prev) => ({ ...prev, unity: undefined }));
                      }}
                    >
                      <MenuItem value={Unity.ML}>Mililitros (ML)</MenuItem>
                      <MenuItem value={Unity.MG}>Miligramas (MG)</MenuItem>
                      <MenuItem value={Unity.GTS}>Gotas (GTS)</MenuItem>
                      <MenuItem value={Unity.CPS}>Comprimidos (CPS)</MenuItem>
                      <MenuItem value={Unity.SC}>Subcutânea (SC)</MenuItem>
                    </Select>
                    {errors.unity && (
                      <FormHelperText>{errors.unity}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={gridTransition}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={continuo}
                        onChange={(e) => setContinuo(e.currentTarget.checked)}
                      />
                    }
                    label="USO CONTÍNUO"
                    sx={{
                      color: darkMode ? "common.white" : "common.black",
                      transition: "all 0.3s ease-in-out",
                      opacity: continuo ? 1 : 0.35,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={gridTransition}>
                  <DateTimePicker
                    views={["day", "hours", "minutes"]}
                    value={startDate}
                    label="DATA DE INÍCIO"
                    components={{
                      OpenPickerIcon: CalendarTodayIcon,
                    }}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      if (errors.startDate) _setErrors((prev) => ({ ...prev, startDate: undefined }));
                    }}

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.startDate}
                        error={Boolean(errors.startDate)}
                        InputProps={{
                          ...params.InputProps,
                          ...themedProps.textField.InputProps,
                          inputProps: {
                            ...params.inputProps,
                            readOnly: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disabled={continuo}
                      value={period?.toString() || ""}
                      sx={{
                        opacity: continuo ? 0.5 : 1,
                      }}
                      onChange={(_event, newValue) => {
                        if (newValue) {
                          const numValue = Number(
                            newValue.replace(/[^0-9]/g, "")
                          );
                          handlePeriodChange(Math.max(1, numValue));
                        }
                      }}
                      freeSolo
                      options={periodOptions.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          type="number"
                          value={period ? period.toString() : ""}
                          label="PERÍODO"
                          disabled={continuo}
                          onChange={(e) => {
                            const numValue = Number(e.target.value);
                            handlePeriodChange(Math.max(1, numValue));
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
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <TextField
                    disabled
                    fullWidth
                    value={endDate ? dayjs(endDate).format("DD/MM/YYYY") : ""}
                    label="FINAL DO TRATAMENTO"
                    helperText={errors.endDate}
                    error={Boolean(errors.endDate)}
                    sx={{
                      opacity: continuo ? 0.5 : 1,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: "20%",
                  mx: "auto",
                  my: "30px",
                  py: "18px",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                }}
              >
                SALVAR
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default NewMedication;
