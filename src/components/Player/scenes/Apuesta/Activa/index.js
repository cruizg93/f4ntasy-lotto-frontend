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
import './Activa.css'
import {Colors} from '../../../../../utils/__colors'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const DetallesButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Orange,       
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
            backgroundColor: Colors.Btn_Hover,            
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
    const [apuestaType, setApuestaType] = useState('CHICA');
    const [monedaType, setMonedaType]=React.useState("$");

    const apuestaId = props.match.params.apuestaId;

    const mounted = useState(true);

    const [open, setOpen] = useState(false);   

   

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        eliminarCompleto()
        setOpen(false);      
    }

    function handleDisableClick() {
        if(!disable){
            submitUpdateData();
        }       
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
        playerService.update_number_apuesta_activas(list, apuestaId).then((result) => {
            success_response();
            playerService.list_apuestas_activas_details(apuestaId).then((result) => {                
                setTitle(result.data.title);
                setComision(result.data.comision.toFixed(2));
                setRiesgo(result.data.riesgo.toFixed(2));
                setTotal(result.data.total.toFixed(2));
                setList(Array.from(result.data.list));
            })
        });
    }

    function deleteOneFunction(entryId) {       
        list[entryId]['valor'] = 0.0;   
        submitUpdateData();      
    }

    function eliminarCompleto(){
        list.forEach((elem, idx) => {
            elem['valor']= 0.0;            
        })
        submitUpdateData();
    }

    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function handleOnPrint() {        
        const input = document.getElementById("container-apuesta-activa-data");
        printDocument6(input, title+'-activa');
    }

    useEffect(() => {        
       
        setMonedaType(props.location.state.moneda)
        playerService.list_apuestas_activas_details(apuestaId).then((result) => {   
          
            setApuestaType(result.data.type)
            setTitle(result.data.title);
            setComision(result.data.comision.toFixed(2));
            setRiesgo(result.data.riesgo.toFixed(2));
            setTotal(result.data.total.toFixed(2));
            setList(Array.from(result.data.list));
        })
    },[]);

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-crear-usuario"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-crear-usuario">Eliminar números</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {`Desea eliminar todos los números?`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>                                
                                <Button onClick={() => {
                                    handleClose();  
                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
            </Dialog> 
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
                  id="container-apuesta-activa-data"
                  className={classes.apuestasContainer}
                  >
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    {/*<Grid container spacing={1} id="apuestas-activas-data-entry">*/}
                    {list.map((apuesta, index) =>
                        <ApuestaActivaEntry key={index} {...apuesta} index={index} {...props}
                                            disable={disable}
                                            onEdit={updateFunction}
                                            delete={deleteOneFunction}
                                            mounted={mounted}
                        />
                    )}
                    {/*</Grid>*/}


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
                            {monedaType}{" "}{total}
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
                            {monedaType}{" "}{comision}
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
                        {monedaType}{" "}{riesgo}
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  className={classes.fixedElement}
            >
                <Grid item xs={2}>
                    <EditarButton variant="outlined" color="primary" onClick={handleDisableClick}>
                        <Typography variant="body1" gutterBottom>
                            {disable ? "Editar" : "Fijar"}                            
                        </Typography>
                    </EditarButton>
                </Grid>
                <Grid item xs={2}>
                    <EliminarTodoButton variant="outlined" color="primary" 
                         onClick={handleClickOpen}
                        >
                        <Typography variant="body1" gutterBottom>
                            Eliminar completo
                        </Typography>
                    </EliminarTodoButton>
                </Grid>
                <Grid item xs={2}>
                    <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                        </Typography>
                    </ImprimirButton>
                </Grid>
                <Grid item xs={2}>
                    <DetallesButton variant="outlined" color="primary"
                                    component={Link}
                                    to={{
                                        pathname: '/usuario/apuesta/detalles',
                                        state: {
                                            title: {title},
                                            id: props.match.params.apuestaId,
                                            type : apuestaType,
                                            moneda : monedaType,
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
