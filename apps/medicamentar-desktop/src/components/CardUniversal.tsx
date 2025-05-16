import {
  Box,
  Card,
  Tooltip,
  Typography,
  IconButton
} from "@mui/material";
import { useLocation } from "react-router-dom";
import EditOutlinedIcon from "@assets/icons/EditOutlined";
import AccessAlarmOutlinedIcon from "@assets/icons/AccessAlarmOutlinedIcon";
import DeleteOutlineOutlinedIcon from "@assets/icons/DeleteOutlineOutlinedIcon";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { longDate } from "../types/sanitizeDate";
import { useTheme } from "@constants/theme/useTheme";
import axiosInstance from "@utils/axiosInstance";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import CompleteModal from "./Modals/CompleteModal";

interface CardUniversalProps {
  title?: string;
  isCompleted: boolean;
  id: string;

  type?: string;
  dose?: number;
  unity?: string;
  amount?: number;
  period?: number;
  qtpDose?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  showFeedback?: (message: string, severity: "success" | "error") => void;
  endDate?: dayjs.Dayjs;
  continuousUse?: boolean;
  startDate?: dayjs.Dayjs;
  nextDose?: dayjs.Dayjs;
  ophthalmicDetails?: Object | null;

  name?: string;
  doctorName?: string;
  local?: string;
  date?: dayjs.Dayjs;
  description?: string;
}

