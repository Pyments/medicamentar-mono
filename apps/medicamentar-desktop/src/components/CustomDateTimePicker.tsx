import { TextField } from "@mui/material";
import dayjs from "dayjs";

export default function CustomDateTimePicker({
  selectedDate,
  setSelectedDate,
  errors,
  setErrors,
  darkMode,
}: {
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  errors: { selectedDate?: string };
  setErrors: (cb: (prev: any) => any) => void;
  darkMode: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = dayjs(e.target.value);
    setSelectedDate(newDate);
    setErrors((prev) => ({ ...prev, selectedDate: undefined }));
  };

  return (
    <TextField
      fullWidth
      label="DATA E HORA"
      type="datetime-local"
      value={selectedDate?.format("YYYY-MM-DDTHH:mm")}
      defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
      onChange={handleChange}
      error={Boolean(errors.selectedDate)}
      helperText={errors.selectedDate}
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: "0.9rem",
          color: darkMode ? "common.white" : "text.primary",
          "&.Mui-focused": {
            color: darkMode ? "common.white" : "primary.main",
          },
        },
      }}
      InputProps={{
        sx: {
          fontSize: "0.9rem",
          color: darkMode ? "common.white" : "text.primary",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "rgba(128, 128, 128, 0.6)" : "-moz-initial",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "common.white" : "primary.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#103952" : "primary.main",
          },
        },
      }}
    />
  );
}
