import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {adminService} from "../../../../service/api/admin/admin.service";
import {Colors} from '../../../../utils/__colors';
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
        display: 'flex',
        marginLeft: '1rem'
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
    },
    editarLink:{
        textDecoration: "none",          
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        padding: '1rem 10px 1rem 10px !important',       
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
        '&:hover':{
            cursor: "pointer"
        }
    },
    labelUser: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 !important',
       
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue,
    },
}));

const AsistenteDataShow = ({match, id, username, name, ...props}) => {
    const classes = useStyles();    
    const [open, setOpen] = useState(false);   

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

    return (
        <Grid item>  
                            
                <Grid container>
                    <Grid item xs={12}>
                            <Divider/>
                    </Grid>
                    <Grid item xs={8}
                            container
                            justify="flex-start"
                            direction="column"
                            className={classes.labelUser}
                            >         
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {username} 
                        </Typography>   
                        <Typography variant="body1" gutterBottom className={classes.text}>
                           {` [ ${name} ]`}{}  
                        </Typography>                                                                  
                    </Grid>
                    <Grid item xs={3}
                          container
                          justify="center"
                          className={classes.editarLink}
                        component={Link} to={
                            {
                                pathname: `/asistente/editar/${id}`,
                                state: {
                                    id: id,
                                }
                            }
                        }
                    >
                        Editar
                    </Grid>
                    <Grid item xs={1}
                              container
                              justify="center"
                              className={classes.svgContainer}

                        >
                            <FaTrashAlt className={classes.iconClose} onClick={handleClickOpen}/>
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
                </Grid>           
        </Grid>
    )
}
export default AsistenteDataShow;