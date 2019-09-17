import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, List } from '@material-ui/core';
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
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
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


const ImprimirButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Red,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const DetallesButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Blue,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.Btn_Hover,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
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
    const height = 300;
    const col = ['Costo:', 'Comisión:', 'Total:'];
    const symbol = moneda === "LEMPIRAS" ? " L " : " $ ";
    const values = [total.toFixed(2), comision.toFixed(2), riesgo.toFixed(2)]

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
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <ToastContainer autoClose={8000} />
                <AdminTitle titleLabel='Detalle Venta Individual' />
                <Grid item xs={12}><Divider /></Grid>
            </Container>
            <Container maxWidth="xs" className="container_detalle_individual">
                <Grid container item xs={12} className="userInfo" >
                    <Grid item xs={4} className="icon">
                        {
                            type === 'DIARIA' ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />
                        }
                    </Grid>
                    <Grid container item xs={8} direction="column" className="right_text">
                        <Typography variant="h5" gutterBottom className="date_time">
                            {props.location.state.hour}{" - "}{props.location.state.day}
                        </Typography>
                        <Typography variant="h5" gutterBottom className="user_name">
                            {props.location.state.username}{" - "}{moneda}{'['}{props.location.state.name}{']'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                    <Paper className="" style={{ maxHeight: height, overflow: 'auto', width: '100%' }}>
                        <List>
                            {list.map((apuesta, index) =>
                                <ApuestaActivaEntry key={index} {...apuesta} index={index} sum={sum} {...props}
                                    disable={disable}
                                    onEdit={updateFunction}
                                />
                            )}
                        </List>
                        <List>
                            <Typography style={{ textAlign: 'center', fontSize: 22, color: '#9C9C9C' }}>
                                Total - {sum ? sum : 0}
                            </Typography>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} className="summaryTotal" >
                    <RowList col_1={col} symbol={symbol} col_2={values} style={{ height: 95 }} ></RowList>
                </Grid>
            </Container>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.fixedElement}
            >
                <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Imprimir
                    </Typography>
                </ImprimirButton>
                <DetallesButton variant="outlined" color="primary"
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
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Detalles
                    </Typography>
                    <Clear className={classes.rightIcon} />
                </DetallesButton>
            </Grid>
        </React.Fragment>
    )
};


export default ApuestaActivaJugadorDetalles;
