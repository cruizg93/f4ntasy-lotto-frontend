import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {playerService} from "../../../../../service/api/player/player.service";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import AsistenteEntryDetail from '../../../components/Historial/AsistenteEntryDetail/index';
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
    textSimple: {
        fontWeight: 'bold',
    },
    negative: {
        padding: theme.spacing(1, 1),
    },
    numbers: {
        paddingLeft: '.5rem'
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



const DetallesPAsistente = ({...props}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [comision, setComision] = useState(0.0);
    const [premio, setPremio] = useState(0.0);
    const [balance, setBalance] = useState(0.0);
    const [numeroValue, setNumeroValue] = useState(0);

    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);





    useEffect(() => {
        playerService.get_historial_apuestas_details_by_id(props.location.state.id).then((result)=>{
            setList(result.data);
        })
        setTitle(props.location.state.title);
        setComision(props.location.state.comision);
        setPremio(props.location.state.premio);
        setTotal(props.location.state.total);
        setBalance(props.location.state.balance);
        setNumeroValue(props.location.state.numero)

    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                <Typography variant="h5" gutterBottom>
                    {title} {" @ "} {numeroValue}
                </Typography>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>


                {list.map((apuesta, index) =>
                    <AsistenteEntryDetail key={index} {...apuesta} index={index} {...props}
                                        disable={disable}
                    />
                )}
            </Grid>
            <Grid container>
                <Grid item xs={6}
                      container
                      justify="flex-end"
                >
                    <Typography variant="body1" gutterBottom className={classes.textSimple}>
                        Total apuestas |
                    </Typography>
                </Grid>
                <Grid item xs={6}
                      container
                      justify="flex-start"
                      className={classes.textSimple}
                >
                    <Typography variant="body1" gutterBottom className={classes.textSimple}>
                        {total}
                    </Typography>

                </Grid>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >
                <Grid item xs={6}>
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


export default DetallesPAsistente;
