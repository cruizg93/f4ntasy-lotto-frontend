import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListAlt from '@material-ui/icons/ListAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Casino from '@material-ui/icons/Casino';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Create from '@material-ui/icons/Create';
import Publish from '@material-ui/icons/Publish';


import { Link } from "react-router-dom";


export default function Sistema(props) {
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open);
    }

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <ListAlt />
                </ListItemIcon>
                <ListItemText primary="Sistema" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={props.classes} component={Link} to="/usuario/nuevo"
                        onClick={props.click}>
                        <ListItemIcon>
                            <GroupAdd />
                        </ListItemIcon>
                        <ListItemText primary="Crear Jugador" />
                    </ListItem>
                    <ListItem button className={props.classes} component={Link} to="/sistema/cambio"
                        onClick={props.click}>
                        <ListItemIcon>
                            <CompareArrows />
                        </ListItemIcon>
                        <ListItemText primary="Tipo de Cambio" />
                    </ListItem>
                    <ListItem button className={props.classes} component={Link} to="/sistema/password/update"
                        onClick={props.click}>
                        <ListItemIcon>
                            <Create />
                        </ListItemIcon>
                        <ListItemText primary="Contraseñas" />
                    </ListItem>
                    <ListItem button className={props.classes} component={Link} to="/sistema/topes"
                        onClick={props.click}>
                        <ListItemIcon>
                            <Publish />
                        </ListItemIcon>
                        <ListItemText primary="Fijar Topes" />
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}















