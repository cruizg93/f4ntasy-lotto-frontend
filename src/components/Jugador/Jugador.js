import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import './Jugador.css';
import {adminService} from "../../service/api/admin/admin.service";
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import JugadorDataShow from './components/JugadorEntry/index';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {Colors} from '../../utils/__colors';
import {MainStyles} from '../View/MainStyles';
import {FaUserPlus} from 'react-icons/fa';
import PageTitle from '../View/PageTitle';


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
    headerContainer: {
        background : Colors.Main,
        marginBottom:"0.5rem"
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
    },
    editIcon:{
        marginLeft: ".5rem",
        marginTop: ".5rem",
        paddingTop: ".2rem",
        fontSize: "1.25rem"
    }

}));

const CrearButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        padding: "0",
        backgroundColor: Colors.Main,
        color: Colors.Btn_Blue_Dark,
        border: 'none !important',
        borderRadius: '0',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            color: Colors.Input_bkg
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
            <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    className={classes.headerContainer}
                    >
                <PageTitle titleLabel="Resumen Jugadores" xsValue={8}/>
                <Grid item xs={4} style={MainStyles.fullBorderBoxNoLeft}>
                    <CrearButton variant="outlined" color="primary" 
                    component={Link}
                    to={
                        {
                            pathname: `/usuario/nuevo`,                               
                        }
                    }                   
                    >
                        <Typography variant="body1" gutterBottom>
                            CREAR<FaUserPlus className={classes.editIcon}/>
                        </Typography>

                    </CrearButton>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center">
                {jugadorList.map((jugador, index) =>
                    <JugadorDataShow key={index} {...jugador} {...props} handler={reload} toast={toast_notification}/>
                )}
            </Grid>
        </React.Fragment>
    );
}

export default Jugador;