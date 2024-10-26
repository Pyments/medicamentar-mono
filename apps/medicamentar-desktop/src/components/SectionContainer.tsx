import { Stack } from "@mui/material";
import { ReactNode } from "react";

export const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        marginTop: "100px",
        maxWidth: "100%",
        gap: "50px",
        padding: "75px",
      }}
    >
      {children}
    </Stack>
  );
};
