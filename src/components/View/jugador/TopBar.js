import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';
import { MainStyles } from '../../View/MainStyles';
import { Colors } from '../../../utils/__colors';
import { FormatCurrency } from '../../../utils/__currency';

import DiariaLogo from './../assets/Diaria_PNG.png';
import ChicaLogo from './../assets/Chica_PNG.png';


const TopBarStyles = makeStyles(theme => ({
    barColumn: {
        float: "left",
        width: "33.33%",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "transparent",
        paddingBottom: ".5rem",
        fontSize: "14pt",

    },
    barRow: {
        position: "fixed",
        display: "flex",
        width: "100%",
        /*top: "3.5rem",*/
        backgroundColor: "#f4f4f4",
        zIndex: "25",
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        maxHeight: "48px !important",
        height: "2rem"
    },
    imageContainer: {
        "& img": {
            maxWidth: "75px",
            maxHeight: "100% !important",
        }
    },
    fechaContaier: {
        width: "100%",
        textAlign: "center",
    },
    totalContaier: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "inherit",
        "& p": {
            marginTop: "0px",
            marginBottom: "0px",
        },
        " & #valorTotal": {
            color: Colors.Jugador_Blue
        }
    }
}));

function TopBar(props) {
    const apuestaIcon = props.apuestaType === "DIARIA" ? DiariaLogo : ChicaLogo;
    const fecha = (props.apuestaType === "DIARIA" ? props.hour + " - " : "") + props.day;
    const classes = TopBarStyles();
    return (
        <Grid container
            display="flex"
            justify="center"
            alignItems="center"
            className={classes.barRow}>
            <Grid item xs={3} className={classes.imageContainer}><img src={apuestaIcon} alt="apuestaLogo" /></Grid>
            <Grid item xs={5} className={classes.fechaContaier}>
                <Typography variant="body1" >
                    {fecha}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" className={classes.totalContaier}>
                    <p id="valorTotal">{props.apuestaCurrency.symbol}{FormatCurrency(props.apuestaCurrency, props.total)}</p>
                </Typography>
            </Grid>
        </Grid>
    );

}

TopBar.propTypes = {
    apuestaType: PropTypes.string.isRequired
}

export default TopBar;

