import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Timer, Assignment, Medication, MedicalServicesOutlined, PersonOutline, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const items = [
    { text: 'EVENTOS PRÓXIMOS', icon: <Timer /> },
    { text: 'CONSULTAS E EXAMES', icon: <Assignment /> },
    { text: 'MEDICAMENTOS', icon: <Medication /> },
    { text: 'EMERGÊNCIA', icon: <MedicalServicesOutlined /> },
    { text: 'PERFIL', icon: <PersonOutline /> },
    { text: 'CONFIGURAÇÕES', icon: <Settings /> },
    { text: 'SAIR', icon: <ExitToApp />, action: 'logout' },
];

const drawerStyles = {
    flexShrink: 0,
    width: 300,
    '& .MuiDrawer-paper': {
        width: 300,
        boxSizing: 'border-box',
        borderRight: 'none', 
        backgroundColor: "#F4FAFE",
        paddingTop: '128px',
        zIndex: 1200,
    },
};

const listItemStyles = {
    display: 'flex',
    alignItems: 'center',
    '&:hover': { backgroundColor: 'rgba(212, 237, 255, 1)' },
};

const listItemIconStyles = {
    display: 'flex',
    justifyContent: 'center',
};

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleItemClick = (action: string | undefined) => {
        if (action === 'logout') {
            navigate('/signin');
        }
    };

    return (
        <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
            <List>
                {items.map(({ text, icon, action }) => (
                    <ListItemButton
                        key={text}
                        sx={listItemStyles}
                        onClick={() => handleItemClick(action)}
                    >
                        <ListItemIcon sx={listItemIconStyles}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            primaryTypographyProps={{ sx: { fontSize: '14px', fontWeight: 'medium' } }}
                            sx={{ flex: 1, marginLeft: '12px',}}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
