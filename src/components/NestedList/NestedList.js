import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Style from '@material-ui/icons/Style';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

import Historial from './Historial';
import Sistema from './Sistema';
import {authenticationService} from "../../service/api/authentication/authentication.service";
import {history} from "../../_helpers/history";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    fixed:{
        position: 'relative !important',
    }
}));

export default function NestedList() {
    const classes = useStyles();
    const logout =() => {
        authenticationService.logout();
        history.push('/login');
    };
    //  const logout = () => {
    //     sessionStorage.setItem('userData', '');
    //     sessionStorage.clear();
    //     window.location.reload();
    // };

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
            <ListItem button component={Link} to={'/jugadores'}>
                <ListItemIcon>
                    <SupervisedUserCircle/>
                </ListItemIcon>
                <ListItemText primary="Jugadores"/>
            </ListItem>
            <ListItem button component={Link} to="/apuestas">
                <ListItemIcon>
                    <Style/>
                </ListItemIcon>
                <ListItemText primary="Apuestas Activas" />
            </ListItem>
            <Sistema classes={classes.nested}/>
            <Historial classes={classes.nested}/>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <SupervisedUserCircle/>
                </ListItemIcon>
                <ListItemText primary="Salir"/>
            </ListItem>
        </List>
    );
}