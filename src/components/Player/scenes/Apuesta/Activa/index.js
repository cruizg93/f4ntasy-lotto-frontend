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
import {Currency} from '../../../../../utils/__currency'
import Fab from '@material-ui/core/Fab';
import TopBar from '../../../../View/jugador/TopBar'
import ListaApuestas from '../ListaApuestas';
import ResumenApuestas from '../Resumen/ResumenApuestas';
import { MdSettingsBackupRestore } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";
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
    },
    buttonContainerApuestas:{
        minWidth:"100%",
        position: "fixed",
        display:"flex",
        zIndex: "25",  
        bottom:"0px",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        paddingTop:"0.5rem",
        paddingBottom:"0.5rem", 
        paddingLeft:"1rem",
        backgroundColor:"#ffffff",
        "& div":{
            paddingRight:"1rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }
    },
    buttonDetalles:{
        height:"1.5rem",
        color: "#000000",
        backgroundColor:Colors.Jugador_Yellow,
        width:"100% !important",
        padding:"0px !important",
        "& span":{
            fontSize:"0.75rem"
        },
        "&:hover": {
            backgroundColor:Colors.Jugador_Yellow,
        }

    },
    buttonLimpiar:{
        height:"1rem",
        color: "#ffffff",
        backgroundColor:Colors.Jugador_Red,
        width:"100% !important",
        padding:"0px !important",
        "& span":{
            fontSize:"0.5rem"
        },
        "&:hover": {
            backgroundColor:Colors.Jugador_Red,
        }
    },
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
    const [hour, setHour] = useState('');
    const [day, setDay] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);
    const [apuestaType, setApuestaType] = useState('CHICA');
    const [monedaType, setMonedaType]=React.useState("$");
    const apuestaCurrency =(props.location.state.moneda==="LEMPIRAS" || props.location.state.moneda === "L")
                            ?Currency.Lempiras
                            :Currency.Dollar;
    const apuestaId = props.match.params.apuestaId;

    const mounted = useState(true);

    const [open, setOpen] = useState(false);   
    const [openEdit, setOpenEdit] = useState(false);   
    const [openCompraChange, setOpenCompraChange] = useState(false);   

    const [openDeleteOneDialog,setOpenDeleteOneDialog] = useState(false);
    const [tempApuestaIndex,setTempApuestaIndex] = useState(-1);
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);      
    }

    function handleCloseAccept() {
        eliminarCompleto()
        setOpen(false);      
    }

    function handleClickOpenEdit() {
        setOpenEdit(true);
    }

    function handleCloseEdit() {
        setOpenEdit(false);      
    }

    function handleDisableClick() {
        if(!disable){
            setOpenCompraChange(true);
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
                setHour(result.data.hour);
                setDay(result.data.day);
                setComision(parseFloat(result.data.comision));
                setRiesgo(parseFloat(result.data.riesgo));
                setTotal(parseFloat(result.data.total));
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

    function handleCloseCompraChangeAccept(){
        setOpenCompraChange(false);
        submitUpdateData();
        handleClickOpenEdit();
    }

    function handleCloseCompraChange(){
        setOpenCompraChange(false);
    }

    useEffect(() => {        
       
        setMonedaType(props.location.state.moneda);
        playerService.list_apuestas_activas_details(apuestaId).then((result) => {   
          
            setApuestaType(result.data.type)
            setTitle(result.data.title);
            setHour(result.data.hour);
            setDay(result.data.day);
            setComision(parseFloat(result.data.comision));
            setRiesgo(parseFloat(result.data.riesgo));
            setTotal(parseFloat(result.data.total));
            setList(prev => Array.from(result.data.list));
        })
    },[]);

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000}/>
            <Dialog
                            open={openCompraChange}
                            onClose={handleCloseCompraChange}
                            aria-labelledby="alert-dialog-confirm-edit"
                            aria-describedby="alert-dialog-description-confirm-edit"
                        >
                            <DialogTitle
                                id="alert-dialog-confirm-edit">Cambio a la compra</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description-confirm-edit">
                                    {`Está seguro que quiere hacer el cambio a la compra?`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>  
                                <Button onClick={handleCloseCompraChange} color="primary">
                                    Cancelar
                                </Button>                              
                                <Button onClick={() => {
                                    handleCloseCompraChangeAccept();  
                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
            </Dialog> 
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
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>                              
                                <Button onClick={() => {
                                    handleCloseAccept();  
                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
            </Dialog> 
            <Dialog
                            open={openEdit}
                            onClose={handleCloseEdit}
                            aria-labelledby="alert-dialog-update-data"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-update-data">Apuesta</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {`Su cambio a la compra a sido exitoso`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>                                
                                <Button onClick={() => {
                                    handleCloseEdit();  
                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
            </Dialog> 
            <TopBar apuestaType={apuestaType} 
                    hour={hour}
                    day={day}
                    total={total}
                    apuestaCurrency= {apuestaCurrency}
                    />
            <Grid container spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center" style={{width:"100%", marginBottom:"1.25rem",paddingTop:"2rem"}}>
                <ListaApuestas entryList={list} removerApuesta={(apuestaIndex)=>{setTempApuestaIndex(apuestaIndex);setOpenDeleteOneDialog(true)}} 
                        displayApuestaListIndex={false} fromApuestaActiva={true}/>
            </Grid>

            <ResumenApuestas apuestaCurrency={apuestaCurrency} 
                    costoTotal={total} comisionTotal={comision} total={riesgo}/>
                
            <Grid container spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center" > 
                <Grid item xs={12} className={classes.buttonContainerApuestas}>
                    <Grid item xs={4}>
                        <Fab variant="extended" aria-label="removeAll" className={classes.buttonLimpiar} onClick={handleClickOpen}>
                            <MdSettingsBackupRestore className={classes.extendedIcon} />
                                Limpiar
                        </Fab>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={6}>
                        <Fab variant="extended" aria-label="buyAll" className={classes.buttonDetalles} 
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
                            <FaFileExcel className={classes.extendedIcon}/>
                            Detalles
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  className={classes.fixedElement} style={{display:"none"}}
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
            <Dialog
                open={openDeleteOneDialog}
                onClose={()=> {setOpenDeleteOneDialog(false)}}
                aria-labelledby="alert-dialog-delete-one"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-delete-one">Desea eliminar la apuesta al número </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Una vez eliminada la apuesta no podrá recuperarla`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>      
                    <Button onClick={()=>{setOpenDeleteOneDialog(false);}} color="primary">
                                Cancel
                    </Button>                           
                    <Button onClick={() => {
                        deleteOneFunction(tempApuestaIndex);
                        setOpenDeleteOneDialog(false);
                        submitUpdateData();
                    }} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>                            
        </React.Fragment>
    )
};


export default ApuestaActiva;
