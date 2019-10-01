import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import 'react-toastify/dist/ReactToastify.css';
import { playerService } from "../../../../../service/api/player/player.service";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ApuestaActivaEntry from '../../../components/ApuestaActiva/index';
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Clear from '@material-ui/icons/Clear';
import { printDocument6 } from "../../../../../_helpers/print";
import './Activa.css'
import { Colors } from '../../../../../utils/__colors'
import { Currency } from '../../../../../utils/__currency'
import Fab from '@material-ui/core/Fab';
import TopBar from '../../../../View/jugador/TopBar'
import ListaApuestas from '../ListaApuestas';
import ResumenApuestas from '../Resumen/ResumenApuestas';
import { MdSettingsBackupRestore } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AdminTitle from '../../../../Admin/components/AdminTitle_Center'

import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';
import ConfirmDialogR from '../../../../View/Dialog/ConfirmDialog_R';
import InformationDialog from '../../../../View/Dialog/InformationDialog';
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
    const apuestaCurrency = (props.location.state.moneda === "LEMPIRAS" || props.location.state.moneda === "L")
        ? Currency.Lempiras
        : Currency.Dollar;
    const apuestaId = props.match.params.apuestaId;

    const mounted = useState(true);

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCompraChange, setOpenCompraChange] = useState(false);

    const [openDeleteOneDialog, setOpenDeleteOneDialog] = useState(false);
    const [tempApuestaIndex, setTempApuestaIndex] = useState(-1);
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose(value) {
        if (value) {
            handleCloseAccept()
        } else {
            setOpen(false);
        }
    }

    function handleCloseAccept() {
        eliminarCompleto()
        setOpen(false);
    }

    function handleClickOpenEdit() {
        setOpenEdit(true);
    }

    function handleCloseEdit() {
        setOpenEdit(false);
    }

    function handleDisableClick() {
        if (!disable) {
            setOpenCompraChange(true);
        }
        setDisable(!disable);
    }

    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            list[id]['valor'] = parseFloat(e.target.value);
        }
    }

    function submitUpdateData() {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.update_number_apuesta_activas(list, apuestaId).then((result) => {
            success_response();
            playerService.list_apuestas_activas_details(apuestaId).then((result) => {
                setTitle(result.data.title);
                setHour(result.data.hour);
                setDay(result.data.day);
                setComision(parseFloat(result.data.comision));
                setRiesgo(parseFloat(result.data.riesgo));
                setTotal(parseFloat(result.data.total));
                setList(Array.from(result.data.list));
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        });
    }

    function deleteOneFunction(entryId) {
        list[entryId]['valor'] = 0.0;
        submitUpdateData();
    }

    function eliminarCompleto() {
        list.forEach((elem, idx) => {
            elem['valor'] = 0.0;
        })
        setSumValor(0)
        submitUpdateData();
    }

    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function handleOnPrint() {
        const input = document.getElementById("container-apuesta-activa-data");
        printDocument6(input, title + '-activa');
    }

    function handleCloseCompraChangeAccept() {
        setOpenCompraChange(false);
        submitUpdateData();
        handleClickOpenEdit();
    }

    function handleCloseCompraChange() {
        setOpenCompraChange(false);
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
        <div style={{ background: 'white', paddingTop: 112, paddingBottom: 68 }}>
            <ToastContainer autoClose={8000} />
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                title="Limipiar pantalla?"
                context="Toda la información digitada se perderá"
                icon='help'>
            </ConfirmDialog>
            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-update-data"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-update-data">Apuesta</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Su cambio a la compra a sido exitoso`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleCloseEdit();
                    }} color="primary" autoFocus>
                        Aceptar
                                </Button>
                </DialogActions>
            </Dialog>
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
                alignItems="center" style={{ width: "100%", paddingTop: 4 }}>
                <ListaApuestas entryList={list} removerApuesta={(apuestaIndex) => {
                    setTempApuestaIndex(apuestaIndex); deleteOneFunction(apuestaIndex);
                }}
                    displayApuestaListIndex={false} fromApuestaActiva={true} />
                <Grid item xs={12} style={{ paddingBottom: 10 }}>
                    <span style={{ textAlign: "center", color: "#999999", fontSize: '18px', marginLeft: 94 }}>
                        Total:
                    </span>
                    <span style={{ textAlign: "center", color: "#999999", fontSize: '18px', marginLeft: 44 }}>
                        {sumValor}
                    </span>
                </Grid>
            </Grid>

            <ResumenApuestas apuestaCurrency={apuestaCurrency}
                costoTotal={total} comisionTotal={comision} total={riesgo}
                style={{ height: 85 }} />

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
        </div>
    )
};


export default connect()(ApuestaActiva);
