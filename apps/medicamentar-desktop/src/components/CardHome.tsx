import { Box, Card, Grid, Typography } from "@mui/material";
import { useTheme } from "../constants/theme/useTheme";

interface HomeCardProps {
  titulo: string;
  descricao: string;
  dataHora: string;
}

const CardHome: React.FC<HomeCardProps> = ({ titulo, descricao, dataHora }) => {
  const { darkMode } = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 175,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey.200",
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%" },
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? "primary.dark" : "primary.light",
            padding: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#F4FAFE",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {titulo}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "70%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                width: "auto",
                color: "#62636C",
                maxWidth: "150px",
                textAlign: "center",
              }}
            >
              {descricao}
            </Typography>

            <Typography
              sx={{
                m: 1,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: "common.black",
              }}
            >
              {dataHora}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
export default CardHome;
