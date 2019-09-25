import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, List } from '@material-ui/core';
import { LocalPrintshop } from "@material-ui/icons";
import Fab from '@material-ui/core/Fab';
import { FaFileExcel } from "react-icons/fa";
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ApuestaActivaEntry from '../../../../../Player/components/ApuestaActiva/index';
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Clear from '@material-ui/icons/Clear';
import { adminService } from "../../../../../../service/api/admin/admin.service";
import { printDocument6 } from "../../../../../../_helpers/print";
import { Colors } from "../../../../../../utils/__colors";

import AdminTitle from '../../../../../Admin/components/AdminTitle';
import DiariaLogo from '../../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../../View/assets/Chica_PNG.png';
import RowList from '../../../../../View/RowList'

import './styles.css'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        width: '60px',
        border: '1px #d2d2d2 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
    },
    numbers: {
        paddingLeft: '.5rem'
    },
    apuestasContainer: {
        marginBottom: '5rem'
    },
    fixedElement: {
        position: 'fixed',
        width: '100%',
        height: '67px',
        lineHeight: '67px',
        bottom: '6px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        borderLeft: 'solid 1px #9A9A9A',
        borderRight: 'solid 1px #9A9A9A',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    textBalancePositivo: {
        color: Colors.Green,
        marginLeft: ".5rem"
    },
    textBalanceNegativo: {
        color: Colors.Btn_Red,
        marginLeft: ".5rem"
    },
    textBalance: {
        color: Colors.Black,
        marginLeft: ".5rem"
    },
    textApuestaDescription: {
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    }
}));

const ApuestaActivaJugadorDetalles = ({ ...props }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [sum, setSum] = useState(0.0);
    const [disable, setDisable] = useState(true);
    const [moneda, setMoneda] = useState("");
    const [type, setType] = useState("DIARIA");
    function handleOnPrint() {
        const input = document.getElementById("user-apuesta-activa-entries");
        printDocument6(input, title + '-detalles-apuestas-activas-user');
    }
    const col = ['Costo:', 'Comisión:', 'Total:'];
    const symbol = moneda === "LEMPIRAS" ? " L " : " $ ";
    const values = [total.toFixed(2), comision.toFixed(2), riesgo.toFixed(2)]
    const height = window.innerHeight - 300;
    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            list[id]['valor'] = parseFloat(e.target.value);
        }
    }

    useEffect(() => {
        adminService.list_apuestas_activas_details_by_user_id(props.location.state.username,
            props.location.state.id).then((result) => {
                setTitle(result.data.title);
                setComision(result.data.comision);
                setRiesgo(result.data.riesgo);
                setTotal(result.data.total);
                setList(Array.from(result.data.list));
                setMoneda(props.location.state.moneda)
                setType(props.location.state.type)
                setSum(result.data.list.reduce((s, row) => s + row.valor, 0))
            })

    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="xs" style={{ padding: 0 }} className="container_detalle_individual_title">
                <ToastContainer autoClose={8000} />
                <AdminTitle titleLabel='Detalle Venta Individual' />
                <Grid item xs={12}><Divider /></Grid>
                <div style={{ background: '#f4f4f4', width: '100%', zIndex: 50 }}>
                    <Grid container item xs={12} className="userInfo" >
                        <Grid item xs={4} className="icon">
                            {
                                type === 'DIARIA' ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />
                            }
                        </Grid>
                        <Grid container item xs={8} direction="column" className="right_text">
                            <Typography variant="h5" className="date_time">
                                {props.location.state.hour}{" - "}{props.location.state.day}
                            </Typography>
                            <Typography variant="h5" className="user_name">
                                {props.location.state.username}{" - "}{moneda}{'['}{props.location.state.name}{']'}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Container maxWidth="xs" className="container_detalle_individual" style={{ background: '#ffffff' }}>
                <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                    <Paper className="venta_individual_scroll" style={{ width: '98%' }}>
                        <List>
                            {list.map((apuesta, index) =>
                                <ApuestaActivaEntry key={index} {...apuesta} index={index} sum={sum} {...props}
                                    disable={disable}
                                    onEdit={updateFunction}
                                />
                            )}
                        </List>
                        <List style={{ marginTop: -23, paddingBottom: 18, marginLeft: -60 }}>
                            <Typography style={{ textAlign: 'center', fontSize: 18, color: '#9C9C9C' }}>
                                Total &#8213; {sum ? sum : 0}
                            </Typography>
                        </List>
                        <Grid item xs={12} className="summaryTotal" >
                            <RowList col_1={col} symbol={symbol} col_2={values}  ></RowList>
                        </Grid>
                        <Grid style={{ height: 80 }}></Grid>
                    </Paper>
                </Grid>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    class={classes.fixedElement}
                >
                    <Fab className="localPrintshop" variant="extended" onClick={handleOnPrint} >
                        <LocalPrintshop className="iconP" />
                        <span className="textP">Imprimir</span>
                    </Fab>
                    <Fab className="detalls" variant="extended" onClick={handleOnPrint}
                        component={Link}
                        to={{
                            pathname: `/jugador/apuestas/detalles/${props.location.state.id}/desglose`,
                            state: {
                                title: title,
                                username: props.location.state.username,
                                id: props.location.state.id,
                                type: type
                            }
                        }}
                    >
                        <span className="textD">Detalles</span>
                        <FaFileExcel className="iconD" />
                    </Fab>
                </Grid>
            </Container>
        </React.Fragment>
    )
};


export default ApuestaActivaJugadorDetalles;
