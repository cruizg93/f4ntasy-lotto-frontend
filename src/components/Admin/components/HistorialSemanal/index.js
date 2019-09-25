import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

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
const HistorialSemanaActualUserEntry = ({ id, nombre, balance, moneda, type, ...props }) => {
    const classes = useStyles();

    useEffect(() => {

    }, []);
    return (
        <Grid container>
            <Grid item xs={5} component={Link}
                to={
                    {
                        pathname: `/historial/semana/actual/usuario/${id}`,
                        state: {
                            id: id,
                            username: nombre,
                            moneda: type,
                            semana: 'current'
                        }
                    }
                }
            >
                <Typography variant="body1" className={classes.text}>
                    # {nombre} - {moneda === "dolar" ? "$" : "L"}
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="body1" className={classes.text}>
                    {type === "dolar" ? "$" : "L"}
                </Typography>
                <Typography variant="body1" className={classes.text}>
                    {balance}
                </Typography>
            </Grid>
        </Grid>

    )
};

export default HistorialSemanaActualUserEntry;