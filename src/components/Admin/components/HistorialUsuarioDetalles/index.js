import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { red, blue } from "@material-ui/core/colors/index";
import { adminService } from "../../../../service/api/admin/admin.service";
import HistorialUsuarioDetallesEntry from '../HistorialUsuarioDetalles/HUDEntry/index';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

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
    const [daysEntry, setDaysEntry] = useState([])


    useEffect(() => {
        setId(props.location.state.id);
        setUsername(props.location.state.username);
        setMoneda(props.location.state.type);
        setSemana(props.location.state.semana);
        adminService.get_historial_current_week_by_id_and_type(props.location.state.id, props.location.state.type)
            .then((result) => {
                setDaysEntry(Array.from(result.data.uddList))
                setBalance((result.data.balance).toFixed(2))
            })
    }, []);
    return (
        <Grid container>
            <Grid item xs={12}
            >
                <Typography variant="h5" className={classes.textWithBorder}>
                    Detalles Balance - {username}
                </Typography>
                <Typography variant="body1" className={classes.textWithBorder}>
                    {semana === 'current' ? "Semana en curso" : "Semana anterior"}
                    {moneda === "dolar" ? "$" : "L"}
                    - {balance}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.text}>
                    {moneda === "dolar" ? "$" : "L"}
                </Typography>
                <Typography variant="body1" className={classes.text}>
                    {balance}
                </Typography>
            </Grid>

            <Grid container spacing={3}
                direction="row"
                justify="center"
                alignItems="center">

                {daysEntry.length > 0 ?
                    daysEntry.map((entry, index) =>
                        <HistorialUsuarioDetallesEntry key={index} {...entry} id={id} username={username}
                            type={moneda} {...props} />
                    ) :
                    <Typography variant="body1" className={classes.textNoDisponible}>
                        No hay resultados disponibles para esta semana
                    </Typography>
                }
            </Grid>
        </Grid>

    )
};

export default HistorialUsuarioDetalles;