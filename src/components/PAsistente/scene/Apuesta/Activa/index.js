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
import {printDocument6} from "../../../../../_helpers/print";
import {Colors} from "../../../../../utils/__colors";

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
    },
    fixedElement:{
        position: 'fixed',
        width: '100%',        
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main      
    },
    apuestasContainer:{
        marginBottom: '5rem'
    }

}));


const EditarButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Green,        
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',           
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const EliminarTodoButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Btn_Red,        
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',           
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const ImprimirButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Btn_Blue,        
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',           
            border: 'none',
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

const ApuestaActivaAsistente = ({...props}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);
    const mounted = useState(true);
    function handleDisableClick() {
        setDisable(!disable);
        submitUpdateData()
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
    function handleOnPrint() {
        const input = document.getElementById("container-apuesta-activa-data-asistente");
        printDocument6(input, title+'-activa-asistente');
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

    function handledeleteOneFunction(entryId) {
       list[entryId]['valor'] = 0.0;   
        submitUpdateData();   
    }

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
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  id="container-apuesta-activa-data-asistente">

                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    {list.map((apuesta, index) =>
                        <ApuestaActivaEntry key={index} {...apuesta} index={index} {...props}
                                            disable={disable}
                                            onEdit={updateFunction}
                                            delete={handledeleteOneFunction}
                                            mounted={mounted}
                        />
                    )}
                </Grid>
                <Grid container>
                    <Grid item xs={3}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={''}>
                            Apuestas |
                        </Typography>
                    </Grid>
                    <Grid item xs={9}
                          container
                          justify="flex-start"
                          className={''}
                    >
                        <Typography variant="body1" gutterBottom className={classes.numbers}>
                            {total.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>            
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  className={classes.fixedElement}
            >
                <Grid item xs={4}>
                    <EditarButton variant="outlined" color="primary" onClick={handleDisableClick}>
                        <Typography variant="body1" gutterBottom>
                            {disable ? "Editar" : "Fijar"}                            
                        </Typography>
                    </EditarButton>
                </Grid>                
                <Grid item xs={4}>
                    <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>
                

            </Grid>

        </React.Fragment>
    )
};


export default ApuestaActivaAsistente;
