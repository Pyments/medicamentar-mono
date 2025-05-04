import {
  Box,
  Card,
  Grid,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import EditOutlinedIcon from "@assets/icons/EditOutlined";
import AccessAlarmOutlinedIcon from "@assets/icons/AccessAlarmOutlinedIcon";
import DeleteOutlineOutlinedIcon from "@assets/icons/DeleteOutlineOutlinedIcon";

import dayjs from "dayjs";
import { longDate } from "../types/sanitizeDate";
import { useTheme } from "@constants/theme/useTheme";

interface CardUniversalProps {
  type: "medication" | "events";
  title: string;
  continuousUse?: boolean;
  dose?: number;
  qtpDose?: number;
  period?: number;
  dateTime?: dayjs.Dayjs | string;
  startDate?: string;
  endDate?: string;
  description?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const CardUniversal: React.FC<CardUniversalProps> = ({
  type,
  title,
  continuousUse,
  dose,
  qtpDose,
  period,
  dateTime,
  startDate,
  endDate,
  description,
  onDelete,
  onEdit,
}) => {
  const { darkMode } = useTheme();
  const isMedication = type === "medication";
  const isEvents = type === "events";
  const location = useLocation().pathname;

  const titleCard = {
    width: 1,
    minWidth: "30%",
    fontSize: "12px",
    maxHeigth: "50px",
    marginInline: "5%",
    fontWeight: "bold",
    textAlign: "center",
    wordWrap: "break-word",
    py: location === "/home" ? "5px" : 0,
    color: darkMode ? "text.primary" : "background.default",
  };
  const cardButton = {
    height: "30px",
    display: "flex",
    cursor: "pointer",
    boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
  };

  const infoCard = {
    fontSize: "12px",
    wordWrap: "break-word",
    color: darkMode ? "common.black" : "common.black",
  };

  return (
    <>
      {isMedication && (
        <Card
          sx={{
            minHeight: 260,
            display: "flex",
            width: "300px",
            minWidth: "120px",
            boxShadow: "none",
            borderRadius: "5px",
            flexDirection: "column",
            justifyContent: "space-between",
            // width: { xs: "95%", sm: "95%", md: "90%", lg: "99%" },
            backgroundColor: darkMode ? "text.secondary" : "background.paper",
          }}
        >
          <Box
            sx={{
              padding: "2px",
              display: "flex",
              maxHeight: "100px",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
            }}
          >
            <Tooltip title="Editar" placement="top">
              <IconButton onClick={onEdit}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Typography sx={{ ...titleCard }}>{title}</Typography>

            <Tooltip title="Deletar" placement="top">
              <IconButton onClick={onDelete}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              height: "72%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "219px",
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "16px",
                  alignSelf: "center",
                }}
              >
                <Typography sx={infoCard}>
                  USO CONTÍNUO: {continuousUse ? "SIM" : "NÃO"}
                </Typography>
                <Typography sx={infoCard}>QUANTIDADE: {qtpDose}</Typography>
                <Typography sx={infoCard}>DOSE: {dose}</Typography>
                <Typography sx={infoCard}>PERÍODO: {period}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "219px",
                  gap: "8px",
                  padding: "16px",
                  alignSelf: "center",
                  flex: 1,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <AccessAlarmOutlinedIcon />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "common.black",
                    textAlign: "left",
                    flex: 1,
                  }}
                >
                  {isMedication ? (
                    <>
                      Início: {longDate(startDate)}
                      {!continuousUse && endDate && (
                        <>
                          <br />
                          Fim: {longDate(endDate)}
                        </>
                      )}
                    </>
                  ) : (
                    longDate(dateTime)
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              ...cardButton,
              backgroundColor: darkMode ? "text.primary" : "text.secondary",
            }}
          >
            <Typography
              sx={{
                fontSize: "8px",
                fontWeight: "700",
                textAlign: "center",
                color: darkMode ? "background.paper" : "background.default",
              }}
            >
              CLIQUE APÓS TOMAR O MEDICAMENTO
            </Typography>
          </Box>
        </Card>
      )}

      {isEvents && (
        <Card
          sx={{
            minHeight: 260,
            display: "flex",
            width: "300px",
            minWidth: "120px",
            boxShadow: "none",
            borderRadius: "5px",
            flexDirection: "column",
            // width: { xs: "95%", sm: "95%", md: "90%", lg: "99%" },
            backgroundColor: darkMode ? "text.secondary" : "background.paper",
          }}
        >
          <Box
            sx={{
              px: "8px",
              py: "4px",
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                maxHeight: "100px",
                alignItems: "center",
                backgroundColor: darkMode ? "primary.dark" : "primary.light",
              }}
            >
              {location !== "/home" && (
                <Tooltip title="Editar" placement="top">
                  <IconButton onClick={onEdit}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Typography sx={{ ...titleCard }}>{title}</Typography>
              {location !== "/home" && (
                <Tooltip title="Deletar" placement="top">
                  <IconButton onClick={onDelete}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              gap: "12px",
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#62636C",
                textAlign: "center",
              }}
            >
              {description}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: "common.black",
              }}
            >
              {dateTime
                ? longDate(dateTime as string | dayjs.Dayjs)
                : "Data não disponível"}
            </Typography>
          </Box>
        </Card>
      )}
    </>
    // </Grid>
  );
};
export default CardUniversal;
