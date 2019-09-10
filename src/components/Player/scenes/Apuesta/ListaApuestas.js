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
        padding:"0px",
        maring:"0px",
    },
    apuesta:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"0px",
        marginTop:"1.25rem",
    },
    apuestaIndex:{
        minWidth:"1rem",
        color:"#999999",
        textAlign:"right",
        "& p":{
            fontSize:"0.75rem",
        }
    },
    apuestaValues:{
        width:"12.25rem",
        maxWidth:"12.25rem",
        marginLeft:"1rem",
        marginRight:"1rem",
        marginTop:"0",
        marginBottom:"0",
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
        fontSize:"1rem",
        color:"#999999"
    }

});


function ListaApuestas(props) {
    const classes = useStyles(); 
    const isIndexDisplay = props.displayApuestaListIndex === undefined?true:props.displayApuestaListIndex;   
    return (

            <List className={classes.apuestaList}>
                {props.entryList
                    .map((element, index) =>

                <ListItem key={index} className={classes.apuesta} alignItems="center">
                
                    <div style={{display:isIndexDisplay?"flex":"none"}}>
                        <ListItemText className={classes.apuestaIndex} primary={props.entryList.length-index}/>
                    </div>
                    <ListItemText className={classes.apuestaValues}  
                        primary={<Grid container>
                                    <Grid item xs={5} style={{textAlign:"end"}}>{element.numero}</Grid>
                                    <Grid item xs={2}>&mdash;</Grid>
                                    <Grid item xs={5} style={{textAlign:"start"}}>{element.current===undefined?element.valor:element.current}</Grid>
                                </Grid>
                                }  />
                    <ListItemIcon style={{minWidth:"auto"}}>
                        <FaTrashAlt className={classes.apuestaDeleteIcon} 
                                onClick={props.fromApuestaActiva
                                        ?() => props.removerApuesta(index)
                                        :() => props.removerApuesta(index, element.numero, element.current)}/>
                    </ListItemIcon>
                </ListItem>
                )}
            </List>
    )

}

export default ListaApuestas;