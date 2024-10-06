import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExamModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [examName, setExamName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Box
      onClick={handleClose}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">EXAME</Typography>
          <IconButton onClick={handleClose}>
            
          </IconButton>
        </Box>

        <Box mb={2}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="input"
            style={{ width: '100%' }}
          />
        </Box>

        <TextField
          fullWidth
          label="Nome do Exame"
          variant="outlined"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Local"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Descrição"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />

        <Button fullWidth variant="contained" color="primary" onClick={handleClose}>
          Adicionar
        </Button>
      </Box>
    </Box>
  );
};

export default ExamModal;
