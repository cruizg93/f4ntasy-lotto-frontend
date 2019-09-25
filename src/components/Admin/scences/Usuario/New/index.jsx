import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import PageTitle from '../../../../View/PageTitle';
import { MainStyles } from '../../../../View/MainStyles';
import { Colors } from '../../../../../utils/__colors';


import './New.css';

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
    card: {
        display: 'flex',
        marginTop: '.5rem'
    },
    headerContainer: {
        background: Colors.Main,
        marginBottom: "0.5rem"
    },
    container: {
        background: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        zIndex: 0,
    },
    btnContainer: {
        background: Colors.Main,
        marginTop: "1rem",
    },
    button: {
        padding: "0px !important",
        fontSize: "1.5rem",
        width: "100%",
        display: 'flex',
        fontWeight: 'bolder',
    },
    StyledJugadorButton: {
        padding: "0px !important",
        fontSize: "3rem",
        width: "100%",
        display: 'flex',
        fontWeight: 'bolder',
    }


}));

const StyledButton = withStyles({
    root: {
        minWidth: "15px "
    },
})(Button);


const NewUser = ({ ...props }) => {
    const classes = useStyles();

    return (
        <React.Fragment>

            <Grid container spacing={1}
                direction="row"
                justify="center"
                className={classes.headerContainer}

            >
                <PageTitle titleLabel="Tipo de Jugador" xsValue={12} />
            </Grid>

            <Grid container spacing={1}
                direction="row"
                justify="center">
                <Grid container spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    className={classes.btnContainer}>
                    <Grid container>
                        <Grid item xs={6} style={MainStyles.fullBorderBox}>
                            <StyledButton component={Link} to="/usuario/nuevo/jugador" className={classes.StyledJugadorButton} style={{ color: Colors.Orange }}>
                                P
                            </StyledButton>
                        </Grid>
                        <Grid item xs={6} style={MainStyles.fullBorderBox}>
                            <StyledButton component={Link} to="/usuario/nuevo/asistente" className={classes.StyledJugadorButton} style={{ color: Colors.Green }}>
                                X
                            </StyledButton>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default NewUser;