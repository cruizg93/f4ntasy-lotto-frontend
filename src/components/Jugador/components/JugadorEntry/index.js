import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Currency } from '../../../../utils/__currency';
import { FormatCurrency } from '../../../../utils/__currency';

import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AsistenteDataShow from '../AsistenteEntry/index';
import { adminService } from "../../../../service/api/admin/admin.service";
import { Colors } from '../../../../utils/__colors';
import { FaUserTimes } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { TiPen } from "react-icons/ti";
import { GoTrashcan } from "react-icons/go";

import { Add, Remove } from '@material-ui/icons'

import './jugadorEntry.css';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    button: {
        margin: theme.spacing(1),
        border: 'none',
        '&:hover': {
            background: "#E3E4E9",
            border: 'none',
        },
    },

    card: {
        display: 'flex',
        marginTop: '.5rem'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    valuesContainer: {
        textDecoration: "none",
        paddingTop: ".5rem",
        "& div p": {
            paddingBottom: ".5rem",
        }
    },
    text: {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#000000',
    },
    textPositive: {
        display: 'flex',
        color: Colors.Green
    },
    textNegative: {
        display: 'flex',
        color: Colors.Btn_Red
    },
    textLabel: {
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: "right",
        marginRight: '.5rem',
        color: '#000000'
    },
    svgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    iconDelete: {
        margin: "auto",
        color: Colors.Btn_Red,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    iconEdit: {
        margin: "auto",
        color: Colors.Green,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    iconWarning: {
        margin: "auto",
        color: Colors.Orange,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    iconEditDialog: {
        marginLeft: "0",
        marginTop: "0",
        marginBottom: "0",
        marginRight: "0.5rem",
        color: Colors.Green,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    iconWarningDialog: {
        marginLeft: "0",
        marginTop: "0",
        marginBottom: "0",
        marginRight: "0.5rem",
        color: Colors.Orange,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    iconDeletegDialog: {
        marginLeft: "0",
        marginTop: "0",
        marginBottom: "0",
        marginRight: "0.5rem",
        color: Colors.Btn_Red,
        fontSize: "1.75rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",
        border: "#afb6b8 1px solid",
    },
    paperDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paperUser: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '3rem',
    },
    paperUserDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '3rem',
    },
    paperBalance: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',

    },
    paperBalanceDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
    },
    expansionPanel: {
        boxShadow: 'none',
        background: Colors.Main,
        "& p": {
            height: "25px"
        }
    },
    expansionPanelBody: {
        display: 'block',
        padding: "0 !important"
    },
    labelUser: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        /*padding: '5px 10px 5px 10px',*/
        /*margin: '0.15rem',*/
        borderRight: "#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    labelUserDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        /*padding: '1rem 10px 1rem 10px',        */
        borderRight: "#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    editarLink: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        /*padding: '1rem 10px 1rem 10px',        */
        borderRight: "#afb6b8 1px solid",
        color: Colors.Btn_Blue,
        '&:hover': {
            cursor: "pointer"
        }
    },
    balanceLink: {
        textDecoration: "none",
        pointerEvents: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '.5rem',
        marginLeft: '.5rem',
        marginRigth: '.5rem',
        color: Colors.Btn_Blue,
        textAlign: "center",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: "pointer"
        }
    },
    jugadorInfoValor: {
        fontWeight: "bold"
    }

}));

const StyleExpansionPanelSummary = withStyles(() => ({
    root: {
        minHeight: "54px !important"
    },
    expanded: {
        margin: "0px !important",
        '& div': {
            margin: "0px !important",
            padding: "0px !important",
        }
    }
}))(ExpansionPanelSummary);

const JugadorDataShow = ({ match, balance, comision, id, monedaType, riesgo, total, username, name, asistentes, ...props }) => {
    const classes = useStyles();
    const [monedaSymbol, setMonedaSymbol] = useState('$');

    const [open, setOpen] = React.useState(false);
    const [openNoEliminar, setOpenNoEliminar] = React.useState(false);
    const [openinfo, setOpenInfo] = React.useState(false);
    const [openNoEditar, setOpenNoEditar] = React.useState(false);


    const [expanded, setExpanded] = React.useState(false);
    const [asignedAsistentes, setAsignedAsistentes] = React.useState([]);

    //JugadorEnable decide si el jugador puede ser eliminado o editado
    const jugadorEnable = balance == 0 && total == 0;
    const symbol = balance < 0 ? " - " : (balance > 0 ? " + " : "")
    const apuestaCurrency = monedaType === "lempiras" ? Currency.Lempiras : Currency.Dollar;

    const handler = props.handler;
    const toast = props.toast;

    /* USER INFO FOR jugador data popup*/
    const [userInfoloading, setUserInfoloading] = React.useState(false);
    const [diariaTipo, setDiariaTipo] = React.useState('dm');
    const [diariaCostoComisionTexto, setDiariaCostoComisionTexto] = React.useState('');
    const [diariaCostoComisionValor, setDiariaCostoComisionValor] = React.useState(0);
    const [diariaPremioTexto, setDiariaPremioTexto] = React.useState('');
    const [diariaPremioValor, setDiariaPremioValor] = React.useState(0);

    const [chicaTipo, setChicaTipo] = React.useState('cm');
    const [chicaCostoTexto, setChicaCostoTexto] = React.useState('');
    const [chicaCostoValor, setChicaCostoValor] = React.useState(0);
    const [chicaComisionPercentageTexto, setChicaComisionPercentageTexto] = React.useState(0);
    const [chicaComisionPercentageValor, setChicaComisionPercentageValor] = React.useState(0);
    const [chicaPremioTexto, setChicaPremioTexto] = React.useState(0);
    const [chicaPremioValor, setChicaPremioValor] = React.useState(0);


    function handleClickOpen() {
        setOpen(true);
    }

    function handleClickInfoOpen(jugadorId) {
        setUserInfoloading(true);
        adminService.get_player_by_id(jugadorId).then((result) => {
            /* DIARIA */

            if (result.data.premioDirecto !== 0) {
                setDiariaTipo("Directo L/$");
                setDiariaCostoComisionTexto("Comision %");
                setDiariaCostoComisionValor(result.data.comisionDirecto);
                setDiariaPremioTexto("Premio");
                setDiariaPremioValor(result.data.premioDirecto);
            } else {
                setDiariaTipo("X por Miles");
                setDiariaCostoComisionTexto("Costo X Mil");
                setDiariaCostoComisionValor(result.data.costoMil);
                setDiariaPremioTexto("Premio X Mil");
                setDiariaPremioValor(result.data.premioMil);
            }
            /* DIARIA FIN*/
            /*CHICA */
            if (result.data.costoChicaPedazos !== 0) {
                setChicaTipo('X Pedazos')
                setChicaComisionPercentageTexto("Comision %");
                setChicaComisionPercentageValor(result.data.comisionChicaPedazos);
                setChicaCostoTexto("Pedazos");
                setChicaCostoValor(result.data.costoChicaPedazos);
                setChicaPremioTexto("Premio")
                setChicaPremioValor(result.data.premioChicaPedazos)

            } else if (result.data.comisionChicaDirecto !== 0 && result.data.premioChicaDirecto !== 0) {
                setChicaTipo("Directo L/$");
                setChicaComisionPercentageTexto("Comision %");
                setChicaComisionPercentageValor(result.data.comisionChicaDirecto);
                setChicaPremioTexto("Premio");
                setChicaPremioValor(result.data.premioChicaDirecto);
            } else {
                setChicaTipo("X por Miles");
                setChicaCostoTexto("Costo X Mil");
                setChicaCostoValor(result.data.costoChicaMiles);
                setChicaPremioTexto("Premio X Mil");
                setChicaPremioValor(result.data.premioChicaMiles);
            }

            /*CHICA FIN*/
            setUserInfoloading(false);
        })
        setOpenInfo(true);
    }

    function handleClickOpenNoEliminar() {
        setOpenNoEliminar(true);
    }

    function handleClickOpenNoEditar() {
        setOpenNoEditar(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleInfoClose() {
        setOpenInfo(false);
    }

    function handleCloseNoEliminar() {
        setOpenNoEliminar(false);
    }

    function handleCloseNoEditar() {
        setOpenNoEditar(false);
    }

    function deletePlayer() {
        adminService.delete_player_by_id(id).then((result) => {
            if (result.data === "Apuestas") {
                toast("fail");
            } else {
                handler();
            }
        })
    }

    const handleChangeExpand = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    useEffect(() => {
        setMonedaSymbol(apuestaCurrency.symbol);
        if (asistentes)
            setAsignedAsistentes(Array.from(asistentes))
    }, [asistentes, monedaType])
    return (
        <Grid container direction="row" className="container_entry">
            <Grid container style={{ lineHeight: '4rem' }}>
                <Grid className={total === 0.0 ? "labelUser" : "labelUser"}>
                    <Typography className="form_center-label">
                        {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name.length > 15 ? name.substring(0, 9) : name}{"]"}
                    </Typography>
                </Grid>
                <Grid className="grid_lolosStar">
                    <IoIosStar style={{ color: "#ff9900" }} onClick={() => { handleClickInfoOpen(id) }} />
                </Grid>
                <Grid className="grid_tiPen"
                    component={jugadorEnable ? Link : "div"} to={
                        {
                            pathname: '/jugador/editar/${id}',
                            state: {
                                id: id,
                            }
                        }
                    }
                >
                    <TiPen style={{ color: "#009933" }} onClick={handleClickOpenNoEditar} />
                </Grid>
                <Grid className="grid_goTranhcan" >
                    <GoTrashcan style={{ color: "#ff3333" }} onClick={jugadorEnable ? handleClickOpen : handleClickOpenNoEliminar} />
                </Grid>
                <Grid item sm={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container style={{ border: 'solid 1px #dbdcdd' }}>
                <Grid item container sm={7} alignItems="flex-start" className="valuesContainer"
                    component={(total !== 0 || comision !== 0) ? Link : "div"} to={
                        {
                            pathname: `/jugador/apuestas/detalles`,
                            state: {
                                id: id,
                                username: username
                            }
                        }
                    }
                >
                    <Grid container className="text_container" >
                        <Grid item sm={5} className="text_label">
                            Ventas:<br />
                            Comisión:<br />
                            Total:
                        </Grid>
                        <Grid item sm={2} className="text_symbol">
                            {monedaSymbol}{'\u00A0'}<br />
                            {monedaSymbol}{'\u00A0'}<br />
                            {monedaSymbol}{'\u00A0'}
                        </Grid>
                        <Grid item sm={5} className="text_value">
                            {FormatCurrency(apuestaCurrency, total)}<br />
                            {FormatCurrency(apuestaCurrency, comision)}<br />
                            {FormatCurrency(apuestaCurrency, riesgo)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={5} className="balanceLink" >
                    <Grid component={(balance !== 0) ? Link : "div"} to={
                        {
                            pathname: `/jugador/balance/${id}`,
                            state: {
                                id: id,
                            },
                        }
                    }>
                        <Typography style={{ color: "#999999", fontSize: '1.7em', padding: 10 }}>
                            Balance
                        </Typography>
                    </Grid>
                    <Grid >
                        <Typography className={balance < 0 ? classes.textNegative : (balance > 0 ? classes.textPositive : classes.text)}
                            style={{ padding: 10, color: '#6699cc', fontSize: '1.6em' }}>
                            {monedaSymbol}{'\u00A0'}{symbol}{FormatCurrency(apuestaCurrency, balance)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                {/* NO SE PUEDE EDITAR DIALOG END*/}
                <Grid item sm={12}>
                    <Dialog
                        open={openNoEditar}
                        onClose={handleCloseNoEditar}
                        aria-labelledby="alert-dialog-no-editar-usuario"
                        aria-describedby="alert-dialog-no-editar-usuario-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-no-editar-usuario-description">
                                <Grid container>
                                    <Grid item sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: Colors.Btn_Blue_Dark }}>
                                        <FaAddressCard className={classes.iconEditDialog} /><span>{username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}</span>
                                    </Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}><Divider /></Grid>
                                    <Grid item sm={12}>
                                        Este usuario tiene apuestas activas y no se puede editar en este momento.
                                </Grid>
                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNoEditar} color="primary">
                                OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                {/* NO SE PUEDE EDITAR DIALOG END*/}
                {/* DELETE DIALOG START*/}
                <Grid item sm={12}>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-eliminar-usuario"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container>
                                    <Grid item sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: Colors.Btn_Blue_Dark }}>
                                        <FaUserTimes className={classes.iconDeletegDialog} /><span>{username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}</span>
                                    </Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}><Divider /></Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}>
                                        <Typography variant="h6">
                                            {"Desea eliminar usuario?"}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        Una vez eliminado el usuario no podrá obtener los datos generados del mismo
                                </Grid>
                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                CANCELAR
                        </Button>
                            <Button onClick={() => {
                                handleClose();
                                deletePlayer();

                            }} color="primary" autoFocus>
                                ACEPTAR
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                {/* DELETE DIALOG END*/}
                {/* NO SE PUEDE ELIMINAR DIALOG START*/}
                <Grid item sm={12}>
                    <Dialog
                        open={openNoEliminar}
                        onClose={handleCloseNoEliminar}
                        aria-labelledby="alert-dialog-no-eliminar-usuario"
                        aria-describedby="alert-dialog-no-eliminar-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-no-eliminar-description">
                                <Grid container>
                                    <Grid item sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: Colors.Btn_Blue_Dark }}>
                                        <FaUserTimes className={classes.iconDeletegDialog} /><span>{username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}</span>
                                    </Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}><Divider /></Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}>
                                        <Typography variant="h6">
                                            {"Imposible Eliminar?"}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        Este usuario no se puede eliminar en este momento, ya que tiene apuestas activas y/o balance.
                                </Grid>
                                </Grid>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNoEliminar} color="primary">
                                OK
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                {/* NO SE PUEDE ELIMINAR DIALOG END*/}
                {/* JUGADOR INFO DIALOG START*/}
                <Grid item sm={12}>
                    <Dialog
                        fullWidth={true}
                        open={openinfo}
                        onClose={handleInfoClose}
                        aria-labelledby="alert-dialog-info-usuario"
                        aria-describedby="alert-dialog-info-description"
                    >
                        <DialogContent >
                            <DialogContentText id="alert-dialog-info-description">
                                <Grid container>
                                    <Grid item sm={12} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: Colors.Btn_Blue_Dark }}>
                                        <FaAddressCard className={classes.iconWarningDialog} /><span>{username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}</span>
                                    </Grid>
                                    <Grid item sm={12} style={{ marginBottom: "0.5rem" }}><Divider /></Grid>
                                    <Grid item sm={2}>
                                        <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                                            Diaria
                                    </Typography>
                                    </Grid>
                                    <Grid container item sm={10}>
                                        <Grid item sm={12}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "}{diariaTipo}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={7}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "} {diariaCostoComisionTexto}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={5}>
                                            <Typography variant="body1" gutterBottom className={classes.jugadorInfoValor}>
                                                {"="}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, diariaCostoComisionValor)}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={7}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "} {diariaPremioTexto}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={5}>
                                            <Typography variant="body1" gutterBottom className={classes.jugadorInfoValor}>
                                                {"="}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, diariaPremioValor)}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item sm={12} gutterBottom />

                                    <Grid item sm={2}>
                                        <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                                            Chica
                                    </Typography>
                                    </Grid>
                                    <Grid container item sm={10}>
                                        <Grid item sm={12}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "}{chicaTipo}
                                            </Typography>
                                        </Grid>

                                        <Grid item sm={7} style={chicaComisionPercentageValor > 0 ? { display: "flex" } : { display: "none" }}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "} {chicaComisionPercentageTexto}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={5} style={chicaComisionPercentageValor > 0 ? { display: "flex" } : { display: "none" }} >
                                            <Typography variant="body1" gutterBottom className={classes.jugadorInfoValor}>
                                                {"="}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, chicaComisionPercentageValor)}
                                            </Typography>
                                        </Grid>

                                        <Grid item sm={7} style={chicaCostoValor > 0 ? { display: "flex" } : { display: "none" }}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "} {chicaCostoTexto}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={5} style={chicaCostoValor > 0 ? { display: "flex" } : { display: "none" }} >
                                            <Typography variant="body1" gutterBottom className={classes.jugadorInfoValor}>
                                                {"="}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, chicaCostoValor)}
                                            </Typography>
                                        </Grid>

                                        <Grid item sm={7}>
                                            <Typography variant="body1" gutterBottom>
                                                {" - "}{chicaPremioTexto}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={5}>
                                            <Typography variant="body1" gutterBottom className={classes.jugadorInfoValor}>
                                                {"="}{'\u00A0'}{'\u00A0'}{FormatCurrency(apuestaCurrency, chicaPremioValor)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                            <DialogActions>
                                <Divider />
                                <Button onClick={handleInfoClose} color="primary" style={{ color: Colors.Btn_Blue_Dark }}>OK</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    {/* JUGADOR INFO DIALOG END*/}
                </Grid>
            </Grid>
            {asistentes &&
                <>
                    <Grid item ><Divider /></Grid>
                    <Grid item style={{ flex: 1 }} >
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}
                            TransitionProps={{ unmountOnExit: true }} className={classes.expansionPanel}>
                            <StyleExpansionPanelSummary
                                expandIcon={expanded ? <Remove className="expansion_icon" /> : <Add className="expansion_icon" />}
                                aria-controls="panel1bh-content"
                            >
                                <Typography variant="body1" className="expansionPanelTextHeader" >
                                    {asignedAsistentes.length}{" Vendedores X"}
                                </Typography>
                            </StyleExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.expansionPanelBody}>
                                {asignedAsistentes.map((asistente, index) =>
                                    <AsistenteDataShow key={index} {...asistente} {...props} />
                                )}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </>
            }
            {expanded && <div style={{ width: '100%', height: 5 }} />}
        </Grid>
    )
}

export default JugadorDataShow;