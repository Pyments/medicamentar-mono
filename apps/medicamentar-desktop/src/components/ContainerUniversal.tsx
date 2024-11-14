import { Container, SxProps } from "@mui/material";
import { useTheme } from "@theme/useTheme";
import { ReactNode } from "react";

export const ContainerUniversal = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) => {
  const { darkMode } = useTheme();
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        minWidth: "100%",
        overflow: "hidden",
        position: "relative",
        backgroundColor: darkMode ? "primary.main" : "common.white",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
