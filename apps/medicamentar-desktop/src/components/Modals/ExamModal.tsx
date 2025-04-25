import {
  Box,
  Tab,
  Tabs,
  Modal,
  Button,
  TextField,
  IconButton,
  AlertColor,
} from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axiosInstance from "@utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@constants/theme/useTheme";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Feedback } from "@components/Feedback";

interface ExamModalProps {
  open: boolean;
  onClose: () => void;
  fetchExams: () => Promise<void>;
}

interface FormErrors {
  selectedDate?: string;
  examName?: string;
  doctorName?: string;
  location?: string;
  description?: string;
}

interface User {
  token: {
    data: string;
  };
}

const ExamModal: React.FC<ExamModalProps> = ({ open, onClose, fetchExams }) => {
  const [tabValue, setTabValue] = useState("exame");
  const [isOpen] = useState<boolean>(true);
  const [examName, setExamName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [user] = useLocalStorage<User | null>("user", null);

  const [errors, setErrors] = useState<FormErrors>({});

  const { darkMode } = useTheme();

  const tabValues = ["exame", "consulta"];

  //feedbacks
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState<AlertColor>("success");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!selectedDate) {
      newErrors.selectedDate = "A data e hora são obrigatórias.";
    }

    if (tabValue === "exame" && !examName) {
      newErrors.examName = "O nome do exame é obrigatório.";
    }

    if (tabValue === "consulta" && !doctorName) {
      newErrors.doctorName = "O nome do médico é obrigatório.";
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
      if (tabValue === "exame") {
        const response = await axiosInstance.post(
          "/exam",
          {
            date: formattedDate,
            name: examName,
            local: location,
            description: description,
          },
          {
            headers: { Authorization: `Bearer ${user?.token.data}` },
          }
        );
        setFeedbackMessage("Exame adicionado com sucesso!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);

        console.log(response.data);
      } else {
        const response = await axiosInstance.post(
          "/consultation",
          {
            date: formattedDate,
            doctorName: doctorName,
            local: location,
            description: description,
          },
          {
            headers: { Authorization: `Bearer ${user?.token.data}` },
          }
        );
        setFeedbackMessage("Consulta adicionada com sucesso!");
        setFeedbackSeverity("success");
        setFeedbackOpen(true);
        console.log(response.data);
      }
      await fetchExams();
    } catch (error) {
      setFeedbackMessage("Erro ao adicionar consulta ou exame!");
      setFeedbackSeverity("success");
      setFeedbackOpen(true);
      console.error("Erro na requisição:", error);
    }

    setExamName("");
    setLocation("");
    setDescription("");
    setDoctorName("");
    setSelectedDate(null);
    setErrors({});
    onClose();
  };

  return (
    <>
      <Feedback
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        severity={feedbackSeverity}
        message={feedbackMessage} />

      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: darkMode ? "grey.900" : "common.white",
            width: 500,
            p: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            boxShadow: 24,
            borderRadius: "5px",
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
          <Tabs
            onChange={handleChange}
            value={tabValue}
            sx={{
              "& .Mui-selected": {
                color: darkMode ? "primary.light" : "primary.main",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: darkMode ? "#1A8BCA" : "primary.main",
              },
              mb: "20px",
            }}
          >
            {tabValues.map((tab) => (
              <Tab
                sx={{
                  fontSize: "20px",
                  textTransform: "uppercase",
                  color: darkMode ? "common.white" : "-moz-initial",
                }}
                label={tab}
                value={tab}
                key={tab}
              />
            ))}
          </Tabs>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
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
                    inputProps: {
                      ...params.inputProps,
                      readOnly: true,
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

            {tabValue === "exame" && (
              <>
                <TextField
                  sx={{ margin: 0 }}
                  fullWidth
                  label="NOME DO EXAME"
                  variant="outlined"
                  value={examName}
                  onChange={(e) => {
                    setExamName(e.target.value);
                    if (e.target.value) {
                      setErrors((prev) => ({ ...prev, examName: undefined }));
                    }
                  }}
                  margin="normal"
                  error={Boolean(errors.examName)}
                  helperText={errors.examName}
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
              </>
            )}

            {tabValue === "consulta" && (
              <>
                <TextField
                  sx={{ margin: 0 }}
                  fullWidth
                  label="NOME DO MÉDICO"
                  variant="outlined"
                  value={doctorName}
                  onChange={(e) => {
                    setDoctorName(e.target.value);
                    if (e.target.value) {
                      setErrors((prev) => ({ ...prev, doctorName: undefined }));
                    }
                  }}
                  margin="normal"
                  error={Boolean(errors.doctorName)}
                  helperText={errors.doctorName}
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
              </>
            )}

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
              adicionar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ExamModal;
