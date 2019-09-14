import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {adminService} from "../../../../../service/api/admin/admin.service";
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import {red, blue} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import ApuestaActivaRiesgoEntry from '../../../components/ApuestasActiva/Detalles/ApuestasActivaDetalles';
import {printDocument6} from "../../../../../_helpers/print";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
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
const ApuestaActivaAdminDetalle = (props) => {
    const classes = useStyles();
    const [riesgoList, setRiesgoList] = useState([]);
    const [moneda, setMoneda] = useState("dolar");
    const [total, setTotal] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const [neta, setNeta] = useState(0.0);
    const [title, setTitle] = useState(0.0);
    const [numeroMaxRiesgo, setNumeroMaxRiesgo] = useState(0.0);
    const [dineroApostadoMaxRiesgo, setDineroApostadoMaxRiesgo] = useState(0.0);
    const [posiblePremioMaxRiesgo, setPosiblePremioMaxRiesgo] = useState(0.0);
    const [totalRiesgoMaxRiesgo, setTotalRiesgoMaxRiesgo] = useState(0.0);


    useEffect(() => {
        setTotal((props.location.state.total).toFixed(2));
        setComision((props.location.state.comision).toFixed(2));
        setNeta((props.location.state.neta).toFixed(2));
        setTitle(props.location.state.title.title);

        adminService.get_apuesta_activa_by_type_and_id(moneda, props.match.params.apuestaId).then((result) => {
            update(result)
        })
    }, []);

    function update(result) {
        setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
        setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
        setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
        setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
        setRiesgoList(Array.from(result.data.tuplaRiesgos));
        setTotal((result.data.total).toFixed(2));
        setComision(result.data.comision.toFixed(2));
        setNeta((result.data.total - result.data.comision).toFixed(2));
    }

    function get_in_dolar() {
        if (moneda === 'lempira') {
            adminService.get_apuesta_activa_by_type_and_id("dolar", props.match.params.apuestaId).then((result) => {
                setMoneda("dolar")
                // setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
                // setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
                // setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
                // setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
                // setRiesgoList(Array.from(result.data.tuplaRiesgos));
                // setTotal(result.data.total);
                // setComision(result.data.comision);
                // setNeta(result.data.total - result.data.comision);
                 update(result)
            })
        }
    }

    function get_in_lempira() {
        if (moneda === 'dolar') {
            adminService.get_apuesta_activa_by_type_and_id("lempira", props.match.params.apuestaId).then((result) => {
                setMoneda("lempira");
                // setNumeroMaxRiesgo(result.data.maxRiesgo.numero);
                // setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
                // setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
                // setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
                // setRiesgoList([]);
                // setRiesgoList(Array.from(result.data.tuplaRiesgos));
                // setTotal(result.data.total);
                // setComision(result.data.comision);
                // setNeta(result.data.total - result.data.comision);
                 update(result)
            })
        }
    }

    function handleOnPrint() {
        const input = document.getElementById("resumen-apuesta-activa-data-admin");
        printDocument6(input, title + '-resumen-apuesta-activa-admin');
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item sm={12}
                      container
                      justify="center"
                      className={classes.textWithBorder}
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Apuestas activas de todos los jugadores para el sorteo:
                    </Typography>
                    <Typography variant="body1" gutterBottom className={classes.text}>

                        {title}
                    </Typography>

                </Grid>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Grid item sm={6}>
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
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      id="resumen-apuesta-activa-data-admin"
                >


                    <Grid item sm={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Apuestas |
                        </Typography>
                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {total}
                        </Typography>

                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Comisiones |
                        </Typography>
                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {comision}
                        </Typography>

                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Entrada neta |
                        </Typography>
                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {neta}
                        </Typography>

                    </Grid>
                    <Grid item sm={12}
                          container
                          justify="center"
                          className={classes.textWithBorder}
                    >
                        <Grid item sm={12}
                              container
                              justify="center"

                        >
                            <Typography variant="body1" gutterBottom className={classes.textBlock}>
                                Riesgo Máximo de la casa:
                            </Typography>
                        </Grid>

                        <Typography variant="body1" gutterBottom className={classes.text}>

                            # {numeroMaxRiesgo} - {moneda === "dolar" ? "$" : "L"} {dineroApostadoMaxRiesgo.toFixed(2)} = {moneda === "dolar" ? "$" : "L"}
                            {totalRiesgoMaxRiesgo.toFixed(2)} @ {posiblePremioMaxRiesgo}
                        </Typography>

                    </Grid>
                    <Grid container spacing={3}
                          direction="row"
                          justify="center"
                          alignItems="center">
                        {riesgoList.map((numero, index) =>
                            <ApuestaActivaRiesgoEntry key={index} moneda={moneda} {...numero} total={total} {...props}/>
                        )}
                    </Grid>
                </Grid>

            </Grid>


            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >

                <Grid item sm={6}>
                    <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default ApuestaActivaAdminDetalle;