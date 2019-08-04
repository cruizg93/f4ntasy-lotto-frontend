import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {adminService} from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';
import {Colors} from '../../../../../utils/__colors'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


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
        background : Colors.Main,
        marginBottom: "1rem"
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
}));

const JugadorDetalles = ({...props}) => {
        const [apuestasList, setApuestasList] = useState([]);
        const [name, setName] =useState('');
        const [moneda, setMoneda] = useState("L");
        const [username, setUsername] = useState('')
        const classes=useStyles();
        useEffect(() => {
            
            adminService.list_apuestas_details(props.location.state.username).then((result) => {
                setApuestasList(Array.from(result.data.sorteos));
                setName(result.data.name);
                setMoneda(result.data.moneda);
                setUsername(props.location.state.username)
            })

        }, [props])
        return (
            <React.Fragment>
                <Grid container spacing={1}
                                direction="row"
                                justify="center"
                                alignItems="flex-start"
                                className={classes.headerContainer}
                                >
                            <Grid item xs={6} >
                                <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                   Apuestas Detalles
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" gutterBottom className={"form__center-label"}
                                    style={ {
                                        color: Colors.Btn_Blue,
                                    }}
                                >
                                   {username}{" "}{name}{" "}{moneda === "LEMPIRAS" ? "L" : "$"}
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