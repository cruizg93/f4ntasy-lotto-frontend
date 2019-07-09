import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {adminService} from "../../../../../service/api/admin/admin.service";
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import {red, blue} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import ApuestaActivaRiesgoEntry from '../../../components/ApuestasActiva/Detalles/index';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
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
    textWithBorder: {
        fontWeight: 'bold',
        border: '1px solid #747474',
        margin: '1rem',
    },
    textWithBorderTop: {
        fontWeight: 'bold',
        borderTop: '1px solid #747474',
        margin: '1rem',
    },
    textBlock: {
        fontWeight: 'bold',
        display: 'block !important'
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));

const ImprimirButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#2b85c2',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const DolarButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        margin: '.5rem',
        lineHeight: 1.5,
        backgroundColor: '#2fff21',
        borderColor: 'none',
        color: '#000',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const LempiraButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        margin: '.5rem',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffe634',
        borderColor: 'none',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const HistorialSemanaActualAdmin = (props) => {
    const classes = useStyles();
    const [riesgoList, setRiesgoList] = useState([]);
    const [moneda, setMoneda] = useState("dolar");
    const [total, setTotal] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const [neta, setNeta] = useState(0.0);
    const [title, setTitle] = useState(0.0);
    const [totalSemanal, setTotalSemanal] = useState(0.0);
    const [totalPremioSemanal, setTotalPremioSemanal]=useState(0.0);
    const [comisionSemanal, setComisionSemanal] = useState(0.0);
    const [netaSemanal, setNetaSemanal] = useState(0.0);
    const [balanceSemanal, setBalanceSemanal] = useState(0.0);
    const [numeroMaxRiesgo, setNumeroMaxRiesgo] = useState(0.0);
    const [dineroApostadoMaxRiesgo, setDineroApostadoMaxRiesgo] = useState(0.0);
    const [posiblePremioMaxRiesgo, setPosiblePremioMaxRiesgo] = useState(0.0);
    const [totalRiesgoMaxRiesgo, setTotalRiesgoMaxRiesgo] = useState(0.0);
//balance: 0
// comisionToday: 0
// comisionesSemana: 0
// entradaNetaSemana: 0
// entradaNetaToday: 229.28571428571428
// pairJBList: []
// riesgoMaximo:
// comision: 0
// numero: 7
// totalValor: 4036.224489795918
// valor: 89.6938775510204
// __proto__: Object
// totalPremio: 0
// totalSemana: 0
// totalToday: 229.28571428571428

    useEffect(() => {
        adminService.get_historial_by_type("dolar").then((result) => {
            console.log(result.data);
            setNumeroMaxRiesgo(result.data.riesgoMaximo.numero);
            setDineroApostadoMaxRiesgo(result.data.riesgoMaximo.valor);
            setPosiblePremioMaxRiesgo((result.data.riesgoMaximo.totalValor / result.data.entradaNetaToday).toFixed(2));
            setTotalRiesgoMaxRiesgo(result.data.riesgoMaximo.totalValor)
            setNeta((result.data.entradaNetaToday).toFixed(2));
            setComision((result.data.comisionToday).toFixed(2));
            setTotal((result.data.totalToday).toFixed(2))
            setTitle(result.data.title)
            setTotalSemanal((result.data.totalSemana).toFixed(2));
            setTotalPremioSemanal((result.data.totalPremio).toFixed(2));
            setComisionSemanal((result.data.comisionesSemana).toFixed(2))
            setNetaSemanal((result.data.entradaNetaSemana).toFixed(2));
            setBalanceSemanal((result.data.balance).toFixed(2))

        })
        // setTotal(props.location.state.total);
        // setComision(props.location.state.comision);
        // setNeta(props.location.state.neta);
        // setTitle(props.location.state.title.title);
        //
        // adminService.get_apuesta_activa_by_type_and_id(moneda, props.match.params.apuestaId).then((result) => {
        //     console.log(result.data);
        //     setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
        //     setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
        //     setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
        //     setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
        //     setRiesgoList(Array.from(result.data.tuplaRiesgos));
        //     setTotal(result.data.total);
        //     setComision(result.data.comision);
        //     setNeta(result.data.total - result.data.comision);
        // })
    }, []);

    function get_in_dolar() {
        if (moneda === 'lempira') {
            adminService.get_apuesta_activa_by_type_and_id("dolar", props.match.params.apuestaId).then((result) => {
                setMoneda("dolar")
                setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
                setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
                setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
                setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
                setRiesgoList(Array.from(result.data.tuplaRiesgos));
                setTotal(result.data.total);
                setComision(result.data.comision);
                setNeta(result.data.total - result.data.comision);
            })
        }
    }

    function get_in_lempira() {
        if (moneda === 'dolar') {
            adminService.get_apuesta_activa_by_type_and_id("lempira", props.match.params.apuestaId).then((result) => {
                setMoneda("lempira");
                setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
                setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
                setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
                setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
                setRiesgoList([]);
                setRiesgoList(Array.from(result.data.tuplaRiesgos));
                setTotal(result.data.total);
                setComision(result.data.comision);
                setNeta(result.data.total - result.data.comision);
            })
        }
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Resumen de todos los sorteos ya terminados, de todos los jugadores, y de la
                        SEMANA EN CURSO
                    </Typography>
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {title}
                    </Typography>
                </Grid>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Grid item xs={6}>
                        <DolarButton variant="outlined" color="primary" className={classes.button}
                                     onClick={() => {
                                         get_in_dolar()
                                     }}
                        >
                            ver en $
                        </DolarButton>
                        <LempiraButton variant="outlined" color="primary" className={classes.button}
                                       onClick={() => {
                                           get_in_lempira()
                                       }}>
                            ver en L
                        </LempiraButton>
                    </Grid>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total Apuestas |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {totalSemanal}
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total Comisiones |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {comisionSemanal}
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Entrada Neta |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {netaSemanal}
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total Premios |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {totalPremioSemanal}
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Ganancia/Perdida |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {balanceSemanal}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}
                      container
                      justify="center"
                      className={classes.textWithBorderTop}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Resumen de apuestas activas para el dias de hoy
                    </Typography>

                </Grid>

                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total Apuestas |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {total}
                    </Typography>

                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total Comisiones |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {comision}
                    </Typography>

                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Entrada neta |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.text}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {neta}
                    </Typography>

                </Grid>
                <Grid item xs={12}
                      container
                      justify="center"
                      className={classes.textWithBorder}
                >
                    <Grid item xs={12}
                          container
                          justify="center"

                    >
                        <Typography variant="body1" gutterBottom className={classes.textBlock}>
                            Riesgo Máximo de la casa:
                        </Typography>
                    </Grid>

                    <Typography variant="body1" gutterBottom className={classes.text}>

                        # {numeroMaxRiesgo} - {moneda === "dolar" ? "$" : "L"} {dineroApostadoMaxRiesgo} = {moneda === "dolar" ? "$" : "L"}
                        {totalRiesgoMaxRiesgo} @ {posiblePremioMaxRiesgo}
                    </Typography>

                </Grid>
            </Grid>
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center">

            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >

                <Grid item xs={6}>
                    <ImprimirButton variant="outlined" color="primary">
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>

            </Grid>
        </React.Fragment>
    )
};

export default HistorialSemanaActualAdmin;