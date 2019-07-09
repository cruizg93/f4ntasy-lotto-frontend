import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";

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
        fontWeight: 'bold'
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));
const ApuestaActivaRiesgoEntry = ({numero, dineroApostado, posibleRiesgo, totalRiesgo, moneda, total, ...props}) => {
    const classes = useStyles();

    useEffect(() => {

    }, []);
    return (
        <Grid item xs={12}
              container
              justify="center"

        >
            <Typography variant="body1" gutterBottom className={classes.text}>
                # {numero} - {moneda === "dolar" ? "$" : "L"} {dineroApostado} = {moneda === "dolar" ? "$" : "L"}
                {totalRiesgo} @ {(totalRiesgo/total).toFixed(2)}
            </Typography>

        </Grid>

    )
};

export default ApuestaActivaRiesgoEntry;