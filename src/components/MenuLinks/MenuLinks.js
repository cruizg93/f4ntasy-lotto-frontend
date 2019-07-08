import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const MenuLinks = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isAdmin, setAdminValue] = React.useState(props.admin);
    const [isAsistente, setAsistenteValue] = React.useState(!props.admin && props.asistente);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            {isAdmin && <Button component={Link} to="/jugadores" color="inherit">Jugadores</Button>}
            {isAdmin && <Button component={Link} to="/apuestas" color="inherit">Apuestas Activas</Button>}

            {isAdmin &&
            <Button
                style={{
                    color: "#FFF",
                }}
                aria-controls="menu-sistema-elements"
                aria-haspopup="true"
                onClick={handleClick}>
                Sistema
            </Button>
            }

            {isAdmin &&
            <Menu
                id="menu-sistema-elements"
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
            }

            {isAdmin &&
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
            }

            {isAdmin &&
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/jugador/nuevo">Crear Jugador</MenuItem>
                <MenuItem onClick={handleClose}>Número Ganador</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/cambio">Tipo de Cambio</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/password/update">Constraseña</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/sistema/topes">Fijar Topes</MenuItem>
            </Menu>
            }

            {isAdmin &&
            <Button component={Link} to="/jugadores" color="inherit">Jugadores</Button>
            }

            {!isAdmin && <>
                {!isAsistente && <Button component={Link}
                                         to="/usuario/apuestas"
                                         color="inherit">Entrar Apuestas</Button>
                }
                {!isAsistente && <Button component={Link}
                                         to="/usuario/apuestas/hoy/activas"
                                         color="inherit">Apuestas Activas</Button>
                }
                {!isAsistente && <Button component={Link}
                                         to="/usuario/historial"
                                         color="inherit">Historial</Button>
                }
            </>
            }
            {isAsistente && <Button component={Link}
                                    to="/asistente/apuestas"
                                    color="inherit">Entrar Apuestas</Button>
            }
            {isAsistente && <Button component={Link}
                                    to="/asistente/apuestas/hoy/activas"
                                    color="inherit">Apuestas Activas</Button>
            }
            {isAsistente && <Button component={Link}
                                    to="/asistente/historial"
                                    color="inherit">Historial</Button>
            }

            {!isAdmin && <Button component={Link}
                                 to="/usuario/password/cambiar"
                                 color="inherit">Cambiar Contraseña</Button>
            }


        </>
    )
};