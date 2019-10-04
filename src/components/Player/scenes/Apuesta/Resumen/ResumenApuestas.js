import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';
import { Currency, FormatCurrency } from '../../../../../utils/__currency';
import { Colors } from '../../../../../utils/__colors';

const useStyles = makeStyles({
    apuestaList: {
        width: "100%",
    },
    resumenCompraContainer: {
        backgroundColor: "#f4f4f4",
        paddingTop: "0.65rem",
    },
    resumenCompraText: {
        textAlign: "left",
        color: "#999999",
        lineHeight: "0.85",
        paddingBottom: "0.65rem",
        fontSize: '1.1rem'
    },
    resumenCompraValue: {
        color: Colors.Jugador_Blue,
        lineHeight: "0.85",
        paddingBottom: "0.65rem",
        fontSize: '1.1rem'
    }
});

function ResumenApuestas(props) {
    const classes = useStyles();
    const paddingBottom = props.paddingBottom ? props.paddingBottom : 0;
    const marginL = props.marginL ? props.marginL : 0;
    console.log('here')
    return (
        <Grid container className={classes.resumenCompraContainer} style={{ paddingBottom: paddingBottom }}>
            <Grid item xs={3} style={{ marginLeft: marginL }}></Grid>
            <Grid item xs={3} style={{ margingBottom: "0.65rem" }}>
                <Typography variant="body1" className={classes.resumenCompraText} >
                    Costo:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency, props.costoTotal)}
                </Typography>
            </Grid>
            <Grid item xs={3} style={{ marginLeft: marginL }}></Grid>
            <Grid item xs={3}>
                <Typography variant="body1" className={classes.resumenCompraText}>
                    Comision:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency, props.comisionTotal)}
                </Typography>
            </Grid>
            <Grid item xs={3} style={{ marginLeft: marginL }}></Grid>
            <Grid item xs={3}>
                <Typography variant="body1" className={classes.resumenCompraText}>
                    Total:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" className={classes.resumenCompraValue}>
                    {props.apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(props.apuestaCurrency, props.total)}
                </Typography>
            </Grid>
        </Grid>
    )

}

export default ResumenApuestas;