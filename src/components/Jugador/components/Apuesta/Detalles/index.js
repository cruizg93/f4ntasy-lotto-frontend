import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import ChicaTitle from '../../../../View/Chica';
import DiariaTitle from '../../../../View/Diaria';

import {Colors} from "../../../../../utils/__colors";
import {Currency} from '../../../../../utils/__currency';
import {FormatCurrency} from '../../../../../utils/__currency';
import {MainStyles} from '../../../../View/MainStyles';

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
        color: Colors.Black,
        marginRight: '.5rem',
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
        color: Colors.Btn_Red,
        fontWeight: "bold"
    },
    open: {        
        color: Colors.Green,
        fontWeight: "bold"
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
    headerLabelSorteo: {      
        borderBottom:"#afb6b8 1px solid",
    },      
    headerLabelSorteoHour:{
        borderBottom:"#afb6b8 1px solid",
        borderRight:"#afb6b8 1px solid",
    }

}));
const JugadorDetallesEntry = ({match: {url}, id, nombre, total, comision, riesgo, estado, username, moneda, type, day, hour, ...props}) => {
    const classes = useStyles();
    const apuestaCurrency = moneda==="LEMPIRAS"?Currency.Lempiras:Currency.Dollar;
    useEffect(() => {

    }, [])
    return (
        <>
         <Grid container spacing={0}
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
                style={MainStyles.boxContainer}
                >
            <Grid container>
                {type=== "DIARIA" ? <DiariaTitle />:<ChicaTitle />}    
                <Grid item xs={3} className={classes.headerLabelSorteoHour}>
                    <Typography variant="h6" gutterBottom className={"form__center-label"}>
                    {type=== "DIARIA" ?hour:"12 pm"}
                    </Typography>
                </Grid>
                <Grid item xs={5} className={classes.headerLabelSorteo}>
                    <Typography variant="h6" gutterBottom className={"form__center-label"}>
                        {day}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Ventas"}{'\u00A0'}
                </Typography>
            </Grid>
            <Grid item xs={8}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={total < 0 ? classes.textBalanceNegativo : 
                    (total !== 0 ? classes.textBalance : classes.textBalance)}
                >
                {apuestaCurrency.symbol}{'\u00A0'}{FormatCurrency(apuestaCurrency,total)}
                </Typography>
            </Grid>
            <Grid item xs={4}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Comision"}{'\u00A0'}
                </Typography>
            </Grid>
            <Grid item xs={8}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={comision < 0 ? classes.textBalanceNegativo : 
                    (comision !== 0 ? classes.textBalance : classes.textBalance)}
                    >
                    {apuestaCurrency.symbol}{'\u00A0'}{FormatCurrency(apuestaCurrency,comision.toFixed(2))}
                </Typography>
            </Grid>
            <Grid item xs={4}
                container
                justify="flex-end"
                >
                <Typography variant="body1" gutterBottom className={classes.textData}>
                    {"Total"}{'\u00A0'}
                </Typography>
            </Grid>
            <Grid item xs={8}
                container
                justify="flex-start"
                className={classes.text}
            >
                <Typography variant="body1" gutterBottom 
                    className={riesgo < 0 ? classes.textBalanceNegativo : 
                    (riesgo !== 0 ? classes.textBalance : classes.textBalance)}
                >
                    {apuestaCurrency.symbol}{'\u00A0'}{FormatCurrency(apuestaCurrency,riesgo.toFixed(2))}
                </Typography>
            </Grid>
            <Grid item xs={12}
                container
                justify="center"
                className={classes.statusLabel}
            >
                <Typography variant="h6"
                            className={estado === 'ABIERTA' ? classes.open : classes.close}>
                    {estado === 'ABIERTA' ? "Sorteo Abierto" : "Sorteo Cerrado" }
                </Typography>
            </Grid>
        </Grid>      
        </>
    )
};

export default JugadorDetallesEntry;