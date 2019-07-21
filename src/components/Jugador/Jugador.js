import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    function reload(){
        adminService.list_players_details().then((result) => {
            toast_notification("success");
            setJugadorList([]);
            setJugadorList(Array.from(result.data))
        })
    }
    useEffect(() => {
        adminService.list_players_details().then((result) => {            
            setJugadorList(Array.from(result.data))
        })
    }, []);

    function toast_notification(type) {
        if(type === "success"){
            toast.success("Usuario eliminado !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error("Existen apuestas activas asociadas al usuario", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
       
    }
    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={5}>
                    {jugadorList.map((jugador, index) =>
                        <JugadorDataShow key={index} {...jugador} {...props} handler={reload} toast={toast_notification}/>
                    )}

                </Grid>
            </Container>

        </React.Fragment>
    );

}

export default Jugador;