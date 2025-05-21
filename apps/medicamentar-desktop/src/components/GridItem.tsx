import { Paper, Typography, Stack, styled, Box } from "@mui/material";
import { actionTypes } from "../types/actionTypes";
import { gridItemTypes } from "../types/gridItemTypes";
import { useTheme } from "@constants/theme/useTheme";

function runningActionColors(actionType: string): string {
  const actionColors: Record<actionTypes, string> = {
    warning: "#FF9800",
    "Exame Criado": "#2E7D32",
    "Exame Deletado": "#D32F2F",
    "Exame Atualizado": "#FF9820",
    "Consulta Criado": "#2E7D32",
    "Consulta Deletado": "#2E7D32",
    "Consulta Atualizado": "#FF9820",
    alarmAnswered: "primary.main",
    "Medicamento Criado": "#2E7D32",
    "Medicamento Atualizado": "#2E7D32",
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

  return (
    <StyledPaper>
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          marginBottom: "8px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            flex: 100,
            fontWeight: 800,
            fontSize: "17px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {description ? description : name}
        </Typography>
        <Typography
          sx={{
            flex: 1,
            color: "#fff",
            height: "40px",
            paddingY: "6px",
            fontSize: "12px",
            paddingX: "10px",
            fontWeight: "800",
            textWrap: "nowrap",
            borderRadius: "8px",
            alignContent: "center",
            backgroundColor: runningActionColors(actionType),
          }}
        >
          {actionType.toUpperCase()}
        </Typography>
      </Box>
      <Stack direction="column">
        <Typography
          sx={{
            lineClamp: 1,
            fontSize: "12px",
            fontWeight: "700",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {doctorName || name}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "700",
            color: darkMode ? "#fff" : "#62636C",
          }}
        >
          {date ? date : eventDate}
        </Typography>
      </Stack>
    </StyledPaper>
  );

  /* if (actionType == "Consulta Criado") {
    return (
      <StyledPaper>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%", textOverflow: "ellipsis",  }}
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
    );
  } else if (actionType == "Exame Criado") {
    return (
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
    );
  } else if (actionType == "Medicamento Criado") {
    return (
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
    );
  } else if (actionType == "Medicamento Deletado") {
    return (
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
    );
  } */
}

export default GridItem;
