import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


import {adminService} from "../../../../../service/api/admin/admin.service";


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
    }

}));

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

const EditarAsistente= ({...props}) =>{
    const classes = useStyles();
    const [placeholderUser, setPlaceholderUser] = React.useState("P000");
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [disable, setDisable] = useState(true);

    function handleDisableClick() {
        
        setDisable(!disable);
    }
    function onClickHandlerEditar() {
        if(inputPassword === '' || inputPassword === ''){
            error_reponse();
            return;
        }
        let data = {
            name: inputUserName,
            password: inputPassword,
            username: placeholderUser,  
            id: null         
        };
        
        adminService.edit_asistente(data).then((result)=>{
            success_response();
        })
    }
    useEffect(()=>{
        adminService.get_asistente_by_id(props.location.state.id).then((result)=>{            
            setPlaceholderUser(result.data.username)            
        })        
    })
    
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

    return(
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Container maxWidth="sm" className={classes.container}>
            <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom className={"form__center-label"}>
                            Asistente =
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <AsistButton variant="outlined" color="primary" className={classes.button}

                        >
                            X
                        </AsistButton>
                    </Grid>
                    <Grid item xs={6}>
                        {placeholderUser} / {inputUserName}
                    </Grid>

                </Grid>
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
                            disabled={disable}
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
                            onChange={e => setInputUserName(e.target.value)}
                            disabled={disable}
                        />
                    </Grid>
                </Grid>
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

export default EditarAsistente;