import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';
import { MainStyles } from '../MainStyles';
import { Colors } from '../../../utils/__colors';
import { FormatNumberSymbol } from '../../../utils/__currency';

import DiariaLogo from './../assets/Diaria_PNG.png';
import ChicaLogo from './../assets/Chica_PNG.png';
import { height } from '@material-ui/system';

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
        borderTop: MainStyles.borderValue,
        borderBottom: MainStyles.borderValue,
        position: "static",
        display: "flex",
        width: "100%",
        top: "3.5rem",
        backgroundColor: Colors.Main,
        zIndex: "25",
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        maxHeight: "48px !important",
        height: "3rem"
    },
    imageContainer: {
        display: "inherit",
        justify: "inherit",
        alignItems: "inherit",
        "& img": {
            width: "100%",
            display: "inherit",
            justify: "inherit",
            alignItems: "inherit",
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
            color: Colors.Btn_Blue_Dark
        }
    }
}));

function TopBar(props) {
    const apuestaIcon = props.apuestaType === "DIARIA" ? DiariaLogo : ChicaLogo;
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
                    {props.fecha}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1" className={classes.totalContaier}>
                </Typography>
            </Grid>
        </Grid>
    );

}

TopBar.propTypes = {
    apuestaType: PropTypes.string.isRequired
}

export default TopBar;

