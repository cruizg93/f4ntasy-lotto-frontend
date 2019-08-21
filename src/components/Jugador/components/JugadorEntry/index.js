import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AsistenteDataShow from '../AsistenteEntry/index';
import {adminService} from "../../../../service/api/admin/admin.service";
import { Colors } from '../../../../utils/__colors';
import {FaTrashAlt} from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexGrow: 1,
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
    text: {
        display: 'flex'
    },
    textPositive: {
        display: 'flex',
        color: Colors.Green
    },
    textNegative: {
        display: 'flex',
        color: Colors.Btn_Red
    },
    textLabel: {
        display: 'flex',
        marginRight: '.5rem'
    },
    svgContainer: {
        display: 'flex',
        alignItems: 'center',
        color: Colors.Btn_Blue
    },
    iconClose: {
        margin: '0 auto',
        display: 'block',
        color: Colors.Btn_Red,
        '&:hover':{
            cursor: "pointer"
        }        
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",
    },
    paperDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paperUser: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '3rem',
    },
    paperUserDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '3rem',
    },
    paperBalance: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',

    },
    paperBalanceDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
    },
    expansionPanel:{
        boxShadow: 'none',
        background: Colors.Main
    },
    expansionPanelTextHeader:{      
        marginLeft: '2rem',
        color: Colors.Gray_Ligth
    },
    expansionPanelBody:{      
        display: 'block',
        padding: "0 !important"
    },
    labelUser: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '1rem',
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    labelUserDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1rem 10px 1rem 10px',        
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    editarLink:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1rem 10px 1rem 10px',        
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
        '&:hover':{
            cursor: "pointer"
        }
    },
    balanceLink:{
        textDecoration: "none",
        pointerEvents: 'none',       
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '.5rem',        
        color: Colors.Btn_Blue,
        '&:hover':{
            cursor: "pointer"
        }
    },

}));

const JugadorDataShow = ({match, balance, comision, id, monedaType, riesgo, total, username, name, asistentes, ...props}) => {
    const classes = useStyles();
    const [monedaSymbol, setMonedaSymbol] = useState('$');

    const [open, setOpen] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);   
    const [asignedAsistentes, setAsignedAsistentes]= React.useState([]);

    const symbol = balance < 0 ? " - " : (balance > 0 ? " + " : "")

    const handler = props.handler;
    const toast = props.toast;


    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function deletePlayer() {
        adminService.delete_player_by_id(id).then((result) => {
            if(result.data === "Apuestas"){
                toast("fail");
            }else{                
                handler();
            }            
        })
    }      

    const handleChangeExpand = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    useEffect(() => {
        if (monedaType === "lempiras") {
            setMonedaSymbol('L')
        }
        if(asistentes)
            setAsignedAsistentes(Array.from(asistentes))
    }, [asistentes, monedaType])
    return (

        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={6} 
                    className={total === 0 ? classes.labelUserDisable : classes.labelUser}
                        component={Link} to={
                            {
                            pathname: `/jugador/apuestas/detalles`,
                                state: {
                                    id: id,
                                    username: username
                                }
                            }
                        }
                    >
                        {username} {" - "}{monedaSymbol} {"  "} {name}
                    </Grid>
                    <Grid item xs={3} className={classes.editarLink}
                        component={Link} to={
                            {
                                pathname: `/jugador/editar/${id}`,
                                state: {
                                    id: id,
                                }
                            }
                        }
                    >
                        Editar
                    </Grid>
                    <Grid item xs={2}
                              container
                              justify="center"
                              className={classes.svgContainer}

                        >
                            <FaTrashAlt className={classes.iconClose} onClick={handleClickOpen}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>        
                    <Grid item xs={12} sm={6}
                              container
                              justify="center"                         
                              className={classes.margin}
                        >
                            <Grid item xs={7}
                                  container
                                  justify="flex-end">
                                <Typography variant="body1" gutterBottom className={classes.textLabel}>
                                    apuestas 
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {total.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={7}
                                  container
                                  justify="flex-end">
                                <Typography variant="body1" gutterBottom className={classes.textLabel}>
                                    comisiones 
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {comision.toFixed(2)}
                                </Typography>
                            </Grid>

                            <Grid item xs={7}
                                  container
                                  justify="flex-end"
                            >
                                <Typography variant="body1" gutterBottom className={classes.textLabel}>
                                    riesgo 
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    {monedaSymbol} {riesgo.toFixed(2)}
                                </Typography>
                            </Grid>
                    </Grid>

                    <Grid item xs={12} sm={5}
                              container
                              justify="center"                         
                              className={classes.margin}
                        >
                            <Grid item xs={10}
                                  container
                                  justify="center"
                                  className={classes.balanceLink}
                                  component={Link} to={
                                    {
                                        pathname: `/jugador/balance/${id}`,
                                        state: {
                                            // list: entry,
                                            id: id,
                                            // title: props.location.state.title
                                        }
                                    }
                                }
                                  
                                  >
                                <Typography variant="body1" gutterBottom >
                                    Balance 
                                </Typography>
                            </Grid>
                            <Grid item xs={10}
                                 container
                                 justify="center"
                            >
                                <Typography variant="body1" gutterBottom className={balance < 0 ? classes.textNegative : (balance > 0 ? classes.textPositive : classes.text) }>
                                    {monedaSymbol} {symbol} {balance.toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>                 

                    <Grid item
                          container
                          xs={6}>

                        
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-eliminar-usuario"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-eliminar-usuario">{`Deseas eliminar usuario ${username}`}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Una vez eliminado el usuario no podrá obtener los datos generados del mismo
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button onClick={() => {
                                    handleClose();
                                    deletePlayer();

                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </Dialog>
                        
                    </Grid>
                    {asistentes && 
                        <>                                                   
                            <Grid item xs={12}
                            
                            >
                                <Divider/>
                                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}
                            TransitionProps={{unmountOnExit: true}} className={classes.expansionPanel}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"                                       
                                    >
                                       <Typography variant="body1" gutterBottom className={classes.expansionPanelTextHeader} >
                                            {asignedAsistentes.length}{" Jugadores X asignados"} 
                                        </Typography>     

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className={classes.expansionPanelBody}> 

                                        {asignedAsistentes.map((asistente, index)=>
                                            <AsistenteDataShow key={index} {...asistente} {...props} />
                                        )}
                                    
                                    </ExpansionPanelDetails>
                                 </ExpansionPanel>
                                
                            </Grid>
                        </>
                    }
                    
                </Grid>
            </Paper>
        </Grid>
    )

}

export default JugadorDataShow;