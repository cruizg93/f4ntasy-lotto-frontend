import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { adminService } from "../../../../../service/api/admin/admin.service";
import Typography from '@material-ui/core/Typography';

import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import { red, blue } from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import HistorialStatic from '../../../components/HistorialStatics/index';
import HistorialSemanaActualUserEntry from '../../../components/HistorialSemanal/index';

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
    textNoDisponible: {
        fontWeight: 'bold',
        margin: '2rem',
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
const HistorialSemanaAnteriorAdmin = (props) => {
    const classes = useStyles();
    const [usuariosList, setUsuariosList] = useState([]);
    const [moneda, setMoneda] = useState("dolar");
    const [title, setTitle] = useState(0.0);
    const [totalSemanal, setTotalSemanal] = useState(0.0);
    const [totalPremioSemanal, setTotalPremioSemanal] = useState(0.0);
    const [comisionSemanal, setComisionSemanal] = useState(0.0);
    const [netaSemanal, setNetaSemanal] = useState(0.0);
    const [balanceSemanal, setBalanceSemanal] = useState(0.0);


    useEffect(() => {
        adminService.get_historial_semana_anterior_by_type("dolar").then((result) => {
            update(result)
        })

    }, []);

    function update(result) {
        setTitle(result.data.title)
        setTotalSemanal((result.data.totalSemana).toFixed(2));
        setTotalPremioSemanal((result.data.totalPremio).toFixed(2));
        setComisionSemanal((result.data.comisionesSemana).toFixed(2));
        setNetaSemanal((result.data.entradaNetaSemana).toFixed(2));
        setBalanceSemanal((result.data.balance).toFixed(2));
        setUsuariosList(Array.from(result.data.pairJBList))

    }

    function get_in_dolar() {
        if (moneda === 'lempira') {
            adminService.get_historial_semana_anterior_by_type("dolar").then((result) => {
                setMoneda("dolar");
                update(result)
            })
        }
    }

    function get_in_lempira() {
        if (moneda === 'dolar') {
            adminService.get_historial_semana_anterior_by_type("lempira").then((result) => {
                setMoneda("lempira");
                update(result)
            })
        }
    }

    return (
        <React.Fragment>
            <HistorialStatic title={title} totalSemanal={totalSemanal} comisionSemanal={comisionSemanal}
                netaSemanal={netaSemanal} totalPremioSemanal={totalPremioSemanal} balanceSemanal={balanceSemanal}
                clickDolar={get_in_dolar} clickLempira={get_in_lempira} semana={"last"}
            />

            <Grid container spacing={3}
                direction="row"
                justify="center"
                alignItems="center">

                {usuariosList.length > 0 ?
                    usuariosList.map((usuario, index) =>
                        <HistorialSemanaActualUserEntry key={index} {...usuario} type={moneda} {...props} />
                    ) :
                    <Typography variant="body1" className={classes.textNoDisponible}>
                        No hay resultados disponibles para esta semana
                    </Typography>
                }
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center"
            >

                <Grid item xs={6}>
                    <ImprimirButton variant="outlined" color="primary"
                        disabled={usuariosList.length === 0}>
                        <Typography variant="body1"  >
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>

            </Grid>
        </React.Fragment>
    )
};

export default HistorialSemanaAnteriorAdmin;