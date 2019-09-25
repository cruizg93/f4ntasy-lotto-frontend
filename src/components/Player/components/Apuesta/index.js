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

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",

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
    textLabel: {
        display: 'flex',
        margin: '.5rem'
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    typeContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: "1rem 10px 10px .5rem",
        borderRight: "#afb6b8 1px solid",
    },
    titleContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: "1rem 0 10px .5rem",
    },
    textValueLabel: {
        display: 'flex',
        marginLeft: '.5rem',
        fontWeight: 'bold',
    },
    sorteoTextContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: ".5rem",
        fontWeight: 'bold'
    },
    textSorteoAbierto: {
        color: Colors.Green,
    },

}));

// const ApuestaData = ({ match: { url }, id, nombre, total, comision, riesgo, estado, moneda, ...props }) => {
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

        console.log("props", this.props)
        return (
            <>
                <Grid container spacing={0} className="container_jugadorDetailesEntry"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={4} className="logo_icon"
                        component={this.props.apuesta.total === 0 ? 'div' : Link}
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
                        <Grid item justify="flex-start" className="headerLabelSorteoHour">
                            <span className="time">{this.props.apuesta.type === "DIARIA" ? hour : "12 pm"}{'\u00A0'}-{'\u00A0'}{'\u00A0'}</span>
                            {/* <span className="line">{'\u00A0'}-{'\u00A0'}{'\u00A0'}</span> */}
                            <span className="day">{day}</span>
                        </Grid>
                        <Grid container className="valuesContainer">
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
                                <Typography variant="body1" style={{ marginLeft: 7 }} >
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