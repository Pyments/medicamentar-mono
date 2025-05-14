import { Box, Card, Tooltip, Typography, IconButton } from "@mui/material";
// import { useLocation } from "react-router-dom";
import EditOutlinedIcon from "@assets/icons/EditOutlined";
import AccessAlarmOutlinedIcon from "@assets/icons/AccessAlarmOutlinedIcon";
import DeleteOutlineOutlinedIcon from "@assets/icons/DeleteOutlineOutlinedIcon";

import dayjs from "dayjs";
import { longDate } from "../types/sanitizeDate";
import { useTheme } from "@constants/theme/useTheme";

interface CardUniversalProps {
  type: string;
  dose?: number;
  title: string;
  unity?: number;
  period?: number;
  qtpDose?: number;
  onEdit?: () => void;
  description?: string;
  onDelete?: () => void;
  endDate?: dayjs.Dayjs;
  dateTime?: dayjs.Dayjs;
  continuousUse?: boolean;
  startDate?: dayjs.Dayjs;
}

const CardUniversal: React.FC<CardUniversalProps> = ({
  type,
  dose,
  title,
  unity,
  period,
  qtpDose,
  endDate,
  dateTime,
  startDate,
  // description,
  continuousUse,
  onEdit,
  onDelete,
}) => {
  const { darkMode, largeFont } = useTheme();
  // const location = useLocation().pathname;
  console.log(type);
  const Unity: Array<string> = [
    "MiliLitros(ml)",
    "Miligramas(mg)",
    "Gotas",
    "Comprimido/s",
    "Subcutânea",
  ];

  const cardRoot = {
    flex: 1,
    height: 1,
    display: "flex",
    minWidth: "120px",
    boxShadow: "none",
    minHeight: "280px",
    borderRadius: "5px",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: darkMode ? "text.secondary" : "background.paper",
    "& .MuiIconButton-root": {
      "& svg": {
        width: largeFont ? "16px" : "10px",
        height: largeFont ? "16px" : "10px",
      },
    },
  };

  const titleCard = {
    width: 1,
    py: "6px",
    fontWeight: "bold",
    textAlign: "center",
    wordWrap: "break-word",
    fontSize: largeFont ? "1.2rem" : "1rem",
    color: darkMode ? "text.primary" : "background.default",
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
    fontSize: largeFont ? "1rem" : "12px",
    wordWrap: "break-word",
    color: darkMode ? "common.black" : "common.black",
  };

  const buttonText = {
    fontWeight: "700",
    textAlign: "center",
    fontSize: largeFont ? "0.9rem" : "8px",
    color: darkMode ? "background.paper" : "background.default",
  };

  const dateText = {
    fontSize: largeFont ? "1rem" : "12px",
    color: "common.black",
    paddingLeft: "5px",
    fontWeight: "700",
    textAlign: "left",
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
        <Tooltip title="Editar" placement="top">
          <IconButton onClick={onEdit}>
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Typography sx={titleCard}>{title}</Typography>

        <Tooltip title="Deletar" placement="top">
          <IconButton onClick={onDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            gap: "8px",
            display: "flex",
            paddingX: "6px",
            flexDirection: "column",
          }}
        >
          {continuousUse ? (
            <Typography sx={infoCard}>USO CONTÍNUO</Typography>
          ) : null}
          {unity ? (
            <Typography sx={infoCard}>
              {qtpDose} {Unity[unity]}
            </Typography>
          ) : null}
          <Typography sx={infoCard}>
            {dose} em {dose} horas
          </Typography>
          <Typography sx={infoCard}>PERÍODO: {period} dias</Typography>
          <Box
            sx={{
              flex: 1,
              gap: "6px",
              padding: "6px",
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
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
              {dateTime ? (
                <Typography sx={dateText}>{longDate(dateTime)}</Typography>
              ) : (
                <>
                  <Typography sx={dateText}>
                    Início: {longDate(startDate)}
                  </Typography>
                  <Typography sx={dateText}>
                    Fim: {longDate(endDate)}
                  </Typography>
                </>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={cardButton}>
        <Typography sx={buttonText}>CLIQUE APÓS TOMAR O MEDICAMENTO</Typography>
      </Box>
    </Card>
  );
};

export default CardUniversal;
