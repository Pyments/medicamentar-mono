import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { Box, Container, Grid, Stack } from "@mui/material";
import { useTheme } from "../constants/theme/useTheme";
import GridItem from "../components/GridItem";
import { gridItemTypes } from "../components/GridItem";

const historyObject: gridItemTypes = {
    title: "",
    actionType: "",
    action: "",
    date: "",
    medic: ""
};

const displayHistoryCards = () => {
    const gridArray = [];
    const historyQuantity: number = 0; // pegar a quantidade de eventos do back-end

    for(let i = 0; i <= historyQuantity; i++){
        historyObject.action = "" // pegar novo dado do back-end
        historyObject.actionType = "" // pegar novo dado do back-end
        historyObject.action = "" // pegar novo dado do back-end
        historyObject.date = "" // pegar novo dado do back-end
        historyObject.medic = "" // pegar novo dado do back-end
        gridArray.push(
            <Grid item>
                <GridItem 
                title={historyObject.title}
                actionType={historyObject.actionType}
                action={historyObject.action}
                date={historyObject.date}
                medic={historyObject.medic}
                />      
            </Grid>
        );
    }
    return (gridArray);
}

const History = () => {
    const { darkMode } = useTheme();
    return (
        <Container
        sx={{
            display: "flex",
            paddingTop: "175px",
            backgroundColor: darkMode ? "primary.main" : "common.white",
            height: "100vh",
            minWidth: "100%",
        }}
        >
            <Header />
            <Sidebar />
            <Stack sx={{ alignItems: "center", margin: "0 50px" }} spacing="67px">
                <Box component="h1" sx={{ color: darkMode ? "text.primary" : "primary.darker", alignSelf: "start" }}>
                        HISTÓRICO
                </Box>
                <Grid container spacing={2} sx={{ maxWidth: "fit-content",}}> 
                    {/* componentes abaixo servem apenas de demonstração e placeholding */}
                    <Grid item>
                        <GridItem 
                            title="PARACETAMOL-10MG 8:30" 
                            actionType="warning" 
                            action="MEDICAMENTO EDITADO" 
                            date="24/10 12:18"
                        />
                    </Grid>
                    <Grid item>
                        <GridItem
                            title="OFTAMOLOGISTA 15:30" 
                            actionType="alarmAnswered" 
                            action="ALARME ATENDIDO" 
                            date="25/10 15:30" 
                            medic="CONSULTA COM DOUTORA JURAÇA"
                        />
                    </Grid>
                    <Grid item>
                        <GridItem
                            title="DORFLEX" 
                            actionType="deleted" 
                            action="MEDICAMENTO DELETADO" 
                            date="23/10 16:30"
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Container>       
    );
}

export default History