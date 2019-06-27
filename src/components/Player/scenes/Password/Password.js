import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {update_password_user} from "../../../../service/api/password/password";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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


const ShowButton = withStyles({
    root: {
        height: '3.5rem',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: 'transparent',
        color: '#afafaf',
        marginTop: '1rem',
        marginBottom: '1rem',
        border : 'none',
        '&:hover': {
            backgroundColor: '#e5e5e5',
            borderColor: '#e5e5e5'

        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
export default function PlayerPassword() {
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleClickUpdatePassword=()=>{
        update_password_user(values.password)
            .then((result)=>{
                console.log(result)
            })
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm" className={classes.container}>

                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Grid item xs={10}>
                        <TextField
                            id="player-input-nueva-contrasenna"
                            label="Nueva contraseña"
                            margin="normal"
                            value={values.password}
                            onChange={handleChange('password')}
                            variant="outlined"
                            fullWidth
                            required
                            type={values.showPassword ? 'text' : 'password'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ShowButton variant="outlined" color="primary" onClick={handleClickShowPassword}>

                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                        </ShowButton>
                    </Grid>
                    <Grid
                        className={classes.btnContainer}
                    >
                        <CrearButton variant="outlined" color="primary">
                            Cambiar
                            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}

                            <SaveIcon className={classes.rightIcon}/>
                        </CrearButton>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}