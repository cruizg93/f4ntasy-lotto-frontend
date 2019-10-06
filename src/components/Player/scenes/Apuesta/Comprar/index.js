import React, { useState, useEffect } from 'react';
import { blue, red } from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import ShowNumber from '../../../../PAsistente/components/ShowNumero/index';
import { playerService } from "../../../../../service/api/player/player.service";
import { Colors } from "../../../../../utils/__colors";
import { FaShoppingCart } from 'react-icons/fa';
import ListaApuestas from '../../../scenes/Apuesta/ListaApuestas';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { timeService } from "../../../../../service/api/time/time.service";

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
        fontWeight: 'bold',
        marginLeft: ".5rem"
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    fixedElement: {
        position: 'fixed',
        width: '100%',
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
    },
    textApuestaDescription: {
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    }

}));


const EditarButton = withStyles({
    root: {
        width: '120px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Red,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const TotalButton = withStyles({
    root: {
        width: '120px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Blue,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.Btn_Hover,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);


const ComprarApuesta = ({ ...props }) => {
    const classes = useStyles();
    const [elements, setElements] = useState(props.location.state.list);
    const title = props.location.state.title.nombre;
    const [total, setTotal] = useState(0.0);
    const [comision, setComision] = useState(0.0);
    const moneda = useState(props.location.state.moneda);
    const [id, setIdValue] = useState(props.location.state.id);
    const mounted = useState(true);
    const apuestaType = props.location.state.apuestaName.includes("CHICA");
    const [time, setTime] = useState("");

    const [open, setOpen] = useState(false);



    function handleClickOpen() {
        timeService.time().then((result) => {
            setTime(result.data.time)
        })
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCloseAccept() {
        submitClickHandler()
        setOpen(false);
        props.history.push("/");
        return () => {
            mounted.current = false;
        };
    }

    const TitleValue = () => {
        return (
            <React.Fragment>
                {props.location.state.title.nombre}
            </React.Fragment>
        );
    }

    const TotalValue = () => {
        return (
            <React.Fragment>
                {props.location.state.moneda}{" "}{total}
            </React.Fragment>
        );
    };

    const ComisionValue = () => {
        return (
            <React.Fragment>
                {props.location.state.moneda}{" "}{comision}
            </React.Fragment>
        );
    };

    const RiesgoValue = () => {
        return (
            <React.Fragment>
                {props.location.state.moneda}{" "}{(total - comision).toFixed(2)}
            </React.Fragment>
        );
    };

    useEffect(() => {

        setElements(props.location.state.list);
        setIdValue(props.location.state.id);
        let totald = 0;
        props.location.state.list.forEach(function (item, index) {
            if (item.current !== 0) {
                totald = totald + item.current;
            }
        });
        let comision1 = 0;
        if (apuestaType) {
            playerService.comision_directo("chica").then((result) => {
                comision1 = totald * result.data.comision / 100;
                totald = totald * result.data.costoMil
                setComision((comision1).toFixed(2));
                setTotal(totald.toFixed(2));
            })
        } else {
            playerService.comision_directo("directo").then((result) => {
                comision1 = totald * result.data.comision / 100;
                setComision((comision1).toFixed(2));
                totald = totald * result.data.costoMil;
                setTotal(totald.toFixed(2));
            })
        }

    }, []);

    function submitClickHandler() {
        playerService.update_number(elements, id).then((result) => {
            props.history.push("/");
            window.location.reload(true);
            return () => {
                mounted.current = false;
            }
        })
    }

    return (
        <React.Fragment>
            <Dialog
                disableBackdropClick
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-crear-usuario"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-crear-usuario">Compra de numeros</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Compra para el sorteo ${title} a las ${time}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                                </Button>
                    <Button onClick={() => {
                        handleCloseAccept();
                    }} color="primary" autoFocus>
                        Aceptar
                                </Button>
                </DialogActions>
            </Dialog>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Typography variant="h6"  >
                    <TitleValue />
                </Typography>

            </Grid>
            <Divider />
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <ListaApuestas entryList={elements} removerApuesta={() => { }} />
            </Grid>
            <Grid container>
                <Grid item xs={3}
                    container
                    justify="flex-end"
                >
                    <Typography variant="body1" className={classes.text}>
                        Apuestas
                    </Typography>
                </Grid>
                <Grid item xs={8}
                    container
                    justify="flex-start"
                    className={classes.text}
                >
                    <Typography variant="body1" className={classes.text}>
                        <TotalValue />
                    </Typography>

                </Grid>
                <Grid item xs={3}
                    container
                    justify="flex-end"
                >
                    <Typography variant="body1" className={classes.text}>
                        Comision
                    </Typography>
                </Grid>
                <Grid item xs={8}
                    container
                    justify="flex-start"
                    className={classes.text}
                >
                    <Typography variant="body1" className={classes.text}>
                        <ComisionValue />
                    </Typography>
                </Grid>
                <Grid item xs={3}
                    container
                    justify="flex-end"
                >
                    <Typography variant="body1" className={classes.text}>
                        Riesgo
                    </Typography>
                </Grid>
                <Grid item xs={8}
                    container
                    justify="flex-start"
                    className={classes.text}
                >
                    <Typography variant="body1" className={classes.text}>
                        <RiesgoValue />
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.fixedElement}
            >
                <Typography variant="body1" className={classes.textApuestaDescription}>
                    <TitleValue />
                </Typography>
                <EditarButton variant="outlined" color="primary" onClick={props.history.goBack}>
                    <Typography variant="body1"  >
                        Editar
                    </Typography>
                </EditarButton>
                <TotalButton variant="outlined" color="primary" onClick={handleClickOpen}>
                    <Typography variant="body1"   >
                        Comprar <FaShoppingCart />
                    </Typography>
                </TotalButton>
            </Grid>
        </React.Fragment>
    )
};
export default ComprarApuesta;