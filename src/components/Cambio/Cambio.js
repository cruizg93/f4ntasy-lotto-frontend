import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { current, update } from '../../service/api/cambio/cambio';
import NumberFormat from 'react-number-format';
import { Colors } from '../../utils/__colors';

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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
        marginBottom: '.5rem',
        marginTop: ".2rem",
        fontSize: "14pt"
    },
    headerContainer: {
        background: Colors.Main,
        marginBottom: "1rem",
    },
    bodyContainer: {
        background: Colors.Main,
        marginBottom: "1rem",
        border: `rgba(0, 0, 0, 0.12) 1px solid`,
    },
    setCambioLabel: {
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
    fijarElement: {
        color: Colors.Green,
        cursor: 'pointer',
        '&:hover': {
            background: Colors.Gray_Ligth
        }
    },
    fijarLabel: {
        margin: "0",
    },
    headerTitle: {
        fontSize: "12pt",
        marginLeft: ".5rem"
    },
    leftMargin: {
        marginLeft: ".5rem"
    }

}));

export default function Cambio() {
    const classes = useStyles();
    const [currentValue, setCurrent] = useState(0.0);
    const [cambio, setNewCurrent] = useState('');
    const [spacing, setSpacing] = React.useState(2);


    const handleChangeValue = event => {
        setNewCurrent(event.target.value);
    };
    useEffect(() => {
        current().then((result) => {
            setCurrent(result);
        })
    }, []);

    function handleOnClickCambio() {
        let data = {
            cambio: cambio
        };
        update(data).then((result) => {
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
            <ToastContainer autoClose={8000} />
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.headerContainer}
                >
                    <Grid item sm={8} className={classes.setCambioLabel}>
                        <Typography variant="h6" gutterBottom className={`${classes.headerTitle} form__left-label`}>
                            Fijar tipo de Cambio
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>

                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.bodyContainer}
                >
                    <Grid item sm={12}>
                        <Typography variant="h6" gutterBottom className={`${classes.leftMargin} form__left-label`}>
                            Tipo de cambio en sistema
                        </Typography>
                        <Typography variant="h6" gutterBottom className={`${classes.leftMargin} form__left-label`}>
                            $1.00 = {currentValue} Lempiras
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item sm={9} style={{
                        borderRight: "#afb6b8 1px solid",
                    }}>
                        <Grid container justify="center" spacing={spacing} className={classes.fijarLabel}>
                            <Typography variant="h6" gutterBottom>
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
                    <Grid item sm={3}
                        container
                        justify="center"
                        onClick={handleOnClickCambio}
                        className={classes.fijarElement}>
                        <Typography variant="h6" gutterBottom >
                            Fijar
                            </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}