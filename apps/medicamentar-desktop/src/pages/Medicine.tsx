import { Box, Typography, Button, Grid } from "@mui/material";
import Header from "../components/Header.tsx";
import SideBar from "../components/SideBar.tsx";
import Add_Icon from "../assets/icons/Add_Icon.tsx";
import { useTheme } from "../constants/theme/useTheme";
import { SectionContainer } from "../components/SectionContainer.tsx";
import CardUniversal from "../components/CardUniversal.tsx";

const Medicine = () => {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: darkMode ? "primary.main" : "common.white",
      }}
    >
      <Header />
      <SideBar />

      <SectionContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", sm: "flex-start" },
            justifyContent: { xs: "flex-start", sm: "space-between" },
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: darkMode ? "common.white" : "primary.main",
              marginRight: { sm: "15px" },
            }}
          >
            <h1>MEDICAMENTOS</h1>
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#91C7EF",
              fontWeight: "bold",
              padding: "14px",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: { xs: "19px" },
              width: { md: "auto", sm: "auto", xs: "100%" },
              height: "50px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                marginRight: "8px",
                marginTop: "5px",
                width: "24px",
                height: "24px",
              }}
            >
              <Add_Icon />
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "13px",
                wordBreak: "break-word",
                overflow: "hidden",
              }}
            >
              ADICIONAR MEDICAMENTO
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            paddingBottom: "100px",
            height: "80%",
            overflow: "hidden",
            maxWidth: "1100px",
            overflowY: "auto",
          }}
        >
          <Grid container spacing={3}>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
            <CardUniversal
              type={"medication"}
              continuousUse={"SIM"}
              qtpDose={"10 COMPRIMIDOS"}
              dose={"1 COMPRIMIDO"}
              title={"CARD UNIVERSAL"}
              period={"20/06/2024 A 27/06/2024"}
              expirationDate={"20/06/2024"}
              dateTime={"20/06 ÀS 14H"}
            ></CardUniversal>
          </Grid>
        </Box>
      </SectionContainer>
    </Box>
  );
};

export default Medicine;
