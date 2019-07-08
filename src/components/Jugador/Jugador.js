import React, {useState, useEffect} from 'react';

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import './Jugador.css';
import {adminService} from "../../service/api/admin/admin.service";
import {makeStyles} from "@material-ui/core/styles/index";
import JugadorDataShow from './components/JugadorEntry/index';

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
        zIndex: 0,
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }

}));

const Jugador = (props) => {
    const classes = useStyles();
    const [jugadorList, setJugadorList] = useState([]);
    useEffect(() => {
        adminService.list_players_details().then((result) => {
            console.log(result.data);
            setJugadorList(Array.from(result.data))
        })
    }, []);
    return (
        <React.Fragment>
            <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={5}>
                        {jugadorList.map((jugador, index) =>
                            <JugadorDataShow key={index} {...jugador} {...props}/>
                        )}

                    </Grid>
            </Container>

        </React.Fragment>
    );

}

export default Jugador;