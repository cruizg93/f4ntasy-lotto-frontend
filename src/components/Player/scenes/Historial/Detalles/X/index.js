import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {red, blue} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import {playerService} from "../../../../../service/api/player/player.service";
import ShowDetallesApuesta from '../../../../components/Detalles/index';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
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

const DetallesApuestaHistorial = ({...props}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [id, setIdValue] = useState(0);
    const [numero, setNumeroValue] = useState(0);

    const [list, setList] = useState([]);
    useEffect(() => {
        playerService.get_historial_apuestas_user_details_by_id(props.location.state.id).then((result) => {
            setList(Array.from(result.data));
        })
        setTitle(props.location.state.title);
        setIdValue(props.location.state.id);
        setNumeroValue(props.location.state.numero)

    }, []);
    return (
        <React.Fragment>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Typography variant="h5" gutterBottom>
                    {title} {" @ "} {numero}
                </Typography>


            </Grid>
            <Divider/>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {list.map((apuestaDetail, index) =>
                    <ShowDetallesApuesta key={index} {...apuestaDetail} index={index} {...props}
                    />
                )}
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >

                <Grid item sm={6}>
                    <ImprimirButton variant="outlined" color="primary">
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>

            </Grid>
        </React.Fragment>
    )

};

export default DetallesApuestaHistorial;