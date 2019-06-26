import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const MenuLinks = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            <Button component={Link} to="/jugadores" color="inherit">Jugadores</Button>
            <Button component={Link} to="/apuestas" color="inherit">Apuestas Activas</Button>
            <Button
                style={{
                    color: "#FFF",
                }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                Sistema
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/jugador/nuevo">Crear Jugador</MenuItem>
                <MenuItem onClick={handleClose}>Número Ganador</MenuItem>
                <MenuItem onClick={handleClose}>Tipo de Cambio</MenuItem>
                <MenuItem onClick={handleClose}>Constraseña</MenuItem>
                <MenuItem onClick={handleClose}>Fijar Topes</MenuItem>
            </Menu>
            <Button
                style={{
                    color: "#FFF",
                    '&:hover': {
                        color: '#fbd534',
                    }
                }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                Historial
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/jugador/nuevo">Crear Jugador</MenuItem>
                <MenuItem onClick={handleClose}>Número Ganador</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/cambio" >Tipo de Cambio</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/password/update">Constraseña</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/topes">Fijar Topes</MenuItem>
            </Menu>
            <Button component={Link} to="/jugadores" color="inherit">Jugadores</Button>


        </>
    )
};