import { Box, CircularProgress, CircularProgressProps  } from "@mui/material";

interface LoaderProps extends CircularProgressProps {}
export const Loader = (props: LoaderProps) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
    > 
      <CircularProgress {...props}  />
    </Box>
  );
};
