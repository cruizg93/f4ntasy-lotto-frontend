import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import History from '@material-ui/icons/History';
import AccessTime from '@material-ui/icons/AccessTime';
import LocalPlay from '@material-ui/icons/LocalPlay';
import BarChart from '@material-ui/icons/BarChart';

import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import {Link} from "react-router-dom";

export default function Historial(props) {
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open);
    }

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <History/>
                </ListItemIcon>
                <ListItemText primary="Historial"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={props.classes} component={Link} to="/historial/semana/actual"
                              onClick={props.click}>
                        <ListItemIcon>
                            <AccessTime/>
                        </ListItemIcon>
                        <ListItemText primary="Semana en Curso"/>
                    </ListItem>

                    <ListItem button className={props.classes}
                              component={Link} to="/historial/semana/anterior"
                              onClick={props.click}

                    >
                        <ListItemIcon>
                            <SettingsBackupRestore/>
                        </ListItemIcon>
                        <ListItemText primary="Semana Pasada"/>
                    </ListItem>
                    <ListItem button className={props.classes}
                              onClick={props.click}>
                        <ListItemIcon>
                            <LocalPlay/>
                        </ListItemIcon>
                        <ListItemText primary="Números Ganadores"/>
                    </ListItem>
                    <ListItem button className={props.classes}
                              onClick={props.click}>
                        <ListItemIcon>
                            <BarChart/>
                        </ListItemIcon>
                        <ListItemText primary="Perdidas y Ganancias"/>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}









