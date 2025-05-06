import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme";
import { FC } from "react";

const ThemedTextField: FC<TextFieldProps> = (props) => {
  const { darkMode, largeFont } = useTheme();

  return (
    <TextField
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: largeFont ? '1.4rem' : '0.9rem',
        },
        '& .MuiInputBase-input': {
          fontSize: largeFont ? '1.4rem' : '0.9rem',
        },
        '& .MuiInputLabel-root': {
          fontSize: largeFont ? '1.2rem' : '0.9rem',
          color: darkMode ? 'common.white' : 'text.primary',
          '&.Mui-focused': {
            color: darkMode ? '#103952' : 'primary.main',
          },
        },
        '& .MuiOutlinedInput-root': {
          color: darkMode ? 'common.white' : 'text.primary',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? 'rgba(128, 128, 128, 0.6)' : 'inherit',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? 'common.white' : 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? '#103952' : 'primary.main',
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: largeFont ? '1rem' : '0.75rem',
        },
        ...props.sx
      }}
    />
  );
};

export default ThemedTextField;
