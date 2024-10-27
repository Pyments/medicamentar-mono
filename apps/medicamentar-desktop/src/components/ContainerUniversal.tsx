import { Container } from "@mui/material";
import { useTheme } from "../constants/theme/useTheme";
import { ReactNode } from "react";

export const ContainerUniversal = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useTheme();
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        minWidth: "100%",
        backgroundColor: darkMode ? "primary.main" : "common.white",
      }}
    >
      {children}
    </Container>
  );
};
