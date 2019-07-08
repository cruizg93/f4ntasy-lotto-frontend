import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import HighlightOff from "@material-ui/icons/HighlightOff";

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
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexGrow: 1,
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
    text: {
        display: 'flex'
    },
    svgContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    iconClose: {
        margin: '0 auto',
        display: 'block',
    }

}));

const JugadorDataShow = ({match, balance, comision, id, monedaType, riesgo, total, username, ...props}) => {
    const classes = useStyles();
    const [monedaSymbol, setMonedaSymbol] = useState('$');

    useEffect(() => {
        if (monedaType === "lempira") {
            setMonedaSymbol('L')
        }
    }, [])
    return (

        <Grid item xs={12}>
            <Paper className={classes.paper}>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} xs={12}>
                            {username} | {monedaSymbol}
                        </Paper>
                        <Grid container>
                            <Grid item xs={5}
                                  container
                                  justify="flex-end">
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    apuestas |
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {total}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}
                                  container
                                  justify="flex-end">
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    comisiones |
                                </Typography>
                            </Grid>

                            <Grid item xs={7}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {comision}
                                </Typography>
                            </Grid>

                            <Grid item xs={5}
                                  container
                                  justify="flex-end"
                            >
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    riesgo |
                                </Typography>
                            </Grid>

                            <Grid item xs={7}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {riesgo}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item
                          container
                          xs={6}>

                        <Grid item xs={7}
                              container
                              justify="center"
                        >
                            <AsistButton variant="outlined" color="primary" className={classes.button}
                                         component={Link} to={
                                {
                                    pathname: `/jugador/editar/${id}`,
                                    state: {
                                        // list: entry,
                                        id: id,
                                        // title: props.location.state.title
                                    }
                                }
                            }
                            >
                                Editar
                            </AsistButton>
                        </Grid>
                        <Grid item xs={3}
                              container
                              justify="center"
                              className={classes.svgContainer}
                        >
                            <HighlightOff className={classes.iconClose}/>
                        </Grid>
                        <Grid item xs={12}
                              container
                              justify="center"
                              component={Link} to={
                            {
                                pathname: `/jugador/balance/${id}`,
                                state: {
                                    // list: entry,
                                    id: id,
                                    // title: props.location.state.title
                                }
                            }
                        }
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                Balance |
                            </Typography>
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                {monedaSymbol} {balance}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}

export default JugadorDataShow;