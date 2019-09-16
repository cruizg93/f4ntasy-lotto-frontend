import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import ChicaTitle from '../Logo/Chica';
import DiariaTitle from '../Logo/Diaria';

import { Colors } from "../../../../../utils/__colors";
import { Currency } from '../../../../../utils/__currency';
import { FormatCurrency } from '../../../../../utils/__currency';
import { MainStyles } from '../../../../View/MainStyles';

import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import imgRed from '../../../../View/assets/RED_PNG.png';
import imgPurple from '../../../../View/assets/Purple_PNG.png';
import imgGreen from '../../../../View/assets/Green_PNG.png';

import './styles.css';

const JugadorDetallesEntry = ({ match: { url }, id, nombre, total, comision, riesgo, estado, username, moneda, type, day, hour, ...props }) => {
    console.log("riesgo", riesgo)
    const apuestaCurrency = (moneda === "LEMPIRAS" || moneda === "L") ? Currency.Lempiras : Currency.Dollar;
    useEffect(() => {
    }, [])
    return (
        <>
            <Grid container spacing={0}
                direction="row"
                justify="center"
                component={total === 0 ? 'div' : Link}
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
            >
                <Grid item className="logo_icon">
                    {type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
                </Grid>
                <Grid item >
                    <Grid container direction="column">
                        <Grid container>
                            <Grid item xs={3} className="headerLabelSorteoHour">
                                <Typography variant="h6" className="form__center-label">
                                    {type === "DIARIA" ? hour : "12 pm"}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} className="headerLabelSorteo">
                                <Typography variant="h6" gutterBottom className="form__center-label">
                                    {day}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className="valuesContainer">
                            <Grid item xs={2} className="img_open_close">
                                {estado === 'ABIERTA' ? <img src={imgRed} alt="ABIERTA" /> : <img src={imgGreen} alt="Cerrado" />}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className="textData">
                                    {"Total"}{'\u00A0'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className="text">
                                <Typography variant="body1" >
                                    {apuestaCurrency.symbol}{'\u00A0'}{FormatCurrency(apuestaCurrency, riesgo.toFixed(2))}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default JugadorDetallesEntry;