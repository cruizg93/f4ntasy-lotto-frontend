import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Divider } from '@material-ui/core';
import NumerosGanadoresEntry from '../../../components/NumerosGanadoresEntry/index';
import { adminService } from "../../../../../service/api/admin/admin.service";
import { makeStyles } from "@material-ui/core/styles/index";
import { blue } from "@material-ui/core/colors/index";
import Typography from '@material-ui/core/Typography';
import AdminTitle from '../../../components/AdminTitle_Center';

import Dollar_ON from '../../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../../View/assets/Lempiras_OFF.png';

import './styles.css'

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
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));
const NumerosGanadores = (props) => {
    const classes = useStyles();
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    const [numerosGanadoresList, setNumerosGanadoresList] = useState([]);
    const [moneda, setMoneda] = useState("lempira");

    useEffect(() => {
        adminService.get_historial_numeros_ganadores().then((result) => {
            setNumerosGanadoresList(Array.from(result.data));
        })
    }, [])

    function handleUpdate() {
        setTimeout(() => {
            adminService.get_historial_numeros_ganadores().then((result) => {
                setNumerosGanadoresList([]);
                setNumerosGanadoresList(Array.from(result.data));
            })
        }, 3000)

    }

    const changeMonedaType = (type) => {

        if (type === 'dolar')
            setMoneda("dolar")
        else
            setMoneda("lempira")
        updateApuestasActivas(type)
    }

    const handleDolar = () => {
        if (moneda !== "dolar")
            changeMonedaType("dolar")
    }

    const handleLempira = () => {
        if (moneda !== "lempira")
            changeMonedaType("lempira")
    }

    const updateApuestasActivas = (monedaType) => {
        adminService.get_apuestas_activas(monedaType).then((result) => {
            setApuestasActivasList([]);
            setApuestasActivasList(Array.from(result.data));
        })
    }

    function desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el, index) => el[0]);
    }

    function getSorting(order) {
        return (a, b) => desc(a, b, 'title')
    }


    return (
        <React.Fragment>
            <AdminTitle titleLabel={'Números Ganadores'}></AdminTitle>
            <Container maxWidth="xs" className="container_numeros_ganadores">
                <Grid item xs={12} className="btn_group_moneda" >
                    <Button onClick={handleDolar}>
                        {moneda === "dolar" ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                    </Button>
                    <Button onClick={handleLempira} style={{ marginRight: 18 }}>
                        {moneda !== "dolar" ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                    </Button>
                </Grid>
                <Divider />
                <Grid container className="body">
                    {numerosGanadoresList.length > 0 ?
                        numerosGanadoresList.map((numero, index) =>
                            <NumerosGanadoresEntry key={index} {...numero} handle={handleUpdate} {...props} />
                        ) :
                        <Typography variant="body1" className={classes.textNoDisponible}>
                            No hay resultados disponibles para esta semana
                </Typography>
                    }

                </Grid>
            </Container>

        </React.Fragment>
    )
};

export default NumerosGanadores;