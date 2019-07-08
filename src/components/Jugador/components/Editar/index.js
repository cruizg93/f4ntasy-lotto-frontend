import React, {useEffect, useState} from 'react';
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
import NativeSelect from '@material-ui/core/NativeSelect';
import SaveIcon from '@material-ui/icons/Save';
import {green} from '@material-ui/core/colors';


import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import Diaria from "../Diaria/Diaria";
import Chica from "../Chica/Chica";
import {adminService} from "../../../../service/api/admin/admin.service";

import './Editar.css';

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

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);
const PlayerButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#29992a',
        borderColor: 'none',
        color: '#000',
        pointerEvents: 'none',
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
const EditarButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#ff190a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#fb0f2f',
            borderColor: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const FijarButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#29992a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#52d94f',
            borderColor: '#62cc68',
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
const EditarJugador = (props) => {
    const classes = useStyles();
    const mounted = useState(true);
    const [disable, setDisable] = useState(true);

    function handleDisableClick() {
        setDisable(!disable);
    }

    const [selectedValueMoneda, setSelectedValueMoneda] = React.useState('l');
    const [person, setPerson] = React.useState('');

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

    useEffect(() => {
        adminService.get_player_by_id(props.match.params.jugadorId).then((result) => {

            if (result.data.costoChicaPedazos !== 0
            ) {
                setSelectedChicaType('cp')
                setChicaCostoPedazos(result.data.costoChicaPedazos);
                setChicaComisionPedazos(result.data.comisionChicaPedazos);
                setChicaPremioPedazosMil(result.data.premioChicaPedazos)

            } else if (result.data.comisionChicaDirecto !== 0
                && result.data.premioDirecto !== 0
            ) {
                setSelectedChicaType('cd');
                setChicaPremioDirectoMil(result.data.premioChicaDirecto);
                setChicaComision(result.data.comisionChicaDirecto);
            } else {
                setChicaPremioMil(result.data.premioChicaMiles);
                setChicaCostoMil(result.data.costoChicaMiles);
            }

            if (result.data.premioDirecto !== 0) {
                setSelectedDiariaType('dd');
                setDiariaPremioLempirasMil(result.data.premioDirecto);
                setDiariaComision(result.data.comisionDirecto);
            } else {
                setDiariaPremioMil(result.data.premioMil);
                setDiariaCostoMil(result.data.costoMil);
            }
            setPlaceholderUser(result.data.username);
            setInputUserName(result.data.name);

        })

    }, [])

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

    function handleChange(event) {
        setSelectedValueMoneda(event.target.value);
    }

    function onClickHandlerEditar() {
        let utype = 'p';
        let submit = true;
        if (inputPassword === '' || inputUserName === '') {
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
        console.log(data);
        adminService.edit_player(data)
            .then(function (response) {
                props.history.push("/");
                return () => {
                    mounted.current = false;
                };

            })
            .catch(function (error) {
                duplicado();

            });

    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom className={"form__center-label"}>
                            Jugador =
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <PlayerButton variant="outlined" color="primary" className={classes.button}

                        >
                            P
                        </PlayerButton>
                    </Grid>
                    <Grid item xs={6}>
                        {placeholderUser} / {inputUserName}
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


                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                >
                    <Grid item xs={6}>
                        <EditarButton variant="outlined" color="primary" onClick={handleDisableClick}>
                            <Typography variant="body1" gutterBottom>
                                Editar
                            </Typography>
                        </EditarButton>
                    </Grid>
                    <Grid item xs={6}>
                        <FijarButton variant="outlined" color="primary" disabled={disable}
                                     onClick={onClickHandlerEditar}>
                            <Typography variant="body1" gutterBottom>
                                Fijar
                            </Typography>
                        </FijarButton>
                    </Grid>

                </Grid>

            </Container>
        </React.Fragment>
    )
}


export default EditarJugador;