import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Currency} from '../../../../utils/__currency';
import {formatCurrency} from '../../../../utils/__currency';

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
import { MainStyles } from '../../../View/MainStyles';
import { FaUserTimes} from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";

import Tooltip from '@material-ui/core/Tooltip';

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
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    valuesContainer:{
        paddingTop:".5rem",
        "& div p":{
            paddingBottom:".5rem",
        }
    },
    text: {
        display: 'flex',
        justifyContent: 'flex-start',
        color:'#000000',
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
        justifyContent: 'flex-end',
        textAlign:"right",
        marginRight: '.5rem',
        color: '#000000'
    },
    svgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
    },
    iconClose: {
        margin: "auto",
        color: Colors.Btn_Red,
        fontSize: "1.75rem",
        '&:hover':{
            cursor: "pointer"
        }        
    },
    iconEdit: {
        margin: "auto",
        color: Colors.Green,
        fontSize: "1.75rem",
        '&:hover':{
            cursor: "pointer"
        }        
    },
    iconWarning: {
        margin: "auto",
        color: Colors.Orange,
        fontSize: "1.75rem",
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
        border:"#afb6b8 1px solid",
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
        background: Colors.Main,
        "& p":{
            height:"25px"
        }
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
        /*padding: '5px 10px 5px 10px',*/
        /*margin: '0.15rem',*/
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    labelUserDisable: {
        pointerEvents: 'none',
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        /*padding: '1rem 10px 1rem 10px',        */
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
    editarLink:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        /*padding: '1rem 10px 1rem 10px',        */
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
        marginTop: '.5rem',
        marginLeft: '.5rem',
        marginRigth: '.5rem',
        color: Colors.Btn_Blue,
        textAlign:"center",
        display:"flex",
        alignItems: 'center',
        justifyContent: 'center',        
        '&:hover':{
            cursor: "pointer"
        }
    },

}));

const StyleExpansionPanelSummary = withStyles(() => ({
    root:{
        minHeight:"54px !important"
    },
    expanded: {
        margin: "0px !important",
        '& div':{
            margin: "0px !important",  
            padding:  "0px !important",  
        }
    }
  }))(ExpansionPanelSummary);

const JugadorDataShow = ({match, balance, comision, id, monedaType, riesgo, total, username, name, asistentes, ...props}) => {
    const classes = useStyles();
    const [monedaSymbol, setMonedaSymbol] = useState('$');

    const [open, setOpen] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);   
    const [asignedAsistentes, setAsignedAsistentes]= React.useState([]);

    const symbol = balance < 0 ? " - " : (balance > 0 ? " + " : "")
    const apuestaCurrency = monedaType === "lempiras"?Currency.Lempiras:Currency.Dollar;

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
        setMonedaSymbol(apuestaCurrency.symbol);
        if(asistentes)
            setAsignedAsistentes(Array.from(asistentes))
    }, [asistentes, monedaType])
    return (
        <Grid container spacing={0}
            direction="row"
            justify="center"
            alignItems="stretch"
            style={MainStyles.boxContainer}
            >
            <Grid container>
                <Grid item xs={6} className={total===0.0?classes.labelUser:classes.labelUser}
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
                    <Tooltip title={name}>
                        <div style={{display:"flex",alignItems:"stretch",justifyContent: "center"}}>
                            <Typography variant="body1" gutterBottom className={"form__center-label"} 
                                style={ {
                                    color: Colors.Btn_Blue_Dark,  
                                    display: "inline-block",
                                    whiteSpace:"nowrap"    
                                }}>
                                {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}
                            </Typography>
                            <Typography variant="body1" gutterBottom className={"form__center-label"} 
                                style={ {
                                    color: Colors.Btn_Blue_Dark,  
                                    display: "inline-block",
                                    whiteSpace:"nowrap"    
                                }}>
                                {"["}{name.length>15?name.substring(0,9):name}{"]"}
                            </Typography>
                        </div>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}
                    justify="center"
                    className={classes.svgContainer}
                    >
                        <FaAddressCard className={classes.iconWarning} onClick={handleClickOpen}/>
                </Grid>
                <Grid item xs={2} className={classes.svgContainer} style={{borderLeft:"#afb6b8 1px solid", borderRight:"#afb6b8 1px solid"}}
                    component={Link} to={
                        {
                            pathname: `/jugador/editar/${id}`,
                            state: {
                                id: id,
                            }
                        }
                    }
                >
                    <FaRegEdit className={classes.iconEdit} onClick={handleClickOpen}/>
                </Grid>
                <Grid item xs={2}
                            justify="center"
                            className={classes.svgContainer}
                    >
                        <FaUserTimes className={classes.iconClose} onClick={handleClickOpen}/>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>   
            </Grid>
            <Grid container >
                <Grid item container xs={7} alignItems="flex-start" className={classes.valuesContainer}>
                    <Grid item xs={4} justify="flex-end">
                        <Typography variant="body1"  className={classes.textLabel}>
                            Ventas 
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1"  className={classes.text}>
                            {monedaSymbol} {total.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}
                        justify="flex-end">
                        <Typography variant="body1"  className={classes.textLabel}>
                            Com.
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1"  className={classes.text}>
                            {monedaSymbol} {comision.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} justify="flex-end">
                        <Typography variant="body1"  className={classes.textLabel}>
                            Total 
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1"  className={classes.text}>
                            {monedaSymbol} {riesgo.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

                <   Grid item container xs={5} justify="center" style={{borderLeft:"#afb6b8 1px solid"}}>
                    <Grid item xs={12} className={classes.balanceLink}
                        component={Link} to={
                            {
                                pathname: `/jugador/balance/${id}`,
                                state: {
                                    // list: entry,
                                    id: id,
                                    // title: props.location.state.title
                                },
                            }
                        }>
                        <Typography variant="body1" gutterBottom style={{color:"#000000"}}>
                            Balance 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="body1" gutterBottom className={balance < 0 ? classes.textNegative : (balance > 0 ? classes.textPositive : classes.text) }
                            style={{justifyContent:"center"}}>
                            {monedaSymbol} {symbol} {balance.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>    
            </Grid>
        
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

        {asistentes && 
            <>   
                <Grid item xs={12}><Divider/></Grid>                                                
                <Grid item xs={12}>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}
                        TransitionProps={{unmountOnExit: true}} className={classes.expansionPanel}>
                        <StyleExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"                                       
                        >
                            <Typography variant="body1" gutterBottom className={classes.expansionPanelTextHeader} >
                                {asignedAsistentes.length}{" Jugadores X"} 
                            </Typography>     
                        </StyleExpansionPanelSummary>
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
    )

}

export default JugadorDataShow;