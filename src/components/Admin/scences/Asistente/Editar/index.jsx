import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


import { adminService } from "../../../../../service/api/admin/admin.service";
import { Colors } from "../../../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
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
    container: {
        background: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        zIndex: 0,
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerContainer: {
        background: Colors.Main,
        marginBottom: "1rem"
    },
    editarAsistenteLabel: {
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
    inputData: {
        background: Colors.Input_bkg,
    },
    editLabel: {
        color: `${Colors.Btn_Red} !important`,
    },
    fijarLabel: {
        color: `${Colors.Green} !important`,
    }
}));
const EditarFijarButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        lineHeight: 1.5,
        padding: "15px 0",
        backgroundColor: Colors.Main,
        color: Colors.Btn_Blue_Dark,
        marginTop: '1rem',
        marginBottom: '1rem',
        border: 'none !important',
        borderRadius: '0',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            color: Colors.Input_bkg
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

const EditarAsistente = ({ ...props }) => {
    const classes = useStyles();
    const [placeholderUser, setPlaceholderUser] = React.useState("P000");
    const [placeholderUserName, setPlaceholderUserName] = React.useState("");

    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value

    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [disable, setDisable] = useState(true);
    const [jugadorName, setJugadorName] = useState('');
    const [jugadorUsername, setJugadorUserName] = useState('');
    const [jugadorMoneda, setJugadorMoneda] = useState('L');


    // function handleDisableClick() {
    //     setDisable(!disable);
    // }

    const editarFijarHandler = (e) => {
        if (!disable) {
            onClickHandlerEditar();
        }
        setDisable(!disable);
    }
    function onClickHandlerEditar() {
        if (inputPassword === '' || inputPassword === '') {
            error_reponse();
            return;
        }
        let data = {
            name: inputUserName,
            password: inputPassword,
            username: placeholderUser,
            id: null
        };

        adminService.edit_asistente(data).then((result) => {
            success_response();
        })
    }
    useEffect(() => {
        adminService.get_asistente_by_id(props.match.params.userId).then((result) => {
            setPlaceholderUserName(result.data.username)
            setPlaceholderUser(result.data.username);
            setPlaceholderUserName(result.data.name)
            setJugadorName(result.data.jugadorName);
            setJugadorUserName(result.data.jugadorUsername);
            setJugadorMoneda(result.data.jugadorMoneda !== "LEMPIRA" ? "$" : "L");
        })
    }, [])

    function success_response() {
        toast.success("Usuario guardado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function duplicado() {
        toast.warn("Usuario duplicado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function error_reponse() {
        toast.error("Existen datos erroneos o incompletos !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <Container maxWidth="xs" className={classes.container}>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.headerContainer}
                >
                    <Grid item xs={6} className={classes.editarAsistenteLabel}>
                        <Typography variant="h6" className={"form__center-label"}>
                            Editar Jugador X
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                </Grid>

                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.headerContainer}
                >
                    <Grid item xs={12}>
                        <Typography variant="h6" className={"form__center-label"}>
                            {placeholderUser} {placeholderUserName} {"(asociado)"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={"form__center-label"}>
                            {jugadorUsername} {jugadorName} {jugadorMoneda} {"(principal)"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.headerContainer}
                >
                    <Grid item xs={12}>
                        <TextField
                            id="user"
                            label="Nuevo Usuario"
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            value={placeholderUser}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.inputData}
                        />

                        <TextField
                            id="password"
                            label="Contraseña"
                            placeholder="Nueva Contraseña"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            value={inputPassword}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onInput={e => setInputPassword(e.target.value)}
                            disabled={disable}
                            className={classes.inputData}

                        />

                        <TextField
                            id="username"
                            label="Nombre"
                            placeholder="Nombre"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            value={inputUserName !== '' ? inputUserName : placeholderUserName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onInput={e => setInputUserName(e.target.value)}
                            disabled={disable}
                            className={classes.inputData}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"

                >
                    <EditarFijarButton variant="outlined" color="primary"
                        className={disable ? classes.editLabel : classes.fijarLabel}
                        onClick={editarFijarHandler}
                    >
                        {disable ? "Editar" : "Fijar"}
                    </EditarFijarButton>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default EditarAsistente;