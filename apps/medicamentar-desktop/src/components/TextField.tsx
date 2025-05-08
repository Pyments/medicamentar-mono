import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@constants/theme/useTheme";
import { FC } from "react";

const TextField: FC<TextFieldProps> = (props) => {
  const { darkMode, largeFont } = useTheme();

  return (
    <MuiTextField
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: largeFont ? '1.6rem' : '0.9rem',
          alignItems: 'center', 
        },
        '& .MuiInputBase-input': {
          fontSize: largeFont ? '1.6rem' : '0.9rem',
          padding: largeFont ? '12px 14px' : '10px 14px',
          lineHeight: largeFont ? '1.6rem' : '1.5rem',
          color: darkMode ? '#ffffff !important' : 'text.primary',
          textAlign: 'left',
          '&:-webkit-autofill': {
            WebkitTextFillColor: darkMode ? '#ffffff !important' : 'text.primary',
            WebkitBoxShadow: darkMode ? '0 0 0 100px #121212 inset' : 'none',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: largeFont ? '1.3rem' : '0.9rem',
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.primary',
          '&.Mui-focused': {
            color: darkMode ? '#ffffff' : 'primary.main',
          },
          '&.MuiInputLabel-shrink': {
            transform: largeFont
              ? 'translate(14px, -12px) scale(0.75)'
              : 'translate(14px, -6px) scale(0.75)',
            color: darkMode ? '#ffffff' : 'text.primary',
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
            borderWidth: '1px',
          },
          '&.Mui-focused .MuiInputBase-input': {
            color: darkMode ? '#ffffff !important' : 'text.primary',
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: largeFont ? '1rem' : '0.75rem',
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
        },
        ...props.sx,
      }}
    />
  );
};

export default TextField;
