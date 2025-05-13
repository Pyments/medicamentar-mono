import {
  Box,
  Modal,
  Button,
  TextField,
  IconButton,
  Typography,
  AlertColor,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import axiosInstance from "@utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Feedback } from "@components/Feedback";
import { Loader } from "@components/Loader";

interface ExamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchExams: () => Promise<void>;
  showFeedback: (message: string, severity: "success" | "error") => void;
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
  showFeedback
}) => {
  const [examName, setExamName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [user] = useLocalStorage<User | null>("user", null);

  const [errors, setErrors] = useState<FormErrors>({});

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage ] = useState("");
  const [feedbackSeverity] = useState<AlertColor>("success");
  const [loading, setLoading] = useState(false);

  const { darkMode, largeFont } = useTheme();

  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen && currentExam) {
      setExamName(currentExam.name || "");
      setLocation(currentExam.local || "");
      setDescription(currentExam.description || "");
      setSelectedDate(currentExam.date ? dayjs(currentExam.date) : null);
    }
  }, [isOpen, currentExam]);

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
    setLoading(true);
    try {
      await axiosInstance({
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
      onClose();
      showFeedback("Exame editado com sucesso!", "success");
      fetchExams();
    } catch (error) {
      showFeedback("Erro ao editar exame!", "error");
      setFeedbackOpen(true);
      console.error("Erro na requisição:", error);
    }finally {
      setLoading(false);
    }
    setSelectedDate(null);
    setExamName("");
    setLocation("");
    setDescription("");
    setDoctorName("");
    setErrors({});
  };

  return (
    <>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage} />

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
              fontSize: largeFont ? "2rem" : "1.8rem",
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
                  fontSize: largeFont ? "1.4rem" : "0.9rem",
                  padding: largeFont ? "16px 14px" : "10px 14px",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                  transform: largeFont ? "translate(14px, -12px) scale(0.75)" : "translate(14px, -6px) scale(0.75)",
                },
              }}
            />
            <DateTimePicker
              views={["day", "hours", "minutes"]}
              label="DATA E HORA"
              minDateTime={dayjs().startOf('minute')}
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
                        fontSize: largeFont ? "1.4rem" : "1.2rem",
                      },
                      fontSize: largeFont ? "1.4rem" : "0.9rem",
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
                      fontSize: largeFont ? "1.2rem" : "0.9rem",
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
                  fontSize: largeFont ? "1.4rem" : "0.9rem",
                  padding: largeFont ? "16px 14px" : "10px 14px",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                  transform: largeFont ? "translate(14px, -12px) scale(0.75)" : "translate(14px, -6px) scale(0.75)",
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
                  fontSize: largeFont ? "1.4rem" : "0.9rem",
                  padding: largeFont ? "16px 14px" : "10px 14px",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: largeFont ? "1.2rem" : "0.9rem",
                  transform: largeFont ? "translate(14px, -12px) scale(0.75)" : "translate(14px, -6px) scale(0.75)",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ 
                mt: "20px", 
                backgroundColor: "#0078B6",
                fontSize: largeFont ? "1.2rem" : "1rem",
                padding: largeFont ? "16px" : "12px",
              }}
            >
              {loading ?(
                <Loader sx={{ color: "white" }} />
              ):(
                "editar"
              )}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ExamModal;
