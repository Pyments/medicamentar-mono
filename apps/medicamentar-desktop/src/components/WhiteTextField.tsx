import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { useTheme } from "@constants/theme/useTheme";

const WhiteTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { largeFont } = useTheme();

    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "common.white",
            borderColor: "common.white",
            fontSize: largeFont ? "1.4rem" : "0.9rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "& input": {
              fontSize: largeFont ? "1.4rem" : "0.9rem",
            },
            "& textarea": {
              fontSize: largeFont ? "1.4rem" : "0.9rem",
            }
          },
          "& .MuiInputLabel-outlined": {
            color: "common.white",
            fontSize: largeFont ? "1.2rem" : "0.9rem",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "common.white",
            fontSize: largeFont ? "1.2rem" : "0.9rem",
          },
        }}
      />
    );
  }
);

WhiteTextField.displayName = "WhiteTextField";

export default WhiteTextField;