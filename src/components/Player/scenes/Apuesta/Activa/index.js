import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { playerService } from "../../../../../service/api/player/player.service";
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles/index";
import './Activa.css'
import { Colors } from '../../../../../utils/__colors'
import { Currency } from '../../../../../utils/__currency'
import Fab from '@material-ui/core/Fab';
import TopBar from '../../../../View/jugador/TopBar'
import ListaApuestas from '../ListaApuestas';
import ResumenApuestas from '../Resumen/ResumenApuestas';
import AdminTitle from '../../../../Admin/components/AdminTitle_Center'

import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';
import ErrorInfoDialog from '../../../../View/Dialog/ErrorInfoDialog';
import { userActions } from '../../../../../store/actions';

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
        border: '1px #000 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
    },
    numbers: {
        paddingLeft: '.5rem'
    },
    fixedElement: {
        position: 'fixed',
        width: '100%',
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
    },
    apuestasContainer: {
        marginBottom: '5rem'
    },
    buttonContainerApuestas: {
        backgroundColor: "#ffffff",
        maxWidth: 444,
        position: "fixed",
        zIndex: "25",
        bottom: 8,
        height: '63px',
        lineHeight: '63px',
        justifyContent: "center",
        textAlign: "center",
        borderTop: 'solid 1px #9A9A9A',
        borderLeft: 'solid 1px #9A9A9A',
        borderRight: 'solid 1px #9A9A9A',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    buttonDetalles: {
        borderRadius: "15px",
        textTransform: "none",
        height: "37px",
        width: '153px',
        color: "#000000",
        backgroundColor: '#f5d657',
        fontSize: "1.2rem",
        "&:hover": {
            backgroundColor: '#f5d657',
        }
    },
    buttonLimpiar: {
        borderRadius: "15px",
        textTransform: "none",
        height: "37px",
        width: '153px',
        color: "#ffffff",
        backgroundColor: '#cc3333',
        fontSize: "1.2rem",
        "&:hover": {
            backgroundColor: '#cc3333',
        }
    },
}));

const ApuestaActiva = ({ ...props }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [hour, setHour] = useState('');
    const [day, setDay] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);
    const [apuestaType, setApuestaType] = useState('CHICA');
    const [monedaType, setMonedaType] = React.useState("$");
    const [sumValor, setSumValor] = React.useState(0);
    const apuestaCurrency = (props.location.state.moneda === "LEMPIRA" || props.location.state.moneda === "L")
        ? Currency.Lempira
        : Currency.Dollar;
    const apuestaId = props.match.params.apuestaId;

    const [open, setOpen] = useState(false);
    const [openError500Info, setOpenError500Info] = useState(false);
    const [openError409Info, setOpenError409Info] = useState(false);

    function handleClose_409_error() {
        setOpenError409Info(false);
        this.props.history.push("/");
    }
    function handleClose_500_error() {
        setOpenError500Info(false);
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose(value) {
        setOpen(false);
        if (value === true) {
            deleteAllFunction()
        }
    }

    function submitUpdateData() {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.list_apuestas_activas_details(apuestaId).then((result) => {
            setTitle(result.data.title);
            setHour(result.data.hour);
            setDay(result.data.day);
            setComision(parseFloat(result.data.comision));
            setRiesgo(parseFloat(result.data.riesgo));
            setTotal(parseFloat(result.data.total));
            setList(Array.from(result.data.list));
            setSumValor(result.data.list.reduce((sum, row) => sum + row.valor, 0))

            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function deleteOneFunction(numero) {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.delete_apuestas_activas_sorteoAndNumeroAndJugador(apuestaId, numero).then((result) => {
            if (result.status === 409) {
                setOpenError409Info(true);
            } else if (result.status === 500) {
                setOpenError500Info(true);
            }
            dispatch(userActions.loading_end())
            if (result.status === 200)
                submitUpdateData();
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function deleteAllFunction() {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.delete_apuestas_activas_sorteoAndJugador(apuestaId).then((result) => {
            if (result.status === 409) {
                setOpenError409Info(true);
            } else if (result.status === 500) {
                setOpenError500Info(true);
            }
            dispatch(userActions.loading_end())
            if (result.status === 200)
                submitUpdateData();
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        setMonedaType(props.location.state.moneda);
        playerService.list_apuestas_activas_details(apuestaId).then((result) => {
            setApuestaType(result.data.type)
            setTitle(result.data.title);
            setHour(result.data.hour);
            setDay(result.data.day);
            setComision(parseFloat(result.data.comision));
            setRiesgo(parseFloat(result.data.riesgo));
            setTotal(parseFloat(result.data.total));
            setList(prev => Array.from(result.data.list));
            setSumValor(result.data.list.reduce((sum, row) => sum + row.valor, 0))
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="userP_ventas_activas" >
            <ToastContainer autoClose={8000} />
            <AdminTitle titleLabel="Ventas Activas" />
            <TopBar apuestaType={apuestaType}
                hour={hour}
                day={day}
                total={total}
                apuestaCurrency={apuestaCurrency}
                top={153}
            />
            <Grid container spacing={0}
                direction="row"
                justify="center"
                alignItems="center" className="list_apuestas" >
                <ListaApuestas entryList={list} removerApuesta={(apuestaIndex) => {
                    deleteOneFunction(list[apuestaIndex].numero);
                }}
                    apuestaId={props.match.params.apuestaId}
                    displayApuestaListIndex={false} fromApuestaActiva={true} />
                <Grid item xs={12} className="total" style={{ paddingBottom: 10 }}>
                    <span className="text">
                        Total:
                    </span>
                    <span className="value">
                        {sumValor}
                    </span>
                </Grid>
            </Grid>

            <ResumenApuestas apuestaCurrency={apuestaCurrency}
                costoTotal={total} comisionTotal={comision} total={riesgo}
                style={{ height: 85 }} marginL={92} />

            <Grid container spacing={0}
                direction="row"
                justify="center"
                alignItems="center" className={classes.buttonContainerApuestas} >
                <Grid item xs={6}>
                    <Fab variant="extended" aria-label="removeAll" className={classes.buttonLimpiar} onClick={handleClickOpen}>
                        Limpiar
                        </Fab>
                </Grid>
                <Grid item xs={6}>
                    <Fab variant="extended" aria-label="buyAll" className={classes.buttonDetalles}
                        component={Link}
                        to={{
                            pathname: '/usuario/apuesta/detalles',
                            state: {
                                title: { title },
                                id: props.match.params.apuestaId,
                                type: apuestaType,
                                moneda: monedaType,
                                hour: hour,
                                day: day,
                                total: total
                            }
                        }}
                    >
                        Detalles X
                    </Fab>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                title="Limpiar pantalla?"
                context="Toda la información digitada se perderá"
                icon='help'>
            </ConfirmDialog>
            <ErrorInfoDialog
                open={openError500Info}
                handleClose={handleClose_500_error}
                title={'Error del sistema.'}
                context={'Su compra no fue procesada. hubo algún error del sistema trate de nuevo y si el problema persiste contacte a su agente.'}
                icon={'ioIosWarning'}
                iconSize={70}
                iconColor={'#fdfa01'}
                titleFontSize={'22px'}
                contentFontSize={'17px'}
                contentHeight={'109px'}>
            </ErrorInfoDialog>
            <ErrorInfoDialog
                open={openError409Info}
                handleClose={handleClose_409_error}
                title={'Sorteo cerrado'}
                context={'Una vez el sorteo cerro no se pueden eliminar o modificar las compras.'}
                icon={'ioIosWarning'}
                iconSize={70}
                iconColor={'#ff3333'}
                titleFontSize={'22px'}
                contentFontSize={'17px'}
                lineHeight={'23px'}
                contentHeight={'109px'}>
            </ErrorInfoDialog>
        </div>
    )
};


export default connect()(ApuestaActiva);
