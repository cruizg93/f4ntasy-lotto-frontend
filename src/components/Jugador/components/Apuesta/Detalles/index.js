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
import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';

import './styles.css';

// const JugadorDetallesEntry = ({ match: { url }, id, nombre, total, comision, riesgo, estado, username, moneda, type, day, hour, ...props }) => {
class JugadorDetallesEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            redOpen: false,
            icon: '',
            title: '',
            context: ''
        }
    }
    handleClickOpen() {
        let icon = '', title = '', context = ''
        if (this.props.estado === 'ABIERTA') {  //open
            icon = 'help'
            title = 'Bloquear?'
            context = 'Si bloquea este sorteo ningún vendedor podrá accesarlo para hacer mas compras.'
        } else if (this.props.estado === 'BLOQUEADA') { //block
            icon = 'help'
            title = 'Desbloquear?'
            context = 'Si desbloquea este sorteo todos los vendedores tendrán acceso a el.'
        } else if (this.props.estado === 'BLOQUEADA') { //block
        }
        this.setState({
            ...this.state,
            open: true,
            title: title,
            context: context,
            icon: icon
        })

    }

    handleClose(value) {
        this.setState({
            ...this.state,
            open: false,
            redOpen: false
        })
        if (value === true) {

        }
    }
    render() {
        const apuestaCurrency = (this.props.moneda === "LEMPIRAS" || this.props.moneda === "L") ? Currency.Lempiras : Currency.Dollar;
        return (
            <>
                <Grid container spacing={0} className="container_jugadorDetailesEntry"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={4} className="logo_icon">
                        {this.props.type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
                    </Grid>
                    <Grid container item xs={8} direction="column">
                        <Grid item justify="flex-start" className="headerLabelSorteoHour">
                            <span className="time">{this.props.type === "DIARIA" ? this.props.hour : "12 pm"}</span>
                            <span className="line">{'\u00A0'}-{'\u00A0'}</span>
                            <span className="day">{this.props.day}</span>
                        </Grid>
                        <Grid container className="valuesContainer">
                            <Grid item xs={2} className="img_open_close" onClick={() => this.handleClickOpen()}>
                                {
                                    this.props.estado === 'ABIERTA' ? <
                                        img src={imgGreen} alt="ABIERTA" />
                                        : this.props.estado === 'CERRADA' ?
                                            <img src={imgRed} alt="Cerrado" />
                                            : <img src={imgPurple} alt="BLOQUEADA " />
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <Typography className="textData">
                                    {"Total:"}{'\u00A0'}
                                </Typography>
                            </Grid>
                            <Grid item xs={7} className="total_amount"
                                component={this.props.total === 0 ? 'div' : Link}
                                to={
                                    {
                                        pathname: `${this.props.match.url}/${this.props.id}`,
                                        state: {
                                            title: this.props.nombre,
                                            username: this.props.username,
                                            name: this.props.name,
                                            id: this.props.id,
                                            moneda: this.props.moneda,
                                            type: this.props.type,
                                            day: this.props.day,
                                            hour: this.props.hour
                                        }
                                    }
                                }
                            >
                                <Typography variant="body1" >
                                    {apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, this.props.riesgo.toFixed(2))}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <ConfirmDialog
                        open={this.state.open}
                        handleClose={this.handleClose.bind(this)}
                        title={this.state.title}
                        context={this.state.context}
                        icon={this.state.icon}>
                    </ConfirmDialog>
                </Grid>
            </>
        )
    }
};

export default JugadorDetallesEntry;