import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import {withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";

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
const DolarButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        margin: '.5rem',
        lineHeight: 1.5,
        backgroundColor: '#2fff21',
        borderColor: 'none',
        color: '#000',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const LempiraButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        margin: '.5rem',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffe634',
        borderColor: 'none',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const HistorialStatic = ({title, totalSemanal, comisionSemanal, netaSemanal, totalPremioSemanal, balanceSemanal, semana, ...props}) => {
    const classes = useStyles();

    useEffect(() => {

    }, []);
    return (
        <Grid container>
            <Grid item xs={12}
                  container
                  justify="center"
                  alignItems="center"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Resumen de todos los sorteos ya terminados, de todos los jugadores, y de la
                    {semana==='current' ? "SEMANA EN CURSO" : "SEMANA EN ANTERIOR"}

                </Typography>
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {title}
                </Typography>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                <Grid item xs={6}>
                    <DolarButton variant="outlined" color="primary" className={classes.button}
                                 onClick={props.clickDolar}
                    >
                        ver en $
                    </DolarButton>
                    <LempiraButton variant="outlined" color="primary" className={classes.button}
                                   onClick={props.clickLempira}
                    >
                        ver en L
                    </LempiraButton>
                </Grid>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-end"
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Total Apuestas |
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {totalSemanal}
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-end"
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Total Comisiones |
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {comisionSemanal}
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-end"
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Entrada Neta |
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {netaSemanal}
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-end"
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Total Premios |
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {totalPremioSemanal}
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-end"
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    Ganancia/Perdida |
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  className={classes.text}
            >
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {balanceSemanal}
                </Typography>
            </Grid>
        </Grid>

    )
};

export default HistorialStatic;