import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";
import { Colors } from "../../../../utils/__colors";

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
            context: ''
        }
    }
    render() {
        const apuestaCurrency = (this.props.apuesta.moneda === "LEMPIRAS" || this.props.apuesta.moneda === "L") ? Currency.Lempiras : Currency.Dollar;
        let hour = this.props.apuesta.hour
        let day = this.props.apuesta.day.toLowerCase()
        const moneySymbol = this.props.apuesta.moneda.toLowerCase() === 'dolar' ? '$' : 'L';

        return (
            <>
                <Grid container spacing={0} className="container_jugadorDetailesEntry"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={4} className="logo_icon"
                        component={Link}
                        to={
                            {
                                pathname: `/usuario/apuestas/${this.props.apuesta.id}`,
                                state: {
                                    moneda: moneySymbol,
                                }
                            }
                        }
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
                            <Grid item xs={7} className="total_amount"
                                component={this.props.apuesta.total === 0 ? 'div' : Link}
                                to={
                                    {
                                        pathname: `/usuario/apuestas/hoy/activas/${this.props.apuesta.id}`,
                                        state: {
                                        }
                                    }
                                }
                            >
                                <Typography style={{ marginLeft: 7, fontSize: '1.05rem' }} >
                                    {moneySymbol}{'\u00A0'}{FormatCurrencySymbol(moneySymbol, this.props.apuesta.total.toFixed(2))}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )
    }
};

export default ApuestaData;