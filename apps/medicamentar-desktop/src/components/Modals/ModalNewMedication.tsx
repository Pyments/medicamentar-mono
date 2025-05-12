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
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CustomDateTimePicker from "@components/CustomDateTimePicker";

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
  const [dose, setDose] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [unity, setUnity] = useState<string>("");
  const [continuo, setContinuo] = useState<boolean>(false);
  const [period, setPeriod] = useState<number>(1);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [endDate, _setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [errors, _setErrors] = useState<FormErrors>({});
  const [ophthalmologist, setOphthalmologist] = useState({
    leftEyeFrequency: 0,
    leftEyeQuantity: 1,
    leftEyeQuantityType: "",
    rightEyeFrequency: 0,
    rightEyeQuantity: 1,
    rightEyeQuantityType: "",
  });

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
          amount: type === 2 ? ophthalmologist.leftEyeQuantity : amount, // num
          unity: type === 2 ? ophthalmologist.leftEyeQuantityType : Number(unity), // presets = ml(mililitros), mg(miligramas), gts(gotas), cps(comprimidos), sc(subcutânea)
          period: period, // num = 5,7,10,12,15,20,25,30,60,90,120, personalizado
          isContinuousUse: continuo, // bool
          start_date: startDate,
          ophthalmicDetails: {
            leftEyeFrequency: ophthalmologist.leftEyeFrequency, 
            leftEyeQuantity: ophthalmologist.leftEyeQuantity, 
            leftEyeDrops: ophthalmologist.leftEyeQuantityType, 
            rightEyeFrequency: ophthalmologist.rightEyeFrequency, 
            rightEyeQuantity: ophthalmologist.rightEyeQuantity, 
            rightEyeDrops: ophthalmologist.rightEyeQuantityType, 
          },
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

  // const themedProps = {
  //   textField: {
  //     InputProps: {
  //       sx: {
  //         "& .MuiInputAdornment-root .MuiSvgIcon-root": {
  //           color: darkMode ? "#CDCED7" : "-moz-initial",
  //         },
  //         fontSize: "0.9rem",
  //         color: darkMode ? "common.white" : "text.primary",
  //         "& .MuiOutlinedInput-notchedOutline": {
  //           borderColor: darkMode ? "rgba(128, 128, 128, 0.6)" : "-moz-initial",
  //         },
  //         "&:hover .MuiOutlinedInput-notchedOutline": {
  //           borderColor: darkMode ? "common.white" : "primary.main",
  //         },
  //         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //           borderColor: darkMode ? "#103952" : "primary.main",
  //         },
  //       },
  //     },
  //     InputLabelProps: {
  //       sx: {
  //         fontSize: "0.9rem",
  //         color: darkMode ? "common.white" : "text.primary",
  //         "&.Mui-focused": {
  //           color: darkMode ? "#103952" : "primary.main",
  //         },
  //       },
  //     },
  //   },
  // };

  const gridTransition = {
    transition: "all 0.3s ease-in-out",
  };
  console.log(unity);
  return (
    <>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage}
      />
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
                <Grid item xs={12} sx={gridTransition}>
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
                      if (errors.name)
                        _setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                {type === 2 && (
                  <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                    <FormControl fullWidth>
                      <InputLabel>OLHO ESQUERDO</InputLabel>
                      <Select
                        id="left-eye"
                        value={ophthalmologist.leftEyeFrequency}
                        label="OLHO ESQUERDO"
                        onChange={(event) => {
                          const numValue = Number(event.target.value);
                          setOphthalmologist({
                            ...ophthalmologist,
                            leftEyeFrequency: numValue,
                          });
                        }}
                        sx={{
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease-in-out",
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: darkMode
                                ? "grey.900"
                                : "common.white",
                              color: darkMode ? "common.white" : "text.primary",
                            },
                          },
                        }}
                      >
                        {frequencyOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {type === 2 && (
                  <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                    <FormControl fullWidth>
                      <InputLabel>OLHO DIREITO</InputLabel>
                      <Select
                        id="right-eye"
                        value={ophthalmologist.rightEyeFrequency}
                        labelId="right-eye"
                        label="OLHO DIREITO"
                        placeholder="FREQUÊNCIA"
                        onChange={(event) => {
                          const numValue = Number(event.target.value);
                          setOphthalmologist({
                            ...ophthalmologist,
                            rightEyeFrequency: numValue,
                          });
                        }}
                        sx={{
                          fontSize: "0.9rem",
                          transition: "all 0.3s ease-in-out",
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: darkMode
                                ? "grey.900"
                                : "common.white",
                              color: darkMode ? "common.white" : "text.primary",
                            },
                          },
                        }}
                      >
                        {frequencyOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {type !== 2 && (
                  <Grid
                    item
                    xs={12}
                    sm={type === 2 ? 6 : 4}
                    md={type === 2 ? 3 : 6}
                    sx={gridTransition}
                  >
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
                )}
                {type === 2 && (
                  <Grid item xs={12} sm={6} md={3} sx={gridTransition}>
                    <TextField
                      sx={{
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease-in-out",
                      }}
                      fullWidth
                      type="number"
                      value={ophthalmologist.leftEyeQuantity}
                      variant="outlined"
                      id="left-eye-quantity"
                      label="QUANTIDADE"
                      onChange={(event) => {
                        if (Number(event.target.value) < 1) {
                          // setAmount(1);
                          setOphthalmologist({
                            ...ophthalmologist,
                            leftEyeQuantity: 1,
                          });
                        } else {
                          // setAmount(Number(event.target.value));
                          setOphthalmologist({
                            ...ophthalmologist,
                            leftEyeQuantity: Number(event.target.value),
                          });
                        }
                      }}
                    />
                  </Grid>
                )}
                {type === 2 && (
                  <Grid item xs={12} sm={6} md={3} sx={gridTransition}>
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
                        value={
                          type === 2
                            ? ophthalmologist.leftEyeQuantityType
                            : unity
                        }
                        label="UNIDADE"
                        labelId="unity-label"
                        onChange={(event) => {
                          // setUnity(String(event.target.value));
                          if (type === 2) {
                            setOphthalmologist({
                              ...ophthalmologist,
                              leftEyeQuantityType: String(event.target.value),
                            });
                          } else setUnity(String(event.target.value));
                          if (errors.unity)
                            _setErrors((prev) => ({
                              ...prev,
                              unity: undefined,
                            }));
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
                )}
                <Grid
                  item
                  xs={12}
                  sm={type === 2 ? 6 : 4}
                  md={type === 2 ? 3 : 6}
                  sx={gridTransition}
                >
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    fullWidth
                    type="number"
                    value={ophthalmologist.rightEyeQuantity}
                    variant="outlined"
                    id="right-eye-quantity"
                    label="QUANTIDADE"
                    onChange={(event) => {
                      if (Number(event.target.value) < 1) {
                        // setAmount(1);
                        setOphthalmologist({
                          ...ophthalmologist,
                          rightEyeQuantity: 1,
                        });
                      } else {
                        // setAmount(Number(event.target.value));
                        setOphthalmologist({
                          ...ophthalmologist,
                          rightEyeQuantity: Number(event.target.value),
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={type === 2 ? 6 : 4}
                  md={type === 2 ? 3 : 6}
                  sx={gridTransition}
                >
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
                      value={
                        type === 2
                          ? ophthalmologist.rightEyeQuantityType
                          : unity
                      }
                      label="UNIDADE"
                      labelId="unity-label"
                      id="main-unity"
                      onChange={(event) => {
                        // setUnity(String(event.target.value));
                        if (type === 2) {
                          setOphthalmologist({
                            ...ophthalmologist,
                            rightEyeQuantityType: String(event.target.value),
                          });
                        } else {
                          setUnity(String(event.target.value));
                        }
                        if (errors.unity)
                          _setErrors((prev) => ({ ...prev, unity: undefined }));
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
                  <CustomDateTimePicker
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                    errors={{ selectedDate: errors.startDate }}
                    setErrors={_setErrors}
                    darkMode={darkMode}
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
