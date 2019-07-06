import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {playerService} from "../../../../../service/api/player/player.service";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ApuestaActivaEntry from '../../../components/ApuestaActiva/index';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Clear from '@material-ui/icons/Clear';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        width: '60px',
        border: '1px #000 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
    },
    numbers: {
        paddingLeft: '.5rem'
    }

}));


const EditarButton = withStyles({
    root: {
        width: '100%',
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

const ImprimirButton = withStyles({
    root: {
        width: '100%',
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

const FijarButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#29992a',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#52d94f',
            borderColor: '#62cc68',
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
const DetallesButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#ff9d15',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#ffe634',
            borderColor: '#cc9f0e',
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
const ApuestaActiva = ({...props}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);

    function handleDisableClick() {
        setDisable(!disable);
    }

    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            list[id]['valor'] = parseFloat(e.target.value);
        }
    }

    function submitUpdateData() {
        playerService.update_number_apuesta_activas(list, props.match.params.apuestaId).then((result) => {
            success_response();
            playerService.list_apuestas_activas_details(props.match.params.apuestaId).then((result) => {
                setTitle(result.data.title);
                setComision(result.data.comision);
                setRiesgo(result.data.riesgo);
                setTotal(result.data.total);
                setList(Array.from(result.data.list));
            })
        });
    }

    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    useEffect(() => {
        playerService.list_apuestas_activas_details(props.match.params.apuestaId).then((result) => {
            setTitle(result.data.title);
            setComision(result.data.comision);
            setRiesgo(result.data.riesgo);
            setTotal(result.data.total);
            setList(Array.from(result.data.list));
        })
    }, []);

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>


                {list.map((apuesta, index) =>
                    <ApuestaActivaEntry key={index} {...apuesta} index={index} {...props}
                                        disable={disable}
                                        onEdit={updateFunction}
                    />
                )}
            </Grid>
            <Grid container>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={''}>
                        apuestas |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={''}
                >
                    <Typography variant="body1" gutterBottom className={classes.numbers}>
                        {total}
                    </Typography>

                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={''}>
                        comisiones |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={''}
                >
                    <Typography variant="body1" gutterBottom className={classes.numbers}>
                        {comision}
                    </Typography>

                </Grid>
                <Grid item xs={3}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={''}>
                        riesgo |
                    </Typography>
                </Grid>
                <Grid item xs={9}
                      container
                      justify="flex-start"
                      className={''}
                >
                    <Typography variant="body1" gutterBottom className={classes.numbers}>
                        {riesgo}
                    </Typography>

                </Grid>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >
                <Grid item xs={6}>
                    <EditarButton variant="outlined" color="primary" onClick={handleDisableClick}>
                        <Typography variant="body1" gutterBottom>
                            Editar
                        </Typography>
                    </EditarButton>
                </Grid>
                <Grid item xs={6}>
                    <FijarButton variant="outlined" color="primary" disabled={disable} onClick={submitUpdateData}>
                        <Typography variant="body1" gutterBottom>
                            Fijar
                        </Typography>
                    </FijarButton>
                </Grid>
                <Grid item xs={6}>
                    <ImprimirButton variant="outlined" color="primary">
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>
                <Grid item xs={6}>
                    <DetallesButton variant="outlined" color="primary"
                                    component={Link}
                                    to={{
                                        pathname: '/usuario/apuesta/detalles',
                                        state: {
                                            title: {title},
                                            id: props.match.params.apuestaId
                                        }
                                    }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Detalles
                        </Typography>
                        <Clear className={classes.rightIcon}/>
                    </DetallesButton>
                </Grid>

            </Grid>

        </React.Fragment>
    )
};


export default ApuestaActiva;
