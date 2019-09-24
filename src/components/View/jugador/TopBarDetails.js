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
        top: "91px",
        backgroundColor: "#f4f4f4",
        zIndex: "25",
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        maxHeight: "52px !important",
        height: "52px",
        borderBottom: 'solid 1px lightgray',
        borderLeft: 'solid 1px #9A9A9A',
        borderRight: 'solid 1px #9A9A9A',
        left: '50%',
        transform: 'translateX(-50%)',
        borderTop: '2px solid #747474',
        maxWidth: 444
    },
    imageContainer: {
        "& img": {
            maxWidth: "75px",
            maxHeight: "100% !important",
        }
    },
    fechaContaier: {
        width: "100%",
        textAlign: "left",
    },
    innerText: {
        width: '80%',
        margin: '0 auto',
        " & p": {
            fontSize: '18px',
            color: '#929292',
            marginLeft: -14
        }
    },
    totalContaier: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "inherit",
        color: Colors.Jugador_Blue,
        "& p": {
            marginTop: "0px",
            marginBottom: "0px",
        },
    }
}));

function TopBar(props) {
    const apuestaIcon = props.apuestaType === "DIARIA" ? DiariaLogo : ChicaLogo;
    const hour = (props.apuestaType === "DIARIA" ? props.hour : "12 pm")
    const classes = TopBarStyles();
    const addTop = props.top ? props.top : 91;
    return (
        <Grid container
            display="flex"
            justify="center"
            alignItems="center"
            className={classes.barRow} style={{ top: addTop }}>
            <Grid item xs={3} className={classes.imageContainer}><img src={apuestaIcon} alt="apuestaLogo" /></Grid>
            <Grid item xs={8} className={classes.fechaContaier}>
                <Grid className={classes.innerText}>
                    <Typography >
                        {hour}{' - '}{props.day.toLowerCase()}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

}

TopBar.propTypes = {
    apuestaType: PropTypes.string.isRequired
}

export default TopBar;

