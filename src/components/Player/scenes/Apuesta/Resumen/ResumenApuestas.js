import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';
import {Currency, FormatCurrency} from '../../../../../utils/__currency';
import {Colors} from '../../../../../utils/__colors';

const useStyles = makeStyles({
    apuestaList:{
        width:"100%",
    },
    resumenCompraContainer:{
        backgroundColor:Colors.Main,
    },
    resumenCompraText:{
        textAlign:"left",
        color:"#999999",
    },
    resumenCompraValue:{
        color: Colors.Jugador_Blue,
    }
});

function ResumenApuestas(props) {
    const classes = useStyles(); 

    return (
        <Grid container className={classes.resumenCompraContainer}>
            <Grid itme xs={2}></Grid>
            <Grid item xs={4} className={classes.resumenCompraText}>
                <Typography variant="body1" gutterBottom >
                    Costo:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" gutterBottom className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency,props.costoTotal)}
                </Typography>
            </Grid>
            <Grid itme xs={2}></Grid>
            <Grid item xs={4}>
                <Typography variant="body1" gutterBottom className={classes.resumenCompraText}>
                    Comision:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" gutterBottom className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency,props.comisionTotal)}
                </Typography>
            </Grid>
            <Grid itme xs={2}></Grid>
            <Grid item xs={4}>
                <Typography variant="body1" gutterBottom className={classes.resumenCompraText}>
                    Total:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" gutterBottom className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency,props.total)}
                </Typography>
            </Grid>
        </Grid>
    )

}

export default ResumenApuestas;