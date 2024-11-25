import {
  Box,
  Modal,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import axiosInstance from "@utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface ExamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchExams: () => Promise<void>;
  currentExam: {
    id: string;
    date: dayjs.Dayjs;
    name: string;
    local: string;
    description: string;
  } | null;
}

interface FormErrors {
  location?: string;
  examName?: string;
  doctorName?: string;
  description?: string;
  selectedDate?: string;
}

interface User {
  token: {
    data: string;
  };
}

const ExamModal: React.FC<ExamEditModalProps> = ({
  isOpen,
  onClose,
  fetchExams,
  currentExam,
}) => {
  const [examName, setExamName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [user] = useLocalStorage<User | null>("user", null);

  const [errors, setErrors] = useState<FormErrors>({});

  const { darkMode } = useTheme();

  if (!isOpen) return null;

  console.log(currentExam);

  useEffect(() => {
    if (isOpen && currentExam) {
      setExamName(currentExam.name || "");
      setLocation(currentExam.local || "");
      setDescription(currentExam.description || "");
      setSelectedDate(currentExam.date ? dayjs(currentExam.date) : null);
    }
  }, [open, currentExam]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!selectedDate) {
      newErrors.selectedDate = "A data e hora são obrigatórias.";
    }

    if (!location) {
      newErrors.location = "O local é obrigatório.";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedDate = selectedDate?.toISOString();

    try {
      const response = await axiosInstance({
        headers: { Authorization: `Bearer ${user?.token.data}` },
        method: "put",
        url: `/exam/${currentExam?.id}`,
        data: {
          name: examName,
          local: location,
          date: formattedDate,
          doctorName: doctorName,
          description: description,
        },
      });
      console.log(response.data);
      fetchExams();
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    setSelectedDate(null);
    setExamName("");
    setLocation("");
    setDescription("");
    setDoctorName("");
    setErrors({});
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          p: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          boxShadow: 24,
          borderRadius: "5px",
          backgroundColor: darkMode ? "grey.900" : "common.white",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 30,
            top: 30,
            color: "#80828D",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          sx={{
            mb: "10px",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: darkMode ? "primary.light" : "primary.main",
          }}
        >
          EDITAR
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            sx={{ margin: 0 }}
            fullWidth
            label="NOME"
            variant="outlined"
            value={examName}
            onChange={(e) => {
              setExamName(e.target.value);
              if (e.target.value) {
                setErrors((prev) => ({ ...prev, location: undefined }));
              }
            }}
            margin="normal"
            error={Boolean(errors.location)}
            helperText={errors.location}
            InputProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
          />
          <DateTimePicker
            views={["day", "hours", "minutes"]}
            label="DATA E HORA"
            value={selectedDate}
            components={{
              OpenPickerIcon: CalendarTodayIcon,
            }}
            onChange={(newValue) => {
              setSelectedDate(newValue as Dayjs);
              if (newValue) {
                setErrors((prev) => ({ ...prev, selectedDate: undefined }));
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(errors.selectedDate)}
                helperText={errors.selectedDate}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: darkMode ? "#CDCED7" : "-moz-initial",
                    },
                    fontSize: "0.9rem",
                    color: darkMode ? "common.white" : "text.primary",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode
                        ? "rgba(128, 128, 128, 0.6)"
                        : "-moz-initial",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "common.white" : "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#103952" : "primary.main",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "0.9rem",
                    color: darkMode ? "common.white" : "text.primary",
                    "&.Mui-focused": {
                      color: darkMode ? "common.white" : "primary.main",
                    },
                  },
                }}
              />
            )}
          />
          <TextField
            sx={{ margin: 0 }}
            fullWidth
            label="LOCAL"
            variant="outlined"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (e.target.value) {
                setErrors((prev) => ({ ...prev, location: undefined }));
              }
            }}
            margin="normal"
            error={Boolean(errors.location)}
            helperText={errors.location}
            InputProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
          />
          <TextField
            sx={{ margin: 0 }}
            fullWidth
            multiline
            rows={3}
            label="DESCRIÇÃO"
            variant="outlined"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
            margin="normal"
            error={Boolean(errors.description)}
            helperText={errors.description}
            InputProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: "20px", backgroundColor: "#0078B6" }}
          >
            editar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ExamModal;
