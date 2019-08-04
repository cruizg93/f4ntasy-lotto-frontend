import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";

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
       
        color: Colors.Btn_Red
    },
    open: {        
        color: Colors.Green
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
            background: Colors.Gray_Ligth_2,
            color: Colors.Input_bkg,
        }   
    },
    headerLabelUser: {
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
    },
    headerLabelSorteo: {        
        borderBottom:"#afb6b8 1px solid",
    }       

}));
const JugadorDetallesEntry = ({match: {url}, id, nombre, total, comision, riesgo, estado, username, moneda, ...props}) => {
    const classes = useStyles();
    useEffect(() => {

    }, [])
    return (
        <>
         <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="flex-start"
                          component={Link}
                            to={
                                {
                                    pathname: `${url}/${id}`,
                                    state: {
                                        title: nombre,
                                        username: username,
                                        id: id,
                                        moneda: moneda,
                                    }
                                }
                            }
                          className={classes.boxContainerNuevo}
                          >
                        <Grid item xs={3} className={classes.headerLabelUser}>
                            <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                {username}
                            </Typography>
                        </Grid>      
                        <Grid item xs={9} className={classes.headerLabelSorteo}>
                            <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                {nombre}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}
                            container
                            justify="flex-end"
                            >
                            <Typography variant="body1" gutterBottom className={classes.textData}>
                                {"Apuestas "}{moneda=== "LEMPIRAS" ? " L " : " $ "} 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}
                            container
                            justify="flex-start"
                            className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom 
                                className={total < 0 ? classes.textBalanceNegativo : 
                                (total !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                            >
                               {" "}{total}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}
                            container
                            justify="flex-end"
                            >
                            <Typography variant="body1" gutterBottom className={classes.textData}>
                                {"Comisiones "}{moneda=== "LEMPIRAS" ? " L " : " $ "}
                            </Typography>
                        </Grid>
                        <Grid item xs={9}
                            container
                            justify="flex-start"
                            className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom 
                                className={comision < 0 ? classes.textBalanceNegativo : 
                                (comision !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                                >
                                {" "}{comision}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}
                            container
                            justify="flex-end"
                            >
                            <Typography variant="body1" gutterBottom className={classes.textData}>
                                {"Riesgo "} {moneda=== "LEMPIRAS" ? " L " : " $ "}
                            </Typography>
                        </Grid>
                        <Grid item xs={9}
                            container
                            justify="flex-start"
                            className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom 
                                className={riesgo < 0 ? classes.textBalanceNegativo : 
                                (riesgo !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                            >
                                {" "}{riesgo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}
                          container
                          justify="center"
                          className={classes.statusLabel}
                        >
                            <Typography variant="h5" gutterBottom
                                        className={estado === 'ABIERTA' ? classes.open : classes.close}>
                                {estado === 'ABIERTA' ? "Sorteo Abierto" : "Sorteo Cerrado" }
                            </Typography>

                        </Grid>
        </Grid>      
        </>
    )
};

export default JugadorDetallesEntry;