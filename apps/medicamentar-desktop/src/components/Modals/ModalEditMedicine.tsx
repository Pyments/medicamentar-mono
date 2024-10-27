import {Autocomplete, Box, Button, Checkbox, Dialog, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import ModalXCloseButton from "../../assets/icons/ModalXCloseButton.svg"
import CalendarIcon from "../../assets/icons/CalendarIcon.svg"
import { useTheme } from "../../constants/theme/useTheme";


interface ModalEditMedicineProps{
    isOpen:boolean;
    onClose:()=>void;
}

const ModalEditMedicine: React.FC<ModalEditMedicineProps>= ({isOpen, onClose})=>{
const frequencyDose = ["2/2 H", "4/4 H", "6/6 H", "8/8 H", "16/16 H","24/24 H","PERSONALIZADO"];
const unitMeasure = ["ML(MILILITROS)","MG(MILIGRAMAS)", "GOTAS", "COMPRIMIDOS","SUBCUTÂNEA"];
const { darkMode } = useTheme();

const styleLabel = {
    '& label.Mui-focused': { 
        color: darkMode ? "common.white" : "primary.main",
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': { 
            borderColor: darkMode ? "common.white" : "primary.main",
        },
    },
};


    return(
        <Dialog open={isOpen} fullWidth>
      <Box
        sx={{
          p: "30px",
          flexGrow: 1,
          backgroundColor:darkMode?"primary.darker" : "background.paper",
        }}
      >
         <IconButton onClick={onClose} sx={{float:"right"}}> 
                            <img src={ModalXCloseButton}/>
                        </IconButton>

        <Typography
          variant="h3"
          sx={{
            p: "20px 0 50px 0",
            fontSize: "1.8rem",
            fontWeight: 600,
            textAlign: "center",
            color: darkMode ? "common.white" : "primary.main",
          }}
        >
          NOVO MEDICAMENTO
        </Typography>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="NOME DO MEDICAMENTO"
                fullWidth
                sx={styleLabel}
              />
            </Grid>
            <Grid item xs={6}>
            <Autocomplete 
                        options={frequencyDose}
                        sx={styleLabel}
                        renderInput={(params)=><TextField {...params}label={"FREQUÊNCIA (DOSE)"}/>}
                        />
            </Grid>
            <Grid item xs={6}>
              <TextField variant="outlined" label="QUANTIDADE" fullWidth sx={styleLabel}/>
            </Grid>
            <Grid item xs={6}>
            <Autocomplete 
                        options={unitMeasure}
                        sx={styleLabel}
                        renderInput={(params)=><TextField {...params}label={"UNIDADE"}/>}
                        />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox sx={{
                '&.Mui-checked': { 
                    color: darkMode ? "common.white" : "primary.main",
                },
    }}/>} label="USO CONTÍNUO" />
            </Grid>
            <Grid item xs={6}>
              <TextField 
              variant="outlined" label="PERÍODO (DIAS)" fullWidth  sx={styleLabel}/>
            </Grid>
            <Grid item xs={6}>
              <TextField 
              variant="outlined" 
              label="DATA DE INÍCIO" 
              fullWidth 
              sx={styleLabel}
              InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <img src={CalendarIcon}/>
                    </InputAdornment>
                ),
            }}/>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                sx={styleLabel}
                label={"FINAL DO TRATAMENTO"}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <img src={CalendarIcon}/>
                                </InputAdornment>
                            ),
                        }}/>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              mx: "auto",
              my: "30px",
              py: "18px",
              px: "20%",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            SALVAR
          </Button>
        </FormGroup>
      </Box>
    </Dialog>
    );

} 
export default ModalEditMedicine;   