import { Paper, Typography, Stack } from "@mui/material";

export type gridItemTypes = {
    title: string,
    actionType: string,
    action: string,
    date: string,
    medic?: string
};

type actionTypes = 
    "warning" |
    "alarmAnswered" |
    "deleted" |
    "created";

function runningActionColors(actionType: string) : string{
    const actionColors: Record<actionTypes, string> = {
        warning: "#FF9800",
        alarmAnswered: "primary.main",
        deleted: "#D32F2F",
        created: "#2E7D32"
    };
    return (actionColors[actionType as actionTypes] || "#c1c1c1")
}

const GridItem = ({ title, actionType, action, date, medic } : gridItemTypes) => {
    return (
        <Paper 
        variant="outlined"
        square={false}
        sx={{
            width: "450px",
            height: "90px",
            backgroundColor: "background.paper",
            padding: "10px"
        }}
        >   
            <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>{title}</Typography>
                <Typography sx={{ backgroundColor: runningActionColors(actionType), borderRadius: "8px", padding: "6px", color: "#fff" }}>{action}</Typography>
            </Stack>
            <Stack direction="column">
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>{date}</Typography>
                { medic && <Typography sx={{ fontSize: "12px", fontWeight: "700" }} >{medic}</Typography> }
            </Stack>
        </Paper>
    );
}

export default GridItem;