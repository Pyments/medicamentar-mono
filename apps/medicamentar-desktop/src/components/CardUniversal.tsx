import { Box, Card, Tooltip, Typography, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import EditOutlinedIcon from "@assets/icons/EditOutlined";
import AccessAlarmOutlinedIcon from "@assets/icons/AccessAlarmOutlinedIcon";
import DeleteOutlineOutlinedIcon from "@assets/icons/DeleteOutlineOutlinedIcon";

import dayjs from "dayjs";
import { longDate } from "../types/sanitizeDate";
import { useTheme } from "@constants/theme/useTheme";

interface CardUniversalProps {
  title?: string;
  isCompleted: boolean;

  type?: string;
  dose?: number;
  unity?: string;
  amount?: number;
  period?: number;
  qtpDose?: number;
  onEdit?: () => void;
  onDelete?: () => void;
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
  title,
  isCompleted,

  amount,
  continuousUse,
  dose,
  endDate,
  name,
  nextDose,
  //ophthalmicDetails,
  period,
  startDate,
  // type,
  unity,

  date,
  local,
  doctorName,
  description,

  onEdit,
  onDelete,
}) => {
  const { darkMode, largeFont } = useTheme();
  const location = useLocation().pathname;

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
    backgroundColor: darkMode ? "text.secondary" : "background.paper",
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
              {date ? (
                <Typography sx={dateText}>{longDate(date)}</Typography>
              ) : (
                <>
                  <Typography sx={dateText}>
                    Início: {longDate(startDate)}
                  </Typography>
                </>
              )}
              {endDate ? (
                <Typography sx={dateText}>Fim: {longDate(endDate)}</Typography>
              ) : null}
            </Typography>
          </Box>
          {true ? (
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              Próxima dose: {longDate(nextDose)}
            </Typography>
          ) : null}
          {true ? (
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              {longDate(nextDose)}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Box sx={cardButton}>
        <Typography sx={buttonText}>CLIQUE APÓS TOMAR O MEDICAMENTO</Typography>
      </Box>
    </Card>
  );
};

export default CardUniversal;
