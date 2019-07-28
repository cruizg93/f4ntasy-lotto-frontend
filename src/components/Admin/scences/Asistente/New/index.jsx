import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';

import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';


import { adminService } from '../../../../../service/api/admin/admin.service';

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
const NewAsistente = ({ ...props }) => {
    const classes = useStyles();
    const [placeholderUser, setPlaceholderUser] = React.useState("P000x1");
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [person, setPerson] = React.useState('');
    const [options, setOptions] = React.useState('<option value=""/>');

    function onClickHandlerCreate() {
        let utype = person;
        let submit = true;
        if (inputPassword === '' || inputUserName === '') {
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
            playerId: utype
        };
        adminService.add_player_asistente(data).then((result) => {
            success_response();
            setInputUserName('');
            setInputPassword('123456789');
            users();
        })
    }

    function users() {
        adminService.list_players_username()
            .then((response) => {
                // console.log(response.data);
                let users = response.data.map((c, index) =>
                    <option key={index} value={c.id} label={c.username}> {c.username}</option>
                );
                setPerson(response.data[0].id);
                let userId = response.data[0].id;
                let username = response.data[0].username;
                adminService.count_player_asistente(userId).then((result) => {
                    setPlaceholderUser(username + "x" + (result.data + 1));
                });
                setOptions(users);
            },
                (error) => {
                    var status = error.response.status
                }
            );
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

    useEffect(() => {
        users();
    }, [])

    const handleChangeSelect = event => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        let option = optionElement.getAttribute('label');

        adminService.count_player_asistente(event.target.value).then((result) => {
            setPlaceholderUser(option + "x" + (result.data + 1));
        });
        setPerson(event.target.value);
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom className={"form__center-label"}>
                            Crear Jugador X
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <NativeSelect
                            value={person}
                            className={classes.margin}
                            onChange={handleChangeSelect}
                            input={<BootstrapInput name="person" id="person-customized-native-simple" />}

                        >
                            {options}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom className={"form__center-label"}>
                            Listado de Jugadores P
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
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
                <Grid
                    className={classes.btnContainer}
                >
                    <CrearButton variant="outlined" color="primary" onClick={onClickHandlerCreate}>
                        Crear
                            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}

                        <SaveIcon className={classes.rightIcon} />
                    </CrearButton>
                </Grid>
            </Container>
        </React.Fragment>
    )
}
export default NewAsistente;