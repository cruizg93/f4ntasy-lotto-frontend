import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuLinks = ({ ...props }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const isAdmin = props.admin;
  
    const isMaster = props.master;
    const isSupervisor = props.supervisor;
    const isPlayer = !props.admin && props.player;
  
    const isAsistente = (!props.admin && props.asistente);
    const hiddenHeader = (props.firstConnection === true) && ((props.role === 'Player') || (props.role === 'Asistente'))

    function handleClickHistorial(event) {
        setAnchorE2(event.currentTarget);
    }

    function handleCloseHistorial() {
        setAnchorE2(null);
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            {isAdmin && <Button component={Link} to="/jugadores" color="inherit">Vendedores</Button>}
            {isAdmin && <Button component={Link} to="/apuestas/activas" color="inherit">Ventas Activas</Button>}

            {isAdmin && !isSupervisor && 
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
                    <MenuItem onClick={handleClose} component={Link} to="/usuario/nuevo">Crear Vendedores</MenuItem>
                    <MenuItem onClick={handleClose}
                        component={Link}
                        to={"/sistema/cambio"}
                    >
                        Tipo de Cambio</MenuItem>
                    <MenuItem onClick={handleClose}
                        component={Link}
                        to="/sistema/password/update"
                    >Contraseñas</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/sistema/topes">Fijar Topes</MenuItem>
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
                    aria-controls="historial-menu"
                    aria-haspopup="true"
                    onClick={handleClickHistorial}>
                    Historial
            </Button>
            }

            {isAdmin &&
                <Menu
                    id="historial-menu"
                    anchorEl={anchorE2}
                    keepMounted
                    open={Boolean(anchorE2)}
                    onClose={handleCloseHistorial}
                >
                    <MenuItem onClick={handleClose} component={Link}
                        to="/historial/semana/anterior">
                        Sorteos Pasados
                </MenuItem>
                    <MenuItem onClick={handleClose} component={Link}
                        to="/historial/numeros/ganadores">
                        Números Ganadores
                </MenuItem>
                    <MenuItem onClick={handleClose} component={Link}
                        to="/historial/balance">
                        Perdidas y Ganancias
                </MenuItem>
                </Menu>
            }


            {!isAdmin && <>
                {!isAsistente && !hiddenHeader && <Button component={Link}
                    to="/usuario/apuestas"
                    color="inherit">Sorteos</Button>
                }
                {!isAsistente && !hiddenHeader && <Button component={Link}
                    to="/usuario/historial"
                    color="inherit">Historial</Button>
                }
            </>
            }
            {isAsistente && !hiddenHeader && <Button component={Link}
                to="/asistente/apuestas"
                color="inherit">Sorteos</Button>
            }
            {/* {isAsistente && <Button component={Link}
                to="/asistente/historial"
                color="inherit">Historial</Button>
            } */}

            {!isAdmin && <Button component={Link}
                to="/usuario/password/cambiar"
                color="inherit">Cambiar Contraseña</Button>
            }


        </>
    )
};

const mapStateToProps = ({ user }) => {
    const { role, firstConnection } = user;
    return { role, firstConnection }
};

export default connect(mapStateToProps)(MenuLinks);