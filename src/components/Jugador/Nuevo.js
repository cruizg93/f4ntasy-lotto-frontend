import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import SaveIcon from '@material-ui/icons/Save';
import './Nuevo.css';
import './Diaria/Diaria'
import {green} from '@material-ui/core/colors';


import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import Diaria from "./Diaria/Diaria";
import Chica from "./Chica/Chica";

import {baseUrl, tokenStr} from '../../config/const'

import {jugadorService} from "../../service/api/jugador/jugador.service";

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '10rem',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const PlayerButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#2fff21',
        borderColor: 'none',
        color: '#000',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
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

const AsistButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffe634',
        borderColor: 'none',
        color: '#FFF',
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
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#29992a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
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
    }

}));

export default function Nuevo() {

    const classes = useStyles();

    const [selectedValueMoneda, setSelectedValueMoneda] = React.useState('l');
    const [person, setPerson] = React.useState('');
    const handleChangeSelect = event => {
        setPerson(event.target.value);
    };
    const [select, setSelectState] = React.useState(true);
    const [options, setOptions] = React.useState('<option value=""/>');

    const [placeholderUser, setPlaceholderUser] = React.useState("P000");

    const [diariaPremioMil, setDiariaPremioMil] = React.useState('');
    const [diariaPremioLempirasMil, setDiariaPremioLempirasMil] = React.useState('');

    const [diariaCostoMil, setDiariaCostoMil] = React.useState('');
    const [diariaComision, setDiariaComision] = React.useState('');

    const handleChangeDiariaPremioMil = event => setDiariaPremioMil(event.target.value);
    const handleChangeDiariaCostoMil = event => setDiariaCostoMil(event.target.value);
    const handleChangeDiariaComision = event => setDiariaComision(event.target.value);
    const handleChangeDiariaPremioLempirasMil = event => setDiariaPremioLempirasMil(event.target.value);

    const [selectedDiariaType, setSelectedDiariaType] = React.useState('dm');

    const handleChangeDiariaType = event => setSelectedDiariaType(event.target.value);


    const [chicaPremioMil, setChicaPremioMil] = React.useState('');
    const [chicaPremioDirectoMil, setChicaPremioDirectoMil] = React.useState('');
    const [chicaPremioPedazosMil, setChicaPremioPedazosMil] = React.useState('');


    const [chicaCostoMil, setChicaCostoMil] = React.useState('');
    const [chicaComision, setChicaComision] = React.useState('');
    const [chicaCostoPedazos, setChicaCostoPedazos] = React.useState('');

    const [chicaComisionPedazos, setChicaComisionPedazos] = React.useState('');

    const [selectedChicaType, setSelectedChicaType] = React.useState('cm');


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
    const [inputPassword, setInputPassword] = useState(''); // '' is the initial state value

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
        jugadorService.count().then((response) => {
            // console.log(response)
            let number = response.data - 3;
            let length = Math.log(number) * Math.LOG10E + 1 | 0;
            // console.log(length)
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
        setInputPassword('')
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
        if (inputPassword === '' || inputUserName === '') {
            submit = false;
        }

        if (!select) {
            utype = person;
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

        let headers = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${tokenStr}`
        };
        jugadorService.new_player(data)
            .then(function (response) {
                success_response();
                update_jugador();
                clean()
            })
            .catch(function (error) {
                duplicado();

            });


    }

    function onClickHandlerActivate(e) {
        e.preventDefault();
        setSelectState(false);
        jugadorService.list_players_username()
            .then((response) => {
                    let users = response.data.map((c, index) =>
                        <option key={index} value={c.id}>{c.username}</option>
                    );
                    setPerson(response.data[0].id);
                    setOptions(users);

                },
                (error) => {
                    var status = error.response.status
                }
            );

    }


    return (
        <div>

            <React.Fragment>
                <ToastContainer autoClose={8000}/>
                <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="flex-start">
                        <Grid item xs={6}>
                            <PlayerButton variant="outlined" color="primary" className={classes.button}
                                          onClick={() => setSelectState(true)}
                            >
                                P
                            </PlayerButton>
                            <AsistButton variant="outlined" color="primary" className={classes.button}
                                         onClick={onClickHandlerActivate}>
                                X
                            </AsistButton>
                        </Grid>
                        <Grid item xs={6}>
                            <NativeSelect
                                value={person}
                                className={classes.margin}
                                onChange={handleChangeSelect}
                                input={<BootstrapInput name="person" id="person-customized-native-simple"/>}
                                disabled={select}
                            >
                                {options}
                            </NativeSelect>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="flex-start">
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                Tipo de moneda
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

                    <Divider/>
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="center">
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
                            />

                            <TextField
                                id="password"
                                label="Contraseña"
                                placeholder="Nueva Contraseña"
                                margin="normal"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                value={inputPassword}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onInput={e => setInputPassword(e.target.value)}
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
                            />
                        </Grid>

                    </Grid>
                    <Divider/>

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

                    <Divider/>
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
                    <Grid
                        className={classes.btnContainer}
                    >
                        <CrearButton variant="outlined" color="primary" onClick={onClickHandlerCreate}>
                            Crear
                            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}

                            <SaveIcon className={classes.rightIcon}/>
                        </CrearButton>
                    </Grid>

                </Container>
            </React.Fragment>


        </div>
    );
}

