import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";

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
        fontWeight: 'bold'
    },
    textWithBorder: {
        fontWeight: 'bold',
        border: '1px solid #747474',
        margin: '1rem',
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));
const HistorialUsuarioDetalles = (props) => {
    const classes = useStyles();
    const [id, setId] = useState(0);
    const [username, setUsername] = useState(0);
    const [moneda, setMoneda] = useState(0);
    const [semana, setSemana] = useState(0);
    const [balance, setBalance] = useState(0.0);


    useEffect(() => {
        setId(props.location.state.id);
        setUsername(props.location.state.username);
        setMoneda(props.location.state.type);
        setSemana(props.location.state.semana);
    }, []);
    return (
        <Grid container>
            <Grid item xs={12}
            >
                <Typography variant="h5" gutterBottom className={classes.textWithBorder}>
                    Detalles Balance - {username}
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.textWithBorder}>
                    {semana === 'current' ? "Semana en curso" : "Semana anterior"}
                    {moneda === "dolar" ? "$" : "L"}
                    - {balance}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {moneda === "dolar" ? "$" : "L"}
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.text}>
                    {balance}
                </Typography>
            </Grid>
        </Grid>

    )
};

export default HistorialUsuarioDetalles;