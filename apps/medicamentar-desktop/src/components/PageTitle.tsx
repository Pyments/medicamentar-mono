import { Typography } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme";

interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => {
  const { darkMode, largeFont } = useTheme();
  
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: largeFont ? "2.2rem" : "2rem",
        fontWeight: "bold",
        color: darkMode ? "text.primary" : "primary.darker",
        mb: 3
      }}
    >
      {children}
    </Typography>
  );
}; 