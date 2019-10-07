import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Button, Divider } from '@material-ui/core';
import NumerosGanadoresEntry from '../../../components/NumerosGanadoresEntry/index';
import { adminService } from "../../../../../service/api/admin/admin.service";
import { makeStyles } from "@material-ui/core/styles/index";
import { blue } from "@material-ui/core/colors/index";
import Typography from '@material-ui/core/Typography';
import AdminTitle from '../../../components/AdminTitle_Center';
import { userActions } from '../../../../../store/actions';

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
    const [numerosGanadoresList, setNumerosGanadoresList] = useState([]);
    const [moneda, setMoneda] = useState("lempira");

    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.get_historial_numeros_ganadores(moneda).then((result) => {
            setNumerosGanadoresList(Array.from(result.data));
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, [])

    function handleUpdate(monedaType = "lempira") {
        setTimeout(() => {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            adminService.get_historial_numeros_ganadores(monedaType).then((result) => {
                setNumerosGanadoresList([]);
                setNumerosGanadoresList(Array.from(result.data));
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        }, 50)
    }

    const changeMonedaType = (type) => {

        if (type === 'dolar')
            setMoneda("dolar")
        else
            setMoneda("lempira")
        handleUpdate(type)
    }

    const handleDolar = () => {
        if (moneda !== "dolar")
            changeMonedaType("dolar")
    }

    const handleLempira = () => {
        if (moneda !== "lempira")
            changeMonedaType("lempira")
    }

    return (
        <React.Fragment>
            <AdminTitle titleLabel={'Números Ganadores'}></AdminTitle>
            <Container maxwidth="xs" className="container_numeros_ganadores">
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
                            <NumerosGanadoresEntry key={index} {...numero} handle={handleUpdate} {...props}
                                moneda={moneda.toLowerCase() === 'dolar' ? '$' : 'L'}
                            />
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

export default connect()(NumerosGanadores);