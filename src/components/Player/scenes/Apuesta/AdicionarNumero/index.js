import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import {Link, Redirect} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {playerService} from "../../../../../service/api/player/player.service";
import ListaApuestas from "../../../scenes/Apuesta/ListaApuestas";
import EntrarNumero from "../../../components/EntrarNumero/index";
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import {Colors} from '../../../../../utils/__colors';
import { FaShoppingCart } from 'react-icons/fa';
import TopBar from '../../../../View/jugador/TopBar';
import BottomBar from '../../../../View/jugador/BottomBar';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { TiSocialFlickrCircular } from "react-icons/ti";
import { MdSettingsInputSvideo, MdFileDownload, MdSettingsBackupRestore } from "react-icons/md";
import {Currency, FormatCurrency} from '../../../../../utils/__currency';
import { setDate } from 'date-fns';
import {MainStyles} from '../../../../View/MainStyles'
import {timeService} from "../../../../../service/api/time/time.service";
import ResumenApuestas from "../Resumen/ResumenApuestas";


const useStyles = theme =>({
    root: {
        
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    },
    fixedElement:{
        position: 'fixed',
        width: '100%',        
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main      
    },
    textApuestaDescription:{
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    },
    inputIcon:{
        color:"#afb6b8",
        "& svg":{
            paddingRight:"0.1rem",
            borderRight:"#3366cc 1px solid",
        }
    },
    extendedIcon: {
        
    },
    buttonContainerApuestas:{
        backgroundColor:"#ffffff",
        minWidth:"100%",
        position: "fixed",
        display:"flex",
        zIndex: "25",  
        bottom:"3px",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        marginTop:"0.5rem",
        paddingLeft:"1rem",
        "& div":{
            paddingRight:"1rem",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }
    },
    buttonAgregarApuesta:{
        borderRadius: "1000px",
        textTransform: "none",
        height:"2rem",
        color: "#ffffff",
        backgroundColor:Colors.Orange,
        fontSize:"1.5rem",
        width:"100% !important",
        "&:hover": {
            backgroundColor:Colors.Orange,
          }
    },
    buttonComprar:{
        borderRadius: "1000px",
        textTransform: "none",
        height:"1.5rem",
        color: "#ffffff",
        backgroundColor:Colors.Jugador_Blue,
        width:"100% !important",
        padding:"0px !important",
        "& span":{
            fontSize:"0.75rem"
        },
        
    },
    buttonFinalizarCompra:{
        borderRadius: "1000px",
        textTransform: "none",
        height:"1.5rem",
        color: "#ffffff",
        backgroundColor:Colors.Jugador_Blue,
        width:"100% !important",
        padding:"0px !important",
        "& span":{
            fontSize:"0.75rem"
        },
        "&:hover": {
            backgroundColor:Colors.Jugador_Blue,
          }
    },
    buttonLimpiar:{
        borderRadius: "1000px",
        textTransform: "none",
        height:"1.25rem",
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
    
});



class AdicionarNumeroApuesta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entryNumero: null,
            entryUnidades: null,
            entryList: [],
            entry: [],
            apuestaType: '',
            total: 0.00,
            totalCurrent: 0.00,
            totalUnidades:0.00,
            comisionRate: 0.00,
            comisionTotal: 0.00,
            costoXMil: 0.00,
            costoTotal:0.00,
            mounted: true,
            day: '',
            hour: '',
            name: '',
            isAgregarApuestaButtonEnable: true,
            displayApuestaListIndex:true,
            openFinalizarCompraDialog:false,
        }
        this.apuestaCurrency=(this.props.moneda==="LEMPIRAS" || this.props.moneda === "L")?Currency.Lempiras:Currency.Dollar;
        this.match = props.match;

        this.topBarRef = React.createRef();
        this.entryInputContainerRef = React.createRef();
        this.entryNumeroInputRef = React.createRef();
        this.entryUnidadesInputRef = React.createRef();     
        
        this.buttonContainerApuestasRef = React.createRef();
        this.agregarApuestaButtonRef = React.createRef();
        this.buttonContainerComprarRef = React.createRef();
    }

    componentDidMount(){
        let reg = /^\d+$/;
        if (!reg.test(this.match.params.apuestaId)) {
            this.props.history.push('/usuario/apuestas');
            return () => {
                this.state.mounted.current = false;
            }
        }
        playerService.list_of_numbers_by_apuesta_id(this.match.params.apuestaId).then((result) => {
            this.setState({name:result.data.name});
            this.setState({entry:Array.from(result.data.list)});
            this.setState({hour:result.data.hour});
            this.setState({day:result.data.day});
            this.setState({apuestaType: result.data.type});

            let comisionRate = 0;
            let costoXMil = 0;
            if (result.data.type=="CHICA") {
                playerService.comision_directo("chica").then((result) => {
                    comisionRate = result.data.comision;
                    costoXMil = result.data.costoMil
                    this.setState({comisionRate:comisionRate});
                this.setState({costoXMil:costoXMil});
                })
            }else{
                playerService.comision_directo("directo").then((result) => { 
                    comisionRate =result.data.comision;
                    costoXMil = result.data.costoMil; 
                    this.setState({comisionRate:comisionRate});
                    this.setState({costoXMil:costoXMil});
                })
            }  
        });
        this.buttonContainerComprarRef.current.style.display = "none";   
        this.entryNumeroInputRef.current.focus(); 
        
    }

    inpuntKeyPressedEvent = (event) =>{
        if (event.key === "Enter") {
            let numero = this.entryNumeroInputRef.current.value;
            let unidades = this.entryUnidadesInputRef.current.value;
            if( unidades.length == 0 || numero.length == 0){
                return;
            }else{
                this.agregarApuesta(null);
            }
        }
    }
   

    handleComprar = (event) => {
        if (this.state.entryList.length == 0){
            return;
        }

        this.buttonContainerApuestasRef.current.style.display = "none";
        this.entryInputContainerRef.current.style.display = "none";
        this.buttonContainerComprarRef.current.style.display = "flex";
        
        //Merge valores iguales
        let newEntryList = this.state.entry.filter(item =>{return item.current>0});
        this.setState((prevState, props) => {
            return {entryList:newEntryList}} ); 
        
        //Esconder index de la lista
        this.setState((prevState, props) => {
            return {displayApuestaListIndex:false}; });  

    }

    agregarApuesta = (event) => {
        let numero = this.entryNumeroInputRef.current.value ;
        let current = this.entryUnidadesInputRef.current.value ;//costo
        if( current.length == 0 || numero.length == 0){
            return;
        }
        let costoApuesta = parseFloat(current) * parseFloat(this.state.costoXMil);
        let costoTotal = parseInt(costoApuesta)+ parseInt(this.state.costoTotal); 
        let comisionApuesta = parseFloat(current) * parseFloat(this.state.comisionRate) / 100;
        let comisionTotal = parseFloat(comisionApuesta)+ parseFloat(this.state.comisionTotal);
        
        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            let currentTotal = this.state.totalCurrent+parseInt(current)
            return {totalCurrent:currentTotal}; });  

        //Actualizar lista
        this.setState(state => {
            const apuestaNueva = {numero:numero,current:parseInt(current)};
            const entryList = [apuestaNueva].concat(state.entryList);
            return {
                entryList,
                value: '',
            };
          });
        
        // Set costoTotal
        this.setState((prevState, props) => {
            return {costoTotal:costoTotal}; });  

        // Set comisionTotal
        this.setState((prevState, props) => {
            return {comisionTotal:comisionTotal}; });  

        // Set ApuestaTotal
        this.setState((prevState, props) => {
            let total = parseFloat(costoTotal)- parseFloat(comisionTotal); 
            return {total:total}; });  

        //Agregar apuesta a fetchedList entry
        this.setState(state => {
            const entry = state.entry.map((item, j) => {
              if (j === parseInt(numero)) {
                let newCurrent = parseInt(item.current) + parseInt(current);
                return {numero: numero, tope: newCurrent, max: newCurrent, current: newCurrent, noFirst: false}
              } else {
                return item;
              }
            });
            return {
                entry,
            };
        });
        this.entryNumeroInputRef.current.focus();
    }
    removerApuesta = (index,numero,current) => {
        let costoApuesta = parseFloat(current) * parseFloat(this.state.costoXMil);
        let comisionApuesta = parseFloat(current) * parseFloat(this.state.comisionRate) / 100;

        // Set costoTotal
        let costoTotal = this.state.costoTotal - costoApuesta;
        this.setState((prevState, props) => {
            return {costoTotal:costoTotal}; });  

        // Set comisionTotal
        let comisionTotal = this.state.comisionTotal - comisionApuesta;
        this.setState((prevState, props) => {
            return {comisionTotal:comisionTotal}; });

        // Set ApuestaTotal
        let totalTotal = parseFloat(costoTotal)- parseFloat(comisionTotal); 
        this.setState((prevState, props) => {
            return {total:totalTotal}; });  

        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            let currentTotal = this.state.totalCurrent-parseInt(current)
            return {totalCurrent:currentTotal}; });  

        // quitar apuesta de lista
        this.setState(state => {
            const entryList = state.entryList.filter((apuesta,i,arr) => i !== index);
            return {
                entryList,
            };
        });
    }

    limpiarApuestas = (event) => {
        this.setState(state => {
            return { entryList : []};
        });

        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            return {totalCurrent:0}; });  

        // Set costoTotal
        this.setState((prevState, props) => {
            return {costoTotal:0.00}; });  

        // Set comisionTotal
        this.setState((prevState, props) => {
            return {comisionTotal:0.00}; });  

        // Set ApuestaTotal
        this.setState((prevState, props) => {
            return {total:0.00}; });

        //asignar valor de cero a todos los numeros
        this.setState(state => {
            const entry = state.entry.map((item, j) => {
                return {numero: item.numero, tope: 0, max: 0, current: 0, noFirst: false}
            });
            return {
                entry,
            };
        });
    }

    handleFinalizarCompra = (event) => { 
        let id = this.match.params.apuestaId;
        playerService.update_number(this.state.entry, id).then((result) => {
            this.props.history.push("/");
            this.handleCloseFinalizarCompraDialog(event);
            return () => {
                this.state.mounted.current = false;
            };        
        })
    }

    handleClickOpenFinalizarCompraDialog = (event) => {
        timeService.time().then((result)=>{          
            this.setState((prevState, props) => {
                return {time:result.data.time}; });
        })
        this.setState((prevState, props) => {
            return {openFinalizarCompraDialog:true}; });
    }
    handleCloseFinalizarCompraDialog = (event) => {
        this.setState((prevState, props) => {
            return {openFinalizarCompraDialog:false}; });
    }

    render() {
        this.classes  = this.props.classes;

        function updateFunction(e) {
            // let id = e.target.id;
            // id = id.split('-')[3];
            // if (e.target.value !== '') {
            //     this.setState.entry[id]['current'] = parseFloat(e.target.value);
            // } else if (this.state.entry[id]['current'] !== 0) {
            //     this.state.entry[id]['current'] = 0;
            // }
        }

        const StyledButton = withStyles({
            root: {
                width: '100px',
                height: '100%',
                borderRadius: "1000px",
            },
        })(Button);
    
        function submitClickHandler() {
            playerService.update_number(this.state.entry, this.match.params.apuestaId).then((result) => {
                success_response();
            })
        }
    
        function success_response() {
            toast.success("Cambio actualizado !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        const ApuestaInput = withStyles({
            root:{
                fontSize:"1.25rem",
                height:"100%",
                height:"2.25rem",
                borderRadius:"1000px",
                border:"#afb6b8 1px solid",
                paddingRight:"0.75rem",
                paddingLeft:"0.75rem",
                caretColor: "#3366ff",    
                '&:hover': {
                    borderColor: '#3366cc',
                },
                '&$focused': {
                    borderColor: '#3366cc',
                }   
            },
            
        })(TextField);

        //FaRegTrashAlt
        const LimpiarButton = withStyles({
            root: {
                width: '100px',
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
        
        return (
            <React.Fragment>
                <ToastContainer autoClose={8000}/>
                
                <TopBar ref={this.topBarRef}
                    apuestaType={this.state.apuestaType} 
                    fecha={this.state.hour+" - "+this.state.day}
                    total={this.state.total}
                    apuestaCurrency={ (this.props.moneda==="LEMPIRAS" || this.props.moneda === "L")?Currency.Lempiras:Currency.Dollar}
                    
                    />
                <Grid container spacing={0}
                display ="flex"
                justify="center"
                alignItems="center"
                ref={this.entryInputContainerRef}
                style={{padding: "3rem 1.5rem 0 1.5rem"}}
                >
                    <Grid item xs={6} style={{textAlign:"end"}}>
                        <ApuestaInput
                            autoFocus
                            inputRef = {this.entryNumeroInputRef}
                            type = "number"                        
                            placeholder="Numero:"
                            id="input-entry-numero"
                            pattern="[0-9]*"
                            style={{marginRight:"0.375rem",maxWidth:"9.5rem"}}
                            InputProps={{
                                disableUnderline: true,   
                            }}
                            onInput={(e)=>{ 
                                e.target.value = e.target.value.toString().slice(0,2);
                                if(e.target.value.length == 2){
                                    this.entryUnidadesInputRef.current.focus();
                                }
                            }}
                        />    
                    </Grid>
                    <Grid item xs={6} style={{textAlign:"start"}}>
                        <ApuestaInput
                            inputRef = {this.entryUnidadesInputRef}
                            type="number"
                            placeholder="Cantidad:"
                            pattern="[1-9]*"
                            style={{marginLeft:"0.375rem",maxWidth:"9.5rem"}}
                            id="input-entry-unidad"
                            InputProps={{
                                disableUnderline: true, 
                            }}
                            onInput={(e)=>{ 
                                if(this.entryNumeroInputRef.current.value.toString().length < 2){
                                    this.entryNumeroInputRef.current.focus();
                                    this.entryUnidadesInputRef.current.value = "";
                                }
                            }}
                            onKeyPress={this.inpuntKeyPressedEvent}
                        />    
                    </Grid>
                </Grid>
                <Grid container spacing={0}
                      direction="row"
                      justify="center"
                      alignItems="center" style={{width:"100%"}}>
                    <ListaApuestas entryList={this.state.entryList} removerApuesta={this.removerApuesta} fromApuestaActiva={false}
                        displayApuestaListIndex={this.state.displayApuestaListIndex}/>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{textAlign:"center",color:"#999999",marginTop:"1.1875rem",marginBottom:"1.1875rem",lineHeight:"0.85"}}>
                            Total &mdash; {this.state.totalCurrent}
                        </Typography>  
                    </Grid>
                </Grid>
                <ResumenApuestas apuestaCurrency={this.apuestaCurrency} 
                    costoTotal={this.state.costoTotal} comisionTotal={this.state.comisionTotal} total={this.state.total}/>

                <Container maxWidth="sm" >
                    <Grid container spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        ref={this.buttonContainerApuestasRef}> 
                        <Grid item xs={12} className={this.classes.buttonContainerApuestas}>
                            <Grid item xs={4}>
                                <Button variant="contained"  className={this.classes.buttonLimpiar} onClick={this.limpiarApuestas}>
                                    <MdSettingsBackupRestore className={this.classes.extendedIcon} />
                                    Limpiar
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained"  className={this.classes.buttonComprar} onClick={this.handleComprar}>
                                    <FaShoppingCart className={this.classes.extendedIcon} />
                                    Comprar
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" className={this.classes.buttonAgregarApuesta} onClick={this.agregarApuesta}>
                                    <MdFileDownload className={this.classes.extendedIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        ref={this.buttonContainerComprarRef} > 
                        <Grid item xs={12} className={this.classes.buttonContainerApuestas}>
                            <Grid item xs={4}>
                                <Fab variant="extended" aria-label="removeAll" className={this.classes.buttonLimpiar} onClick={this.limpiarApuestas}>
                                    <MdSettingsBackupRestore className={this.classes.extendedIcon} />
                                        Limpiar
                                </Fab>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={6}>
                                <Fab variant="extended" aria-label="buyAll" className={this.classes.buttonFinalizarCompra} onClick={this.handleClickOpenFinalizarCompraDialog}>
                                    Finalizar Compra
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Dialog open={this.state.openFinalizarCompraDialog} onClose={this.handleCloseFinalizarCompraDialog}
                    aria-labelledby="alert-dialog-finalizar-compra"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-finalizar-compra">Compra de numeros</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Compra para el sorteo ${this.props.location.state.title.nombre} a las ${this.state.time}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseFinalizarCompraDialog} color="primary">
                                    Cancel
                        </Button>                                
                        <Button onClick={this.handleFinalizarCompra} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(AdicionarNumeroApuesta);