// src/components/Panel.jsx
import { useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import '../scss/panel.scss';

function PanelItem({ children, text, close = false, classes = "" }) {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            transition: 'all 0.3s',
            '&:hover': { backgroundColor: 'action.hover' },
            '.text': {
                opacity: close ? 0 : 1,
                width: close ? 0 : 'auto',
                overflow: 'hidden',
                transition: 'opacity 0.3s, width 0.3s',
                whiteSpace: 'nowrap',
            },
        }} className={`panel-item ${classes}`}>
            <span className='icon' style={{ marginRight: '8px' }}>
                {children}
            </span>
            <span className={`text ${close ? 'close' : 'open'}`}>
                {text}
            </span>
        </Box>
    );
}

PanelItem.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string,
    close: PropTypes.bool,
    classes: PropTypes.string,
};

export default function Panel() {
    const [closed, setClosed] = useState(false);
    const res = useResolvedPath();
    console.log(res.pathname);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', width: closed ? '60px' : '200px', transition: 'width 0.3s', height: '100vh', backgroundColor: 'background.paper', boxShadow: 3 }}>
            <Paper sx={{ padding: '16px', backgroundColor: 'primary.main', color: 'primary.contrastText', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <MenuIcon fontSize='medium' onClick={() => setClosed(!closed)} sx={{ cursor: 'pointer' }} />
            </Paper>
            <PanelItem text="Home" close={closed}>
                <HomeIcon />
            </PanelItem>
            <PanelItem text="Users" close={closed}>
                <PersonIcon />
            </PanelItem>
            <PanelItem text="Roles" close={closed}>
                <GroupAddIcon />
            </PanelItem>
            <PanelItem text="Tickets" close={closed}>
                <ConfirmationNumberIcon />
            </PanelItem>
            <Box sx={{ flexGrow: 1 }}></Box>
            <PanelItem text="" close={closed}>
                <AccountCircleIcon fontSize='large' />
            </PanelItem>
            <PanelItem text="" close={closed}>
                <SettingsIcon fontSize='large' />
            </PanelItem>
        </Card>
    );
}
