import { Paper, Typography, Stack, styled } from "@mui/material";
import { actionTypes } from "../types/actionTypes";
import { gridItemTypes } from "../types/gridItemTypes";
import { useTheme } from "@constants/theme/useTheme";

function runningActionColors(actionType: string): string {
  const actionColors: Record<actionTypes, string> = {
    warning: "#FF9800",
    "Exame Criado": "#2E7D32",
    "Consulta Criado": "#2E7D32",
    alarmAnswered: "primary.main",
    "Medicamento Criado": "#2E7D32",
    "Medicamento Deletado": "#D32F2F",
  };
  return actionColors[actionType as actionTypes] || "#c1c1c1";
}

const StyledPaper = styled(Paper)({
  square: false,
  width: "440px",
  height: "120px",
  padding: "10px",
  variant: "outlined",
  backgroundColor: "background.paper",
});

function GridItem({
  name,
  date,
  eventDate,
  actionType,
  doctorName,
  description,
}: gridItemTypes) {
  const { darkMode } = useTheme();
  const cards: Record<actionTypes, () => React.ReactNode> = {
    "Consulta Criado": () => (
      <StyledPaper>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              height: "40px",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "800",
              borderRadius: "8px",
              alignContent: "center",
              backgroundColor: runningActionColors(actionType),
            }}
          >
            {actionType.toUpperCase()}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
            {doctorName}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              color: darkMode ? "#fff" : "#62636C",
            }}
          >
            {date}
          </Typography>
        </Stack>
      </StyledPaper>
    ),
    "Exame Criado": () => (
      <StyledPaper>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              height: "40px",
              padding: "6px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "800",
              borderRadius: "8px",
              alignContent: "center",
              backgroundColor: runningActionColors(actionType),
            }}
          >
            {actionType.toUpperCase()}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "700",
              color: darkMode ? "#fff" : "#62636C",
            }}
          >
            {date}
          </Typography>
        </Stack>
      </StyledPaper>
    ),
    "Medicamento Criado": () => (
      <StyledPaper>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              height: "40px",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "800",
              borderRadius: "8px",
              alignContent: "center",
              backgroundColor: runningActionColors(actionType),
            }}
          >
            {actionType.toUpperCase()}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "700",
            color: darkMode ? "#fff" : "#62636C",
          }}
        >
          {eventDate}
        </Typography>
      </StyledPaper>
    ),
    warning: () => <StyledPaper></StyledPaper>,
    alarmAnswered: () => <StyledPaper></StyledPaper>,
    "Medicamento Deletado": () => (
      <StyledPaper>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              padding: "6px",
              height: "40px",
              fontSize: "12px",
              fontWeight: "800",
              borderRadius: "8px",
              alignContent: "center",
              backgroundColor: runningActionColors(actionType),
            }}
          >
            {actionType.toUpperCase()}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "700",
            color: darkMode ? "#fff" : "#62636C",
          }}
        >
          {eventDate}
        </Typography>
      </StyledPaper>
    ),
  };
  return cards[actionType]();
}

export default GridItem;
