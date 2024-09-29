import { Box, Typography, Button } from '@mui/material';
import SideBar from '../components/SideBar.tsx';
import Header from '../components/Header.tsx';
import Add_Icon from '../../public/assets/icons/Add_Icon.tsx';

const Medicine = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Header />
      <SideBar />
      <Box 
        sx={{ 
          margin: '3%', 
          marginTop: '4%', 
          paddingTop: '84px', 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start', 
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          width: '100%' 
        }}
      >
        <Typography 
          sx={{ 
            color: 'primary.dark', 
            marginRight: { sm: '15px' },
            marginBottom: { xs: '20px', sm: '0' }
          }}
        >
          <h1>MEDICAMENTOS</h1>
        </Typography>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: "#91C7EF",
            fontWeight: 'bold',
            padding: '14px',
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px'
          }}
        >
          <Box sx={{ marginRight: '8px', marginTop: '5px', width: '24px', height: '24px' }}>
            <Add_Icon />
          </Box>
          ADICIONAR MEDICAMENTO
        </Button>
      </Box>
    </Box>
  );
};

export default Medicine;