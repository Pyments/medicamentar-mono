import { Paper, Typography, Stack, styled } from "@mui/material";
import { actionTypes } from "../types/actionTypes";
import { gridItemTypes } from "../types/gridItemTypes";
import { useTheme } from "@constants/theme/useTheme";

function runningActionColors(actionType: string) : string{
    const actionColors: Record<actionTypes, string> = {
        warning: "#FF9800",
        alarmAnswered: "primary.main",
        "Medicamento Deletado": "#D32F2F",
        "Consulta Criado": "#2E7D32",
        "Exame Criado" : "#2E7D32",
        "Medicamento Criado" : "#2E7D32"
    };
    return (actionColors[actionType as actionTypes] || "#c1c1c1")
}

const StyledPaper = styled(Paper)({
    width: "440px",
    height: "120px",
    backgroundColor: "background.paper",
    padding: "10px",
    variant: "outlined",
    square: false,
})

function GridItem({ actionType, description, name, date, eventDate, doctorName } : gridItemTypes) {
    const { darkMode } = useTheme();
    const cards: Record<actionTypes, () => React.ReactNode> = {
        "Consulta Criado": () => 
        <StyledPaper>
             <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Typography sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}>{description}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "800",alignContent: "center", height: "40px" ,backgroundColor: runningActionColors(actionType), borderRadius: "8px", padding: "6px", color: "#fff" }}>{actionType.toUpperCase()}</Typography>
            </Stack>
            <Stack direction="column">
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }} >{doctorName}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "700", color: darkMode ? "#fff" : "#62636C" }}>{date}</Typography>
            </Stack>
            {/* acho que ta falntado o local */}
        </StyledPaper>,
        "Exame Criado": () => 
        <StyledPaper>
            <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Typography sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}>{name}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "800",alignContent: "center", height: "40px" ,backgroundColor: runningActionColors(actionType), borderRadius: "8px", padding: "6px", color: "#fff" }}>{actionType.toUpperCase()}</Typography>
            </Stack>
            <Stack direction="column">
                <Typography sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}>{description}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "700", color: darkMode ? "#fff" : "#62636C"  }}>{date}</Typography>    
            </Stack>
        </StyledPaper>,
        "Medicamento Criado": () => 
        <StyledPaper>
             <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Typography sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}>{name}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "800",alignContent: "center", height: "40px" ,backgroundColor: runningActionColors(actionType), borderRadius: "8px", padding: "6px", color: "#fff" }}>{actionType.toUpperCase()}</Typography>
            </Stack>
            <Typography sx={{ fontSize: "12px", fontWeight: "700", color: darkMode ? "#fff" : "#62636C" }}>{eventDate}</Typography>
        </StyledPaper>,
        "warning": () => <StyledPaper></StyledPaper>,
        "alarmAnswered": () => <StyledPaper></StyledPaper>,
        "Medicamento Deletado": () => 
        <StyledPaper>
             <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Typography sx={{ fontSize: "15px", fontWeight: "700", maxWidth: "65%" }}>{name}</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "800",alignContent: "center", height: "40px" ,backgroundColor: runningActionColors(actionType), borderRadius: "8px", padding: "6px", color: "#fff" }}>{actionType.toUpperCase()}</Typography>
            </Stack>
            <Typography sx={{ fontSize: "12px", fontWeight: "700", color: darkMode ? "#fff" : "#62636C" }}>{eventDate}</Typography>
        </StyledPaper>
    };
    return cards[actionType]();
}

export default GridItem;