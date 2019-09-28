import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import 'react-toastify/dist/ReactToastify.css';
import { adminService } from "../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ApuestasActivasAdminData from '../../components/ApuestasActiva/ApuestasActivasAdminData'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Colors } from "../../../../utils/__colors";
import Button from "@material-ui/core/Button/index";
import AdminTitle from '../../components/AdminTitle';
import ApuestasDetallesEntry from '../../components/ApuestasActiva';
import RowList from '../../../View/RowList'
import { IoIosContacts } from "react-icons/io";

import Dollar_ON from '../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../View/assets/Lempiras_OFF.png';

import './styles.css'

const useStyles = makeStyles(theme => ({
    headerContainer: {
        background: Colors.Main,
        marginBottom: "1rem"
    },
    label: {
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
}));

const ApuestasActivasAdmin = (props) => {
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    const [moneda, setMoneda] = useState("dolar");
    const [values, setValues] = useState([]);
    const classes = useStyles();
    const col = ['Ventas:', 'Comisión:', 'Totales:'];
    useEffect(() => {
        adminService.get_apuestas_activas("dolar").then((result) => {
            setApuestasActivasList(Array.from(result.data));
            let total = result.data.reduce((sum, row) => sum + row.total, 0);
            let comision = result.data.reduce((sum, row) => sum + row.comision, 0);
            let riesgo = result.data.reduce((sum, row) => sum + row.neta, 0);
            setValues([total, comision, riesgo])
        })
    }, [])

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

    function toast_notification(type) {
        if (type === "success") {
            toast.success("Numero adcionado", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("Numero incorrecto", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Resumen Ventas Generales' />
            </Container>
            <Container maxWidth="xs" className="container_ventas_generales">
                <Grid item xs={12} className="btn_group_moneda" >
                    <Button style={{ paddingTop: 9 }} onClick={handleDolar}>
                        {moneda === "dolar" ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                    </Button>
                    <Button style={{ paddingRight: 25, paddingTop: 9 }} onClick={handleLempira}>
                        {moneda !== "dolar" ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                    </Button>
                </Grid>
                <Grid container className="body">
                    {apuestasActivas.map((apuesta, index) =>
                        <ApuestasDetallesEntry key={index} {...apuesta} index={index} {...props} moneda={moneda}
                            update={updateApuestasActivas}
                            toast={toast_notification}
                        />
                    )}
                </Grid>
            </Container>
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <Grid container maxwidth="xs" className="container_summary">
                    <Grid item xs={10} className="summaryTotal" >
                        <RowList col_1={col} symbol={moneda.symbol} col_2={values} style={{ height: 95 }}></RowList>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default ApuestasActivasAdmin;