import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

export const SectionContainer = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Stack
      sx={{
        top: 100,
        maxWidth: "100%",
        overflowY: "auto",
        position: "absolute",
        left: { xs: 75, md: 300 },
        height: "calc(100vh - 100px)",
        transition: "all 200ms ease-out",
        gap: { xs: 0, sm: "20px", md: "30px" },
        padding: { xs: "10px", sm: "20px", md: "35px" },
        width: { md: "calc(100% - 300px)", xs: "calc(100% - 75px)" },
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
