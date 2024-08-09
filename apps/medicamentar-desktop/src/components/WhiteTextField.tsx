import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const WhiteTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        ref={ref}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "common.white",
            borderColor: "common.white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                color: "common.white",
                borderColor: "common.white",
              },
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "common.white",
          },
        }}
      />
    );
  }
);

export default WhiteTextField;