const CardUniversal: React.FC<CardUniversalProps> = ({
  id,
  title,
  isCompleted,

  amount,
  continuousUse,
  dose,
  // endDate,
  name,
  nextDose,
  //ophthalmicDetails,
  period,
  // startDate,
  // type,
  unity,

  date,
  local,
  doctorName,
  description,

  onEdit,
  onDelete,
  onComplete,
  showFeedback,
}) => {
  const { darkMode, largeFont } = useTheme();
  const location = useLocation().pathname;

  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [dateTimeRemaining, setDateTimeRemaining] = useState<string>("");
  const [cardColor, setCardColor] = useState<string>("inherit");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [user] = useLocalStorage<{ token: { data: string } } | null>(
    "user",
    null
  );
  const token = user?.token.data;
  const isMedication = !!nextDose || !!dose || !!unity;

  const handleComplete = async () => {
    if (!token || !onComplete) return;
    setConfirmModalOpen(false);
    try {
      let endpoint = "";
      if (isMedication) {
        endpoint = `/medication/${id}/complete`;
      } else if (doctorName) {
        endpoint = `/consultation/${id}/complete`;
      } else {
        endpoint = `/exam/${id}/complete`;
      }

      await axiosInstance.patch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onComplete) {
        onComplete();
      }

      if (showFeedback) {
        showFeedback(
          isMedication
            ? "Medicamento marcado como tomado com sucesso!"
            : "Item marcado como concluído com sucesso!",
          "success"
        );
      }
    } catch (error) {
      console.error("Error marking as complete:", error);
      if (showFeedback) {
        showFeedback(
          isMedication
            ? "Erro ao marcar medicamento como tomado!"
            : "Erro ao marcar item como concluído!",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    const updateCountdowns = () => {
      const now = dayjs();
      let targetTime;
      let diff;

      if (nextDose) {
        targetTime = dayjs(nextDose);
        diff = targetTime.diff(now, "minute");
        if (diff < 0) {
          const absDiff = Math.abs(diff);
          setTimeRemaining(`Atrasado por ${absDiff} minutos`);
        } else if (diff < 60) {
          setTimeRemaining(`${diff} minutos restantes`);
        } else {
          const hours = Math.floor(diff / 60);
          const minutes = diff % 60;
          setTimeRemaining(`${hours}h ${minutes}m restantes`);
        }
      }

      if (date) {
        targetTime = dayjs(date);
        diff = targetTime.diff(now, "minute");

        if (diff < 0) {
          const absDiff = Math.abs(diff);
          if (absDiff < 60) {
            setDateTimeRemaining(`Atrasado por ${absDiff} minutos`);
          } else if (absDiff < 1440) {
            const hours = Math.floor(absDiff / 60);
            setDateTimeRemaining(`Atrasado por ${hours}h`);
          } else {
            const days = Math.floor(absDiff / 1440);
            setDateTimeRemaining(`Atrasado por ${days} dias`);
          }
        } else if (diff < 60) {
          setDateTimeRemaining(`${diff} minutos restantes`);
        } else if (diff < 1440) {
          const hours = Math.floor(diff / 60);
          const minutes = diff % 60;
          setDateTimeRemaining(`${hours}h ${minutes}m restantes`);
        } else {
          const days = Math.floor(diff / 1440);
          const hours = Math.floor((diff % 1440) / 60);
          setDateTimeRemaining(`${days}d ${hours}h restantes`);
        }
      }

      const relevantDiff = nextDose
        ? dayjs(nextDose).diff(now, "minute")
        : date
          ? dayjs(date).diff(now, "minute")
          : null;

      if (relevantDiff !== null) {
        if (relevantDiff < 0) {
          setCardColor("#ffcdd2");
        } else if (relevantDiff <= 10) {
          setCardColor("#fff9c4");
        } else if (relevantDiff <= 20) {
          setCardColor("#c8e6c9");
        } else {
          setCardColor("inherit");
        }
      }
    };

    if (nextDose || date) {
      updateCountdowns();
      const intervalId = setInterval(updateCountdowns, 60000);

      return () => clearInterval(intervalId);
    }
  }, [nextDose, date]);

  const cardRoot = {
    width: "300px",
    height: "100%",
    display: "flex",
    boxShadow: "none",
    minHeight: "280px",
    borderRadius: "5px",
    flexDirection: "column",
    justifyContent: "space-between",
    filter: isCompleted ? "brightness(0.65) grayscale(1)" : null,
    backgroundColor:
      cardColor !== "inherit"
        ? cardColor
        : darkMode
          ? "text.secondary"
          : "background.paper",
    "& .MuiIconButton-root": {
      "& svg": {
        width: largeFont ? "16px" : "10px",
        height: largeFont ? "16px" : "10px",
      },
    },
  };

  const titleCard = {
    p: "6px",
    width: "100%",
    maxHeight: "90px",
    fontWeight: "bold",
    overflowY: "auto",
    textAlign: "center",
    wordWrap: "break-word",
    fontSize: largeFont ? "1.4rem" : "1rem",
    color: darkMode ? "text.primary" : "background.default",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid white",
    },
  };
  const descriptionStyle = {
    my: "auto",
    overflowY: "scroll",
    maxHeight: "100px",
    fontSize: largeFont ? "1.3rem" : "1rem",
    height: "100%",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
    color: darkMode ? "primary.dark" : "text.secondary",
  };

  const infoBoxStyle = {
    flex: 1,
    gap: "6px",
    padding: "6px",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  };
  const cardButton = {
    display: "flex",
    paddingY: "8px",
    cursor: "pointer",
    boxShadow: "none",
    alignItems: "center",
    height: "fit-content",
    justifyContent: "center",
    backgroundColor: darkMode ? "text.primary" : "text.secondary",
    "&:hover": {
      backgroundColor: darkMode ? "primary.lighter" : "primary.dark",
      color: darkMode ? "text.primary" : "text.secondary",
    },
  };

  const infoCard = {
    fontSize: largeFont ? "1.3rem" : "1.1rem",
    wordWrap: "break-word",
    color: darkMode ? "common.black" : "common.black",
  };

  const buttonText = {
    fontWeight: "700",
    textAlign: "center",
    fontSize: largeFont ? "1.3rem" : "1rem",
    color: darkMode ? "background.paper" : "background.default",
  };

  const dateText = {
    textAlign: "left",
    fontWeight: "700",
    paddingLeft: "5px",
    color: "common.black",
    fontSize: largeFont ? "1.2rem" : "1rem",
  };

  return (
    <Card sx={cardRoot}>
      <Box
        sx={{
          paddingX: "2px",
          display: "flex",
          textWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: darkMode ? "primary.dark" : "primary.main",
        }}
      >
        {location !== "/home" && (
          <Tooltip title="Editar" placement="top-end">
            <IconButton onClick={onEdit}>
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        <Typography sx={titleCard}>{title || name || doctorName}</Typography>
        {location !== "/home" && (
          <Tooltip title="Deletar" placement="top-start">
            <IconButton onClick={onDelete}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          padding: "10px",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            gap: "8px",
            width: "100%",
            display: "flex",
            paddingX: "6px",
            flexDirection: "column",
          }}
        >
          {continuousUse ? (
            <Typography sx={infoCard}>Uso contínuo</Typography>
          ) : null}
          {unity ? (
            <Typography sx={infoCard}>
              {amount} {unity}
            </Typography>
          ) : null}
          {dose ? (
            <Typography sx={infoCard}>
              {dose} em {dose} horas
            </Typography>
          ) : null}
          {period ? (
            <Typography sx={infoCard}>Período: {period} dias</Typography>
          ) : null}
          {local ? (
            <Typography sx={{ ...descriptionStyle, textAlign: "center" }}>
              {local}
            </Typography>
          ) : null}
          {description ? (
            <Typography sx={descriptionStyle}>{description}</Typography>
          ) : null}

          {date ? (
            <Box sx={infoBoxStyle}>
              <AccessAlarmOutlinedIcon />
              <Typography
                sx={{
                  flex: 1,
                  fontWeight: "700",
                  textAlign: "left",
                  color: "common.black",
                  fontSize: largeFont ? "1rem" : "12px",
                }}
              >
                <Typography sx={dateText}>{longDate(date)}</Typography>
                <Typography
                  sx={{
                    ...dateText,
                    color:
                      cardColor === "#ffcdd2"
                        ? "error.main"
                        : cardColor === "#fff9c4"
                          ? "warning.main"
                          : cardColor === "#c8e6c9"
                            ? "success.main"
                            : "common.black",
                  }}
                >
                  {dateTimeRemaining}
                </Typography>
              </Typography>
            </Box>
          ) : null}
          {nextDose && (
            <>
              <Typography sx={{ width: "100%", textAlign: "center" }}>
                Próxima dose: {longDate(nextDose)}
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  color:
                    cardColor === "#ffcdd2"
                      ? "error.main"
                      : cardColor === "#fff9c4"
                        ? "warning.main"
                        : cardColor === "#c8e6c9"
                          ? "success.main"
                          : "text.primary",
                }}
              >
                {timeRemaining}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box sx={cardButton} onClick={() => setConfirmModalOpen(true)}>
        <Typography sx={buttonText}>
          {isMedication
            ? "CLIQUE APÓS TOMAR O MEDICAMENTO"
            : "MARCAR COMO CONCLUÍDO"}
        </Typography>
      </Box>

      <CompleteModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onComplete={handleComplete}
        isMedication={isMedication}
      />
    </Card>
  );
};

export default CardUniversal;
