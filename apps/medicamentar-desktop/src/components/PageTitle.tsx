import { Box } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme";

export const PageTitle = ({ children }: { children: string }) => {
  const { largeFont, darkMode } = useTheme();
  
  return (
    <Box
      sx={{
        fontSize: largeFont ? "2.2rem" : "2rem",
        fontWeight: "bold",
        color: darkMode ? "text.primary" : "primary.darker",
        mb: 3
      }}
    >
      {children}
    </Box>
  );
};