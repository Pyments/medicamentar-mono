import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Button,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
} from "@mui/material";

import { useTheme } from "@theme/useTheme";
import CloseIcon from "@mui/icons-material/Close";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface FormErrors {
  name?: string;
  dose?: string;
  amount?: string;
  unity?: string;
  continuo?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  firstDose?: string;
}

interface NewMedicationProps {
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewMedication = ({ open, setOpen, type }: NewMedicationProps) => {
  const { darkMode } = useTheme();
  const [isOpen] = useState<boolean>(true);
  const [user] = useLocalStorage<{ token: { data: string } } | null>(
    "user",
    null
  );
  const [name, setName] = useState<string>("");
  const [dose, setDose] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [unity, setUnity] = useState<string>("");
  const [continuo, setContinuo] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [firstDose, setFirstDose] = useState<dayjs.Dayjs | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const validadeForm = () => {
    const newErrors: FormErrors = {};
    const requiredFields = {
      name: "O nome do medicamento é obrigatório.",
      dose: "A frequência (dose) é obrigatória.", 
      amount: "A quantidade é obrigatória.",
      unity: "A unidade é obrigatória.",
      period: "O período é obrigatório.",
      startDate: "A data de início é obrigatória.",
      firstDose: "A primeira dose é obrigatória.",
      endDate: "A data de finalização é obrigatória.",
      continuo: "O uso contínuo é obrigatório."
    };
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!eval(field)) {
        newErrors[field as keyof FormErrors] = message;
      }
    });
    return newErrors;
  };

  if (!isOpen) return null;

  // Request

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validadeForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedStartDate = startDate?.toISOString();
    const formattedEndDate = endDate?.toISOString();
    const formattedFirstDose = firstDose?.toISOString();

    try {
      const response = await axios({
        headers: { Authorization: `Bearer ${user?.token.data}` },
        method: "post",
        url: "http://localhost:8080/medication",
        data: {
          type: type,
          name: name,
          dose: dose,
          amount: amount,
          unity: unity,
          // continuo: continuo,
          period: period,
          //startDate: formattedStartDate,
          validate: formattedEndDate,
          //firstDose: formattedFirstDose,
        },
      });
      console.log(response.data);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    variant="outlined"
                    label="FREQUÊNCIA (DOSE)"
                    fullWidth
                    onChange={(e) => setDose(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    variant="outlined"
                    label="QUANTIDADE"
                    fullWidth
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    id="unidade"
                    label="UNIDADE"
                    placeholder="ML"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setUnity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={gridTransition}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setContinuo(e.currentTarget.checked)}
                      />
                    }
                    label="USO CONTÍNUO"
                    sx={{
                      color: darkMode ? "common.white" : "common.black",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <TextField
                    sx={{
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    variant="outlined"
                    label="PERÍODO (DIAS)"
                    fullWidth
                    onChange={(e) => setPeriod(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <DemoContainer
                    components={["DateTimePicker"]}
                    sx={{ w: "1", h: "1" }}
                  >
                    <DatePicker
                      sx={{
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease-in-out",
                      }}
                      view="day"
                      label="DATA DE INÍCIO"
                      onChange={(value) => setStartDate(value)}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.startDate),
                          helperText: errors.startDate,
                          ...themedProps.textField,
                        },
                      }}
                    />
                  </DemoContainer>
                </Grid>
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <DemoContainer
                    components={["DateTimePicker"]}
                    sx={{ w: "1", h: "1" }}
                  >
                    <DateTimePicker
                      sx={{
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease-in-out",
                      }}
                      view="day"
                      label="FINAL DO TRATAMENTO"
                      onChange={(value) => setEndDate(value)}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.endDate),
                          helperText: errors.endDate,
                          ...themedProps.textField,
                        },
                      }}
                    />
                  </DemoContainer>
                </Grid>
                <Grid item xs={12} sm={6} sx={gridTransition}>
                  <DemoContainer
                    components={["DateTimePicker"]}
                    sx={{ w: "1", h: "1" }}
                  >
                    <DatePicker
                      sx={{
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease-in-out",
                      }}
                      view="day"
                      label="PRIMEIRA DOSE"
                      onChange={(value) => setFirstDose(value)}
                      slotProps={{
                        textField: {
                          error: Boolean(errors.firstDose),
                          helperText: errors.firstDose,
                          ...themedProps.textField,
                        },
                      }}
                    />
                  </DemoContainer>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mx: "auto",
                  my: "30px",
                  py: "18px",
                  px: "20%",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                }}
              >
                SALVAR
              </Button>
            </FormGroup>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default NewMedication;
