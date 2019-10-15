import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { adminService } from "../../../../../service/api/admin/admin.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import { makeStyles } from "@material-ui/core/styles/index";
import { red, blue } from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import ApuestaActivaRiesgoEntry from '../../../components/ApuestasActiva/Detalles/ApuestasActivaDetalles';
// import { printDocument6 } from "../../../../../_helpers/print";
import AdminTitle from '../../../components/AdminTitle';
import RowList from './RowList'
import { LocalPrintshop } from "@material-ui/icons";
import InformationDialog from '../../../../View/Dialog/InformationDialog';
import Fab from '@material-ui/core/Fab';
import Dollar_ON from '../../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../../View/assets/Lempiras_OFF.png';
import Chica_PNG from '../../../../View/assets/Chica_PNG.png';
import Diaria_PNG from '../../../../View/assets/Diaria_PNG.png';

import { userActions } from '../../../../../store/actions';
import { FormatNumberSymbol } from '../../../../../utils/__currency';

import './styles.css'

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

const ApuestaActivaAdminDetalle = (props) => {
    const [riesgoList, setRiesgoList] = useState([]);
    const [moneda, setMoneda] = useState("lempira");
    const [total, setTotal] = useState(0.0);
    const [totalsDolar, setTotalsDolar] = useState(0.0);
    const [totalsLempira, setTotalsLempira] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const [neta, setNeta] = useState(0.0);
    // const [title, setTitle] = useState(0.0);
    const [numeroMaxRiesgo, setNumeroMaxRiesgo] = useState(0.0);
    const [dineroApostadoMaxRiesgo, setDineroApostadoMaxRiesgo] = useState(0.0);
    const [posiblePremioMaxRiesgo, setPosiblePremioMaxRiesgo] = useState(0.0);
    const [totalRiesgoMaxRiesgo, setTotalRiesgoMaxRiesgo] = useState(0.0);
    const [errorOpen, setErrorOpen] = useState(false);
    const [isHistoryRequest, setIsHistoryRequest] = useState(props.match.path.includes("historial"));
    const col = ['Ventas:', 'Comisiónes:', 'Sub-total:'];

    useEffect(() => {
        /*setTotal((props.location.state.total).toFixed(2));
        setComision((props.location.state.comision).toFixed(2));
        setNeta((props.location.state.neta).toFixed(2));*/
        // setTitle();
        const { dispatch } = props;
        dispatch(userActions.loading_start())

        adminService.get_apuesta_activa_by_type_and_id(moneda, props.match.params.apuestaId, isHistoryRequest).then((result) => {
            if (result.status === 401)
                authenticationService.logout()
            else
                update(result)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, []);

    function update(result) {
        let maxPremio = result.data.tuplaRiesgos.reduce((calc, row) => (
            (calc.posiblePremio || 0) > row.posiblePremio ? calc : row
        ), {})
        setNumeroMaxRiesgo(maxPremio.numero);
        setDineroApostadoMaxRiesgo(result.data.maxRiesgo.dineroApostado);
        setPosiblePremioMaxRiesgo((result.data.maxRiesgo.totalRiesgo / result.data.total).toFixed(2));
        setTotalRiesgoMaxRiesgo(result.data.maxRiesgo.totalRiesgo);
        setRiesgoList(Array.from(result.data.tuplaRiesgos));
        setTotal(result.data.total);
        setComision(result.data.comision);
        setNeta((result.data.total - result.data.comision));
        setTotalsDolar(result.data.totalDolar);
        setTotalsLempira(result.data.totalLempira);
    }

    function get_in_dolar() {
        if (moneda === 'lempira') {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            adminService.get_apuesta_activa_by_type_and_id("dolar", props.match.params.apuestaId, isHistoryRequest).then((result) => {
                if (result.status === 401) {
                    authenticationService.logout()
                } else {
                    setMoneda("dolar")
                    update(result)
                }
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        }
    }

    function get_in_lempira() {
        if (moneda === 'dolar') {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            adminService.get_apuesta_activa_by_type_and_id("lempira", props.match.params.apuestaId, isHistoryRequest).then((result) => {
                if (result.status === 401) {
                    authenticationService.logout()
                } else {
                    setMoneda("lempira");
                    update(result)
                }
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        }
    }
    function handleOnPrint() {
        setErrorOpen(true)
    }
    function handleClose() {
        setErrorOpen(false)
    }

    // function handleOnPrint() {
    //     const input = document.getElementById("resumen-apuesta-activa-data-admin");
    //     printDocument6(input, title + '-resumen-apuesta-activa-admin');
    // }
    return (
        <React.Fragment>
            <Container maxwidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Detalle Ventas Generales' iconName="IoIosContacts" />
            </Container>
            <Grid container className="detalle_ventas_generales">
                <Container maxwidth="xs" className="container_time">
                    <Grid item xs={8} className="title_info" >
                        <div className="icon">
                            {props.location.state.type === "DIARIA" ? <img src={Diaria_PNG} alt="Diaria_PNG" /> : <img src={Chica_PNG} alt="Chica_PNG" />}
                        </div>
                        <div className="text">
                            <p>{props.location.state.time}</p>
                            <p>{props.location.state.day}</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="btn_group_moneda" >
                        <Button style={{ paddingTop: 9 }} onClick={() => get_in_dolar()}>
                            {moneda === "dolar" ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                        </Button>
                        <Button style={{ marginLeft: -3, paddingTop: 9 }} onClick={() => get_in_lempira()}>
                            {moneda !== "dolar" ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                        </Button>
                    </Grid>
                </Container>
                <div id="resumen-apuesta-activa-data-admin" style={{ maxWidth: 444, width: '100%' }}>
                    <div className="container_total_byCurrency">
                        <Grid item xs={12} className="resumen_total_riesgo">
                            <span className="resumen_total_riesgo_text">{'$'}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(totalsDolar)}</span>
                            <span className="resumen_total_riesgo_val">{'L'}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(totalsLempira)}</span>
                        </Grid>
                    </div>
                    <div className="container_total">
                        <RowList key={0} col_1={col} symbol={moneda === "dolar" ? '$' : 'L'}
                            col_2={[parseFloat(total), parseFloat(comision), parseFloat(neta)]} alignRight></RowList>
                    </div>
                    <Grid container>
                        <ApuestaActivaRiesgoEntry moneda={moneda} riesgoList={riesgoList} numeroMaxRiesgo={numeroMaxRiesgo} neta={neta} />
                    </Grid>
                    <Grid container justify="center" alignItems="center" className="container_print">
                        <Fab className="localPrintshop_Detalle_Ventas_Generales" variant="extended" onClick={handleOnPrint} >
                            <LocalPrintshop className="iconP" />
                            <span className="textP">Imprimir</span>
                        </Fab>
                    </Grid>
                </div>
            </Grid>
            <InformationDialog
                open={errorOpen}
                handleClose={handleClose}
                title={'Opcion no disponible'}
                context={'La opcion de imprimir no esta disponible en este momento, se esta trabajando en su implementacion'}
                icon={'ioIosWarning'}
                iconSize={67}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'80px'}>
            </InformationDialog>
        </React.Fragment>
    )
};

export default connect()(ApuestaActivaAdminDetalle);