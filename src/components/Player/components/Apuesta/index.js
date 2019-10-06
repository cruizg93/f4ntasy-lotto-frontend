import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import InformationDialog from '../../../View/Dialog/InformationDialog';
import { Currency } from '../../../../utils/__currency';
import { FormatCurrencySymbol } from '../../../../utils/__currency';
import DiariaLogo from '../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../View/assets/Chica_PNG.png';
import imgRed from '../../../View/assets/RED_PNG.png';
import imgPurple from '../../../View/assets/Purple_PNG.png';
import imgGreen from '../../../View/assets/Green_PNG.png';

class ApuestaData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            icon: '',
            title: '',
            context: '',
            openRed: false,
            openPurple: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickValue = this.handleClickValue.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        if (this.props.apuesta.estado === 'CERRADA') {
            this.setState({
                ...this.state,
                openRed: true,
            })
        } else if (this.props.apuesta.estado === 'BLOQUEADA') {
            this.setState({
                ...this.state,
                openPurple: true,
            })
        }
    }

    handleClickValue() {
        if (this.props.apuesta.total !== 0) {
            this.setState({
                ...this.state,
                openRed: true
            })
        }
    }

    handleClose() {
        this.setState({
            ...this.state,
            openRed: false,
            openPurple: false,
            openRedValue: false
        })
    }

    render() {
        const apuestaCurrency = (this.props.apuesta.moneda === "LEMPIRA" || this.props.apuesta.moneda === "L") ? Currency.Lempira : Currency.Dollar;
        let hour = this.props.apuesta.hour
        let day = this.props.apuesta.day.toLowerCase()
        const moneySymbol = this.props.apuesta.moneda.toLowerCase() === 'dolar' ? '$' : 'L';
        const cursor = this.props.apuesta.total !== 0 ? 'pointer' : 'auto'

        return (
            <>
                <Grid container spacing={0} className="container_jugadorDetailesEntry"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={4} className="logo_icon"
                        component={Link}
                        component={this.props.apuesta.estado === 'ABIERTA' ? Link : 'div'}
                        to={
                            {
                                pathname: `/usuario/apuestas/${this.props.apuesta.id}`,
                                state: {
                                    moneda: moneySymbol,
                                }
                            }
                        }
                        onClick={this.handleClick.bind(this)}
                    >
                        {this.props.apuesta.type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
                    </Grid>
                    <Grid container item xs={8} direction="column">
                        <Grid item className="headerLabelSorteoHour">
                            <span className="time">{this.props.apuesta.type === "DIARIA" ? hour : "12 pm"}{'\u00A0'}-{'\u00A0'}{'\u00A0'}</span>
                            <span className="day">{day}</span>
                        </Grid>
                        <Grid container className="valuesContainer" style={{ paddingLeft: 6 }}>
                            <Grid item xs={2} className="img_open_close">
                                {
                                    this.props.apuesta.estado === 'ABIERTA' ? <
                                        img src={imgGreen} alt="ABIERTA" />
                                        : this.props.apuesta.estado === 'CERRADA' ?
                                            <img src={imgRed} alt="Cerrado" />
                                            : <img src={imgPurple} alt="BLOQUEADA " />
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <Typography className="textData">
                                    {"Total:"}{'\u00A0'}
                                </Typography>
                            </Grid>
                            <Grid item xs={7} className="total_amount" style={{ cursor: cursor }}
                                component={(this.props.apuesta.total === 0 || this.props.apuesta.estado === 'CERRADA') ? 'div' : Link}
                                to={
                                    {
                                        pathname: `/usuario/apuestas/hoy/activas/${this.props.apuesta.id}`,
                                        state: {
                                            moneda: moneySymbol,
                                        }
                                    }
                                }
                                onClick={this.handleClickValue.bind(this)}
                            >
                                <Typography style={{ marginLeft: 7, fontSize: '1.1rem' }} >
                                    {moneySymbol}{'\u00A0'}{FormatCurrencySymbol(moneySymbol, this.props.apuesta.total.toFixed(2))}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <InformationDialog
                    open={this.state.openRed}
                    handleClose={this.handleClose.bind(this)}
                    title="Sorteo cerrado."
                    context="No se aceptan mas compras para este sorteo."
                    contentFontSize={'17px'}
                    contentHeight={'70px'}
                    icon='faLock'>
                </InformationDialog>
                <InformationDialog
                    open={this.state.openPurple}
                    handleClose={this.handleClose.bind(this)}
                    title="Sorteo bloqueado."
                    context="Temporalmente no se aceptan mas compras para este sorteo, contacte a su agente para mas información."
                    contentFontSize={'16px'}
                    contentHeight={'100px'}
                    icon='faBan'>
                </InformationDialog>
            </>
        )
    }
};

export default ApuestaData;