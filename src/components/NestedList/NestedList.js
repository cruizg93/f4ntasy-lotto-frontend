import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Style from '@material-ui/icons/Style';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Create from '@material-ui/icons/Create';
import History from '@material-ui/icons/History';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

import Historial from './Historial';
import Sistema from './Sistema';
// import {history} from "../../_helpers/history";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    fixed: {
        position: 'relative !important',
    }
}));

const NestedList = ({ ...props }) => {
    const classes = useStyles();
    const isAdmin = props.admin;
    const isAsistente = !props.admin && props.asistente;
    const hiddenHeader = (props.firstConnection === true) && ((props.role === 'Player') || (props.role === 'Asistente'))

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" className={classes.fixed} id="nested-list-subheader">
                    Opciones
                </ListSubheader>
            }
            className={classes.root}
        >
            {isAdmin &&
                <ListItem button component={Link} to={'/jugadores'} onClick={props.click}>
                    <ListItemIcon>
                        <SupervisedUserCircle />
                    </ListItemIcon>
                    <ListItemText primary="Vendedores" />
                </ListItem>
            }

            {isAdmin &&
                <ListItem button component={Link} to="/apuestas/activas" onClick={props.click}>
                    <ListItemIcon>
                        <Style />
                    </ListItemIcon>
                    <ListItemText primary="Ventas Activas" />
                </ListItem>
            }

            {isAdmin && <Sistema classes={classes.nested} click={props.click} />}
            {isAdmin && <Historial classes={classes.nested} click={props.click} />}

            {(!isAdmin && !isAsistente && !hiddenHeader) &&
                <ListItem button component={Link} to={'/usuario/apuestas'} onClick={props.click}>
                    <ListItemIcon>
                        <ArrowRightAlt />
                    </ListItemIcon>
                    <ListItemText primary="Sorteos" />
                </ListItem>
            }
            {(!isAdmin && !isAsistente && !hiddenHeader) &&
                <ListItem button component={Link} to={'/usuario/historial'} onClick={props.click}>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText primary="Historial" />
                </ListItem>
            }

            {isAsistente && !hiddenHeader &&
                <ListItem button component={Link} to={'/asistente/apuestas'} onClick={props.click}>
                    <ListItemIcon>
                        <ArrowRightAlt />
                    </ListItemIcon>
                    <ListItemText primary="Sorteos" />
                </ListItem>
            }
            {/* {isAsistente &&
                <ListItem button component={Link} to={'/asistente/historial'} onClick={props.click}>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText primary="Historial" />
                </ListItem>
            } */}
            {!isAdmin &&
                <ListItem button component={Link} to="/usuario/password/cambiar"
                    onClick={props.click}>
                    <ListItemIcon>
                        <Create />
                    </ListItemIcon>
                    <ListItemText primary="Cambiar Contraseña" />
                </ListItem>
            }

            <ListItem button onClick={props.logout}>
                <ListItemIcon>
                    <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText primary="Salir" />
            </ListItem>
        </List>
    );
}

const mapStateToProps = ({ user }) => {
    const { role, firstConnection } = user;
    return { role, firstConnection }
};

export default connect(mapStateToProps)(NestedList);