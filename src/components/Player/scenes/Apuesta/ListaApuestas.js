import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EntrarNumero from '../../components/EntrarNumero';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { FaTrashAlt } from "react-icons/fa";
import {makeStyles} from "@material-ui/core/styles/index";
import {Circle} from 'react-shapes';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
    apuestaList:{
        width:"100%",
    },
    apuesta:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    apuestaIndex:{
        color:"#999999",
        marginRight:"0.375rem",
        textAlign:"right",
        "& p":{
            fontSize:"0.75rem",
        }
    },
    apuestaValues:{
        border:"1px solid #cccccc",
        borderRadius:"17px",
        padding:"0.25rem",
        textAlign:"center",
        "& span":{
            color:"#999999",
            fontSize:"1.25rem",
        }
    },
    apuestaDeleteIcon:{
        fontSize:"0.875rem",
        marginLeft:"0.375rem",
        color:"#999999"
    }

});


function ListaApuestas(props) {
    const classes = useStyles(); 
    const isIndexDisplay = props.displayApuestaListIndex === undefined?true:props.displayApuestaListIndex;   
    return (

            <List className={classes.apuestaList}>
                {props.entryList
                    .filter(apuesta => parseInt(apuesta.current) > 0)
                    .map((element, index) =>

                    <ListItem key={index} className={classes.apuesta} alignItems="center">
                        <Grid container display="flex" alignItems="center">
                            <Grid item xs={2} style={{display:!isIndexDisplay?"flex":"none"}}></Grid>
                            <Grid item xs={2} style={{display:isIndexDisplay?"flex":"none"}}>
                                <ListItemText className={classes.apuestaIndex} secondary={props.entryList.length-index}/>
                            </Grid>
                            <Grid item xs={8}>
                                <ListItemText className={classes.apuestaValues}  primary={element.numero +" - "+element.current}  />
                            </Grid>
                            <Grid item xs={2}>
                            <ListItemIcon >
                                <FaTrashAlt className={classes.apuestaDeleteIcon} onClick={() => props.removerApuesta(element.numero, element.current)}/>
                            </ListItemIcon>
                            </Grid>
                        </Grid>
                    </ListItem>
                )}
            </List>
    )

}

export default ListaApuestas;