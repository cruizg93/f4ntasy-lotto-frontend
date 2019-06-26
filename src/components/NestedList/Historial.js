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
                    <ListItem button className={props.classes}>
                        <ListItemIcon>
                            <AccessTime/>
                        </ListItemIcon>
                        <ListItemText primary="Semana en Curso"/>
                    </ListItem>
                     <ListItem button className={props.classes}>
                        <ListItemIcon>
                            <SettingsBackupRestore/>
                        </ListItemIcon>
                        <ListItemText primary="Semana Pasada"/>
                    </ListItem>
                     <ListItem button className={props.classes}>
                        <ListItemIcon>
                            <LocalPlay/>
                        </ListItemIcon>
                        <ListItemText primary="Números Ganadores"/>
                    </ListItem>
                    <ListItem button className={props.classes}>
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









