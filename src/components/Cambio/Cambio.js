import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {current, update} from '../../service/api/cambio/cambio';
import NumberFormat from 'react-number-format';
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import SwapHoriz from '@material-ui/icons/SwapHoriz';

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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
        marginBottom: '.5rem'
    },

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

export default function Cambio() {
    const classes = useStyles();
    const [currentValue, setCurrent] = useState(0.0);
    const [cambio, setNewCurrent] = useState('');
    const [spacing, setSpacing] = React.useState(2);


    const handleChangeValue = event => {
        setNewCurrent(event.target.value);
    };
    useEffect(() => {
        let jsonData = JSON.parse(sessionStorage.getItem('userData'));
        let tokenStr = jsonData['accessToken'];
        current(tokenStr).then((result) => {
            setCurrent(result);
        })
    }, []);

    function handleOnClickCambio() {
        let data = {
            cambio: cambio
        };
        let jsonData = JSON.parse(sessionStorage.getItem('userData'));
        let tokenStr = jsonData['accessToken'];
        update(data, tokenStr).then((result) => {
            setCurrent(result.cambio);
            setNewCurrent('');
            success_response();
        })
    }

    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
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
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom className={"form__center-label"}>
                            Tipo de cambio en sistema
                        </Typography>
                        <Typography variant="body1" gutterBottom className={"form__center-label"}>
                            $1.00 = {currentValue} Lempiras
                        </Typography>
                        <Divider/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom className={"form__center-label"}>
                            Nuevo tipo de cambio
                        </Typography>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={spacing}>

                            <Typography variant="body1" gutterBottom>
                                $1.00 =
                            </Typography>

                            <NumberFormat
                                id="cambio-update"
                                label="Lempiras"
                                className={classes.textField}
                                margin="dense"
                                onChange={handleChangeValue}
                                value={cambio}
                            />

                        </Grid>
                    </Grid>

                </Grid>
                <Grid
                    className={classes.btnContainer}
                >
                    <CrearButton variant="outlined" color="primary" onClick={handleOnClickCambio}>
                        Fijar
                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}

                        <SwapHoriz className={classes.rightIcon}/>
                    </CrearButton>
                </Grid>
            </Container>
        </React.Fragment>
    );
}