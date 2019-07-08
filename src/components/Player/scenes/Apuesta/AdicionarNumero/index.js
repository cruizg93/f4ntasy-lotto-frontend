import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import {playerService} from "../../../../../service/api/player/player.service";
import EntrarNumero from "../../../components/EntrarNumero/index";
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Typography from '@material-ui/core/Typography';

const LimpiarButton = withStyles({
    root: {
        width: '100px',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#ff190a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#fb0f2f',
            borderColor: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const TotalButton = withStyles({
    root: {
        width: '100px',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#2b85c2',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
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

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    }

}));

const AdicionarNumeroApuesta = ({match, ...props}) => {
    const classes = useStyles;
    const [entry, setEntryData] = useState([]);
    const mounted = useState(true);

    useEffect(() => {

        let reg = /^\d+$/;
        if (!reg.test(match.params.apuestaId)) {
            props.history.push('/usuario/apuestas');
            return () => {
                mounted.current = false;
            }
        }
        playerService.list_number_by_apuesta_id(match.params.apuestaId).then((result) => {
            setEntryData(Array.from(result.data))
        })
    }, []);

    function limpiarClickHandler() {
        playerService.list_number_by_apuesta_id(match.params.apuestaId).then((result) => {
            setEntryData([]);
            setEntryData(Array.from(result.data))
        })
    }

    function submitClickHandler() {
        playerService.update_number(entry, match.params.apuestaId).then((result) => {
            success_response();
        })
    }

    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            entry[id]['current'] = parseFloat(e.target.value);
        } else if (entry[id]['current'] !== 0) {
            entry[id]['current'] = 0;
        }
    }

    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                <List dense className={''}>
                    {entry.map((element, index) =>
                        <EntrarNumero key={index}
                                      numero={element.numero}
                                      tope={element.tope}
                                      max={element.max}
                                      index={index}
                                      {...props}
                                      onEdit={updateFunction}
                        />
                    )}
                </List>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center">
                <LimpiarButton variant="outlined" color="primary" onClick={limpiarClickHandler}>
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Limpiar
                    </Typography>
                </LimpiarButton>
                <TotalButton variant="outlined" color="primary"
                             component={Link}
                             to={{
                                 pathname: '/usuario/apuesta/comprar',
                                 state: {
                                     list: entry,
                                     id: match.params.apuestaId,
                                     title: props.location.state.title
                                 }
                             }}
                >
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Total
                    </Typography>
                </TotalButton>
            </Grid>
        </React.Fragment>
    )
};


export default AdicionarNumeroApuesta;