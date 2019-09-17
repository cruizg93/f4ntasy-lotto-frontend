import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Person from '@material-ui/icons/Person';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

//private Long id;
//     private String nombre;
//     private String moneda;
//     private double balance;

const NumerosActivosUserEntry = ({id, nombre, moneda, balance, ...props}) => {
    const classes = useStyles();

    return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Person/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${nombre}`} secondary={`${balance}`}/>
            </ListItem>


    );
}

export default NumerosActivosUserEntry;