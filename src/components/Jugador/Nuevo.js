import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import './Nuevo.css';
import './components/Diaria/Diaria'
import {green} from '@material-ui/core/colors';

import Diaria from "./components/Diaria/Diaria";
import Chica from "./components/Chica/Chica";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {adminService} from "../../service/api/admin/admin.service";
import {Colors} from '../../utils/__colors';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const CrearButton = withStyles({
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
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerContainer: {
        background : Colors.Main,
    },
    crearJugadorLabel:{
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
    boxContainerNuevo: {
        background : Colors.Main,
        marginTop: "1rem",
    },
    boxContainerDiaria: {
        background : Colors.Main,
        marginTop: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    inputData: {
        background : Colors.Input_bkg,
    }
}));

export default function Nuevo({...props}) {

    const classes = useStyles();
    const [selectedValueMoneda, setSelectedValueMoneda] = React.useState('');
    const [placeholderUser, setPlaceholderUser] = React.useState("P000");
    const [diariaPremioMil, setDiariaPremioMil] = React.useState('');
    const [diariaPremioLempirasMil, setDiariaPremioLempirasMil] = React.useState('');
    const [diariaCostoMil, setDiariaCostoMil] = React.useState('');
    const [diariaComision, setDiariaComision] = React.useState('');
    const handleChangeDiariaPremioMil = event => setDiariaPremioMil(event.target.value);
    const handleChangeDiariaCostoMil = event => setDiariaCostoMil(event.target.value);
    const handleChangeDiariaComision = event => setDiariaComision(event.target.value);
    const handleChangeDiariaPremioLempirasMil = event => setDiariaPremioLempirasMil(event.target.value);

    const [selectedDiariaType, setSelectedDiariaType] = React.useState('');

    const handleChangeDiariaType = event => setSelectedDiariaType(event.target.value);
    const [chicaPremioMil, setChicaPremioMil] = React.useState('');
    const [chicaPremioDirectoMil, setChicaPremioDirectoMil] = React.useState('');
    const [chicaPremioPedazosMil, setChicaPremioPedazosMil] = React.useState('');
    const [chicaCostoMil, setChicaCostoMil] = React.useState('');
    const [chicaComision, setChicaComision] = React.useState('');
    const [chicaCostoPedazos, setChicaCostoPedazos] = React.useState('');

    const [chicaComisionPedazos, setChicaComisionPedazos] = React.useState('');

    const [selectedChicaType, setSelectedChicaType] = React.useState('');

    const handleChangeChicaPremioMil = event => setChicaPremioMil(event.target.value);
    const handleChangeChicaPremioDirectoMil = event => setChicaPremioDirectoMil(event.target.value);
    const handleChangeChicaPremioPedazosMil = event => setChicaPremioPedazosMil(event.target.value);

    const handleChangeChicaCostoMil = event => setChicaCostoMil(event.target.value);
    const handleChangeChicaComision = event => setChicaComision(event.target.value);
    const handleChangeChicaCostoPedazos = event => setChicaCostoPedazos(event.target.value);
    const handleChangeChicaComisionPedazos = event => setChicaComisionPedazos(event.target.value);

    const handleChangeChicaType = event => {
        setSelectedChicaType(event.target.value);
    };
    //Input
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [open, setOpen] = useState(false);   
    const mounted = useState(true);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        props.history.push("/");
        return () => {
            mounted.current = false;
        };        
    }
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

    function update_jugador() {
        adminService.count().then((response) => {            
            let number = response.data;
            let length = Math.log(number) * Math.LOG10E + 1 | 0;
            let pword = 'P';
            switch (length) {
                case 1:
                    pword = pword + "00" + number;
                    break;
                case 2:
                    pword = pword + "0" + number;
                    break;
                default:
                    pword = pword + number;
                    break;
            }
            setPlaceholderUser(pword)
        });
    }

    function clean() {
        setDiariaPremioMil('');
        setDiariaPremioLempirasMil('');
        setDiariaCostoMil('');
        setDiariaComision('');
        setSelectedDiariaType('dm');
        setChicaPremioMil('');
        setChicaPremioDirectoMil('');
        setChicaPremioPedazosMil('');
        setChicaCostoMil('');
        setChicaComision('');
        setChicaCostoPedazos('');
        setChicaComisionPedazos('');
        setSelectedChicaType('cm');
        setInputUserName('');
        setInputPassword('123456789')
    }

    useEffect(() => {
        update_jugador();
    }, []);


    function handleChange(event) {
        setSelectedValueMoneda(event.target.value);
    }

    function onClickHandlerCreate() {
        let utype = 'p';
        let submit = true;
        if (inputPassword === '' || inputUserName === '' || selectedValueMoneda === '' || selectedDiariaType === '' || selectedChicaType === '') {
            submit = false;
        }
        let dparam1 = diariaCostoMil;
        let dparam2 = diariaPremioMil;
        if (selectedDiariaType === 'dd') {
            dparam1 = diariaComision;
            dparam2 = diariaPremioLempirasMil;
        }
        if (dparam1 === '' || dparam1 === 0 || dparam2 === '' || dparam2 === 0) {
            submit = false;
        }
        let cparam1 = 0;
        let cparam2 = 0;
        let cparam3 = 0;
        switch (selectedChicaType) {
            case 'cd':
                cparam1 = chicaComision;
                cparam2 = chicaPremioDirectoMil;
                break;
            case 'cp':
                cparam1 = chicaComisionPedazos;
                cparam2 = chicaCostoPedazos;
                cparam3 = chicaPremioPedazosMil;
                break;
            default:
                cparam1 = chicaCostoMil;
                cparam2 = chicaPremioMil;
                break;
        }
        if ((cparam1 === 0 && cparam2 === 0) || (selectedChicaType === 'cp' && cparam3 === 0)) {
            submit = false;
        }
        if (!submit) {
            error_reponse();
            return;
        }
        let data = {
            name: inputUserName,
            password: inputPassword,
            username: placeholderUser,
            utype: utype,
            mtype: selectedValueMoneda,
            dtype: selectedDiariaType,
            dparam1: dparam1,
            dparam2: dparam2,
            ctype: selectedChicaType,
            cparam1: cparam1,
            cparam2: cparam2,
            cparam3: cparam3,
        };
        adminService.new_player(data)
            .then(function (response) {                
                update_jugador();
                handleClickOpen();
                clean();
            })
            .catch(function (error) {
                duplicado();
            });        
    }

    return (
        <div>
            <React.Fragment>
                <ToastContainer autoClose={8000}/>
                <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-crear-usuario"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-crear-usuario">Su Jugador a sido creado exitosamente</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {`Usuario: ${placeholderUser} contraseña: ${inputPassword}`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>                                
                                <Button onClick={() => {
                                    handleClose();                                   

                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </Dialog> 
                <Container maxWidth="sm" className={classes.container}>                 
                    <Grid container spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                className={classes.headerContainer}
                                >
                            <Grid item xs={6} className={classes.crearJugadorLabel}>
                                <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                    Crear Jugador P
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    value="lempiras"
                                    control={
                                        <GreenRadio
                                            checked={selectedValueMoneda === 'l'}
                                            onChange={handleChange}
                                            value="l"
                                            name="radio-button-moneda"
                                            inputProps={{'aria-label': 'L'}}
                                        />}
                                    label="Lempiras"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="dolar"
                                    control={
                                        <GreenRadio
                                            checked={selectedValueMoneda === 'd'}
                                            onChange={handleChange}
                                            value="d"
                                            name="radio-button-moneda"
                                            inputProps={{'aria-label': 'D'}}
                                        />}
                                    label="Dolares"
                                    labelPlacement="bottom"
                                />
                            </Grid>
                    </Grid>
                    
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="center">
                        <Grid item xs={12} 
                            className={classes.boxContainerNuevo}
                        >
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
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                                required
                                value={inputPassword}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onInput={e => setInputPassword(e.target.value)}
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
                                value={inputUserName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onInput={e => setInputUserName(e.target.value)}
                                className={classes.inputData}                            
                            />
                        </Grid>

                    </Grid>                   
                       
                    <Grid container spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                className={classes.boxContainerDiaria}
                                >
                                    
                    
                        <Diaria premio={diariaPremioMil}
                                onChangePremioMil={handleChangeDiariaPremioMil}
                                premioLempiras={diariaPremioLempirasMil}
                                onChangePremioLempirasMil={handleChangeDiariaPremioLempirasMil}
                                costo={diariaCostoMil}
                                onChangeCostoMil={handleChangeDiariaCostoMil}
                                comision={diariaComision}
                                onChangeComisionMil={handleChangeDiariaComision}
                                diariaType={selectedDiariaType}
                                onChangeDiariaType={handleChangeDiariaType}
                         /> 
                    </Grid>               
                                   
                    <Grid container spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                className={classes.boxContainerDiaria}
                                >
                         <Chica
                            premioMil={chicaPremioMil}
                            onChangePremioMil={handleChangeChicaPremioMil}
                            premioDirecto={chicaPremioDirectoMil}
                            onChangePremioDirectoMil={handleChangeChicaPremioDirectoMil}
                            premioPedazos={chicaPremioPedazosMil}
                            onChangePremioPedazos={handleChangeChicaPremioPedazosMil}
                            costoMil={chicaCostoMil}
                            onChangeCostoMil={handleChangeChicaCostoMil}
                            comision={chicaComision}
                            onChangeComisionMil={handleChangeChicaComision}
                            costoPedazos={chicaCostoPedazos}
                            onChangeCostoPedazos={handleChangeChicaCostoPedazos}
                            comisionPedazos={chicaComisionPedazos}
                            onChangeComisionPedazos={handleChangeChicaComisionPedazos}

                            chicaType={selectedChicaType}
                            onChangeChicaType={handleChangeChicaType}

                         />
                    </Grid>
                   
                    <Grid container spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                
                                >
                        <CrearButton variant="outlined" color="primary" onClick={onClickHandlerCreate}>
                            Crear                           
                        </CrearButton>
                    </Grid>
                </Container>
            </React.Fragment>


        </div>
    );
}

