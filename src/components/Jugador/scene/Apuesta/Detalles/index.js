import React, {useState, useEffect, useReducer} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {adminService} from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';
import {Colors} from '../../../../../utils/__colors'
import Typography from '@material-ui/core/Typography';

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
    headerContainer: {
        background : Colors.Main
    },
    crearJugadorLabel:{
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
    boxContainerNuevo: {
        background : Colors.Main,
        marginTop: "1rem",
    },
    boxContainerDiaria: {
        background : Colors.Main,
        marginTop: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem"
    }, 
    pageTitle:{
        borderBottom: "2px solid red",
        borderRight:"#afb6b8 1px solid",
        borderLeft:"#afb6b8 1px solid",
        borderTop:"#afb6b8 1px solid"
    }  
}));

const userNameReducer = (state, action) =>{
    return state;
}

const JugadorDetalles = ({...props}) => {
        const [apuestasList, setApuestasList] = useState([]);
        const [name, setName] =useState('');
        const [moneda, setMoneda] = useState("L");     
        const classes=useStyles();

        const username = useReducer(userNameReducer, props.location.state.username);

        useEffect(() => {            
            adminService.list_apuestas_details(username[0]).then((result) => {                
                setApuestasList(Array.from(result.data.sorteos));
                setName(result.data.name);
                setMoneda(result.data.moneda);
               /*  setUsername(props.location.state.username) */
            })
        }, [])
        return (
            <React.Fragment>
                <Grid container spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="stretch"
                        className={classes.headerContainer}
                        >
                    <Grid item xs={6} className={classes.pageTitle} >
                        <Typography variant="h6" gutterBottom className={"form__center-label"}>
                            Apuestas Detalles
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        style={{
                            borderRight:"#afb6b8 1px solid",
                            borderTop:"#afb6b8 1px solid",
                            borderBottom:"#afb6b8 1px solid",
                        }}
                    >
                        <Typography variant="h6" gutterBottom className={"form__center-label"}
                            style={ {
                                color: Colors.Btn_Blue_Dark,                                
                            }}
                        >
                            {username}{" - "}{moneda === "LEMPIRAS" ? "L" : "$"}{" ["}{name}{"]"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                            {apuestasList.map((apuesta, index) =>
                                <JugadorDetallesEntry key={index} {...apuesta} index={index}
                                                    username={props.location.state.username}
                                                    moneda={moneda}
                                                    {...props}/>
                            )}
                    
                </Grid>
            </React.Fragment>
        )
    }
;
export default JugadorDetalles;