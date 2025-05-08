import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme";
import { FC } from "react";

const BaseTextField: FC<TextFieldProps> = (props) => {
  const { darkMode, largeFont } = useTheme();

  return (
    <MuiTextField
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: largeFont ? '1.4rem' : '0.9rem',
        },
        '& .MuiInputBase-input': {
          fontSize: largeFont ? '1.4rem' : '0.9rem',
          padding: largeFont ? '16px 14px' : '10px 14px',
          height: 'auto',
          lineHeight: largeFont ? '1.6' : '1.4',
        },
        '& .MuiInputLabel-root': {
          fontSize: largeFont ? '1.2rem' : '0.9rem',
          transform: largeFont 
            ? 'translate(14px, -12px) scale(0.75)'
            : 'translate(14px, -6px) scale(0.75)',
          '&.Mui-focused': {
            color: darkMode ? '#ffffff' : 'primary.main',
          },
        },
        '& .MuiOutlinedInput-root': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? '#ffffff' : 'primary.main',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: darkMode ? '#ffffff' : 'primary.main',
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: largeFont ? '1rem' : '0.75rem',
        },
        ...props.sx,
      }}
    />
  );
};

export default BaseTextField; 