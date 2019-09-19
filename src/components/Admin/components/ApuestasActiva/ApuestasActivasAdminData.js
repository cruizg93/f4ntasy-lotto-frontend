import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { red, blue, purple } from "@material-ui/core/colors/index";
import { Colors } from "../../../../utils/__colors";
import { FaInfoCircle } from 'react-icons/fa';
import { adminService } from "../../../../service/api/admin/admin.service";
import Button from "@material-ui/core/Button/index";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",

    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontWeight: 'bold',
    },
    close: {
        color: red[400]
    },
    bloqueada:{
        color: purple[500]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    textLabel: {
        display: 'flex',
        margin: '.5rem'
    },
    textValueLabel: {
        display: 'flex',
        marginLeft: '.5rem',
        fontWeight: 'bold',
    },
    textSorteoAbierto: {
        color: Colors.Green,
    },
    typeContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '1rem',
        borderRight: "#afb6b8 1px solid",
    },
    titleContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '1rem',
    },
    infoContainer: {
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '1rem',
        color: Colors.Black,
        '&:hover': {
            color: Colors.Gray_Ligth_2
        }
    },
    infoLabel: {
        display: 'flex',
        margin: '.5rem',
        height: "2rem",
        width: "2rem",
        '&:hover': {
            cursor: "pointer"
        }
    },
    sorteoTextContainer: {
        borderRight: "#afb6b8 1px solid",
        textDecoration: "none",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: ".5rem"
    },
    numeroGanadorContainer: {
        color: Colors.Btn_Blue,
        marginTop: '.5rem',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    circle: {
        padding: 10,
        margin: 5,
        display: "flex",
        background: Colors.Yellow,
        borderRadius: "50%",
        border: `${Colors.Green} 2px solid`,
        width: 35,
        height: 35,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }

}));

const ApuestasActivasAdminData = ({
    match: { url }, total, title, premio, neta, id,
    estado, comision, balance, type, ...props
}) => {
    const classes = useStyles();
    const [moneda, setMoneda] = React.useState(" $ ");
    const [open, setOpen] = useState(false);
    const [numero, setNumero] = useState('');
    const toast = props.toast;

    React.useEffect(() => {
        setMoneda(props.moneda === "lempira" ? " L " : " $ ")
    }, [])

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setNumero('');
        setOpen(false);
    }

    const update = props.update;

    const forceClose = (e) => {
        e.preventDefault()
        adminService.forceClose(id).then((result) => {
            window.location.reload();
        })
    }

    const bloquearSorteo = (e) => {
        e.preventDefault()
        adminService.bloquearSorteo(id).then((result) => {
            window.location.reload();
        })
    }

    const desbloquearSorteo = (e) => {
        e.preventDefault()
        adminService.desbloquearSorteo(id).then((result) => {
            window.location.reload();
        })
    }


    const handleChangeNumeroGanador = (e) => {
        const twoDigitRegExp = new RegExp('^[0-9]{2}$');
        if (e.target.value === '' || twoDigitRegExp.test(e.target.value)) {
            setNumero(e.target.value)
        }
    }

    const fijarNumeroGanador = () => {
        if (numero !== '' && numero !== -1 && numero >= 0 && numero < 100) {
            adminService.fix_numero_ganador(numero, id).then((result) => {
                update(props.moneda);
            })
            toast("success");
        } else {
            toast("fail");
            setNumero('');
        }
    }
    return (
        <Grid item xs={12} className={classes.component}>
            <Paper key={props.index} className={classes.paper}>
                <Grid container>
                    <Grid item xs={2} className={classes.typeContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {type}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.titleContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.infoContainer}
                        component={Link}
                        to={
                            {
                                pathname: `${url}/${id}`,
                                state: {
                                    title: { title },
                                    total: total,
                                    comision: comision,
                                    neta: neta,
                                }
                            }
                        }
                    >
                        <FaInfoCircle className={classes.infoLabel}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Apuestas | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                        className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                            {total.toFixed(2)}
                        </Typography>

                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Comisiones | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                        className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                            {comision.toFixed(2)}
                        </Typography>

                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Entrada neta | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                        className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                            {neta.toFixed(2)}
                        </Typography>

                    </Grid>
                    {estado !== 'ABIERTA' && estado !== 'BLOQUEADA' && <>
                        <Grid item xs={6}
                            container
                            justify="flex-end"
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                Premios | {moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}
                            container
                            justify="flex-start"
                            className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                                {premio.toFixed(2)}
                            </Typography>

                        </Grid>
                        <Grid item xs={6}
                            container
                            justify="flex-end"
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                Ganancia/Perdida | {moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}
                            container
                            justify="flex-start"
                            className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                                {balance.toFixed(2)}
                            </Typography>

                        </Grid>


                    </>}
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={6}
                        container
                        justify="center"
                        className={classes.text}
                    >
                        <Typography variant="h5" gutterBottom
                            className={`${estado === 'ABIERTA' ? classes.textSorteoAbierto: estado ==='CERRADA'?classes.close:classes.bloqueada} ${classes.sorteoTextContainer}`}>
                            {estado === 'ABIERTA' ? "Sorteo Abierto" : estado ==='CERRADA'?"Sorteo Cerrado":"Sorteo Bloqueado"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="center"
                        className={classes.text}
                    >
                        {estado === 'ABIERTA' ?
                            <><Typography variant="body1" gutterBottom className={classes.numeroGanadorContainer}
                            onClick={forceClose}>{"Cerrar"}</Typography>
                            {"\u00A0"}{"\u00A0"}{"\u00A0"}{"-"}{"\u00A0"}{"\u00A0"}{"\u00A0"}
                            <Typography variant="body1" gutterBottom className={classes.numeroGanadorContainer}
                                onClick={bloquearSorteo}
                            >
                                {"Bloquear"}
                            </Typography></>
                            : null
                        }
                        {estado === 'CERRADA' ?
                            <Typography variant="body1" gutterBottom className={classes.numeroGanadorContainer}
                                onClick={handleClickOpen}
                            >
                                {"Asignar numero ganador"}
                            </Typography>
                            : null
                        }
                        {estado === 'BLOQUEADA' ?
                            <Typography variant="body1" gutterBottom className={classes.numeroGanadorContainer}
                            onClick={desbloquearSorteo}
                            >
                                {"Desbloquear"}
                            </Typography>
                            : null
                        }

                    </Grid>
                </Grid>
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-add-numero-ganador"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-add-numero-ganador">{`ADICIONAR NUMERO GANADOR`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {type} - {title}
                    </DialogContentText>
                    <NumberFormat
                        id="numero-ganador-input"
                        // hintText="Costo x mil"
                        label="Numero ganador"
                        placeholder="Numero ganador(0-99)"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={numero}
                        allowNegative={false}
                        format="##"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        customInput={TextField}
                        onChange={(e) => handleChangeNumeroGanador(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        handleClose();
                        fijarNumeroGanador();
                    }} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default ApuestasActivasAdminData;