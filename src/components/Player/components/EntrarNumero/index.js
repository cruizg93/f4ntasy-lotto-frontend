import React, {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { FaTrashAlt } from "react-icons/fa";
import {makeStyles} from "@material-ui/core/styles/index";
import {Circle} from 'react-shapes';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    },
    apuesta:{
        backgroundColor:"green"
    }

});


const EntrarNumero = (props) => {
    const classes = useStyles();
    return (
        <div>
            ELIMINAR, no necesario
        </div>   

    )
};

export default EntrarNumero;