import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import ChicaTitle from './Chica';
import DiariaTitle from './Diaria';

import {Colors} from "../../../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontWeight: 'bold',       
    },
    textData:{
        color: Colors.Black
    },
    textBalancePositivo:{
        color: Colors.Green
    },
    textBalanceNegativo:{
        color: Colors.Btn_Red
    },
    statusLabel:{
        borderTop:"#afb6b8 1px solid",
    },
    textBalance:{
        color: Colors.Black
    },
    close: {
        fontWeight: 'bold',
        color: Colors.Btn_Red
    },
    open: {        
        color: Colors.Green,
        fontWeight: 'bold'
    },
    disableLink: {
        pointerEvents: 'none'
    },
    card: {
        display: 'flex',
        marginTop: '.5rem',
        background : Colors.Main,
        boxShadow: 'none',       
        borderRadius: '0'
    },
    boxContainerNuevo: {
        background : Colors.Main,
        marginTop: "1rem",
        textDecoration: "none",
        color: Colors.Btn_Blue,
        border:"#afb6b8 1px solid",
        "&:hover":{
            cursor: "pointer",
            /*background: Colors.Gray_Ligth_2,
            color: Colors.Input_bkg,*/
        }   
    },
    headerLabelApuestaChica: {
        background: "#009439",
        color: "#ebd700",
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
    },
    headerLabelApuestaDiaria: {
        background: "#ebd700",
        color: "#009439",
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
    },
    headerLabelSorteo: {      
        borderRight :"#afb6b8 1px solid", 
        borderBottom:"#afb6b8 1px solid",
        '& h6':{
            fontWeight: 'bold'
        }
    }       

}));
const JugadorDetallesEntry = ({match: {url}, id, nombre, total, comision, riesgo, estado, username, moneda, type, day, hour, ...props}) => {
    const classes = useStyles();
    useEffect(() => {

    }, [])
    return (
        <>
         <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
                component={total==0?'div':Link}
                to={
                    {
                        pathname: `${url}/${id}`,
                        state: {
                            title: nombre,
                            username: username,
                            id: id,
                            moneda: moneda,
                            type: type,
                            day: day,
                            hour: hour
                        }
                    }
                }
                className={classes.boxContainerNuevo}
                >
            {type=== "DIARIA" ? <DiariaTitle/>:<ChicaTitle/>}    
            <Grid item xs={3} className={classes.headerLabelSorteo}>
                <Typography variant="h6" gutterBottom className={"form__center-label"}>
                {type=== "DIARIA" ?hour:"12 pm"}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.headerLabelSorteo}>
                <Typography variant="h6" gutterBottom className={"form__center-label"}>
                    {day}
                </Typography>
            </Grid>
            <Grid item xs={3}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Apuestas "}
                </Typography>
            </Grid>
            <Grid item xs={9}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={total < 0 ? classes.textBalanceNegativo : 
                    (total !== 0 ? classes.textBalance : classes.textBalance)}
                >
                    {moneda=== "LEMPIRAS" ? " L " : " $ "} {total.toFixed(2)}
                </Typography>
            </Grid>
            <Grid item xs={3}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Comisiones "}
                </Typography>
            </Grid>
            <Grid item xs={9}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={comision < 0 ? classes.textBalanceNegativo : 
                    (comision !== 0 ? classes.textBalance : classes.textBalance)}
                    >
                    {moneda=== "LEMPIRAS" ? " L " : " $ "}{comision.toFixed(2)}
                </Typography>
            </Grid>
            <Grid item xs={3}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Riesgo "}
                </Typography>
            </Grid>
            <Grid item xs={9}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={riesgo < 0 ? classes.textBalanceNegativo : 
                    (riesgo !== 0 ? classes.textBalance : classes.textBalance)}
                >
                     {moneda=== "LEMPIRAS" ? " L " : " $ "} {riesgo.toFixed(2)}
                </Typography>
            </Grid>
            <Grid item xs={12}
                container
                justify="center"
                className={classes.statusLabel}
            >
                <Typography variant="h5"
                            className={estado === 'ABIERTA' ? classes.open : classes.close}>
                    {estado === 'ABIERTA' ? "Sorteo Abierto" : "Sorteo Cerrado" }
                </Typography>
            </Grid>
        </Grid>      
        </>
    )
};

export default JugadorDetallesEntry;