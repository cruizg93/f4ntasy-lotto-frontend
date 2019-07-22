import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import HighlightOff from "@material-ui/icons/HighlightOff";


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
import {adminService} from "../../../../service/api/admin/admin.service";

const AsistButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffe634',
        borderColor: 'none',
        color: '#FFF',
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
    },
    iconClose: {
        margin: '0 auto',
        display: 'block',
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }

}));

const AsistenteDataShow = ({match, id, username, name, ...props}) => {
    const classes = useStyles();    
    const [open, setOpen] = React.useState(false);   

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
    

    useEffect(() => {
      
    }, [])
    return (

        <Grid item xs={12}>            
                <Grid container spacing={3}>
                    <Grid item xs={5}
                            container
                            justify="center"
                            direction="column"
                            >         
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {username} {` (${name})`}{}  
                        </Typography>                                                                     
                    </Grid>
                    <Grid item
                          container
                          xs={6}>

                        <Grid item xs={7}
                              container
                              justify="center"
                        >
                            <AsistButton variant="outlined" color="primary" className={classes.button}
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
                            </AsistButton>
                        </Grid>
                        <Grid item xs={3}
                              container
                              justify="center"
                              className={classes.svgContainer}

                        >
                            <HighlightOff className={classes.iconClose} onClick={handleClickOpen}/>
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
        </Grid>
    )
}
export default AsistenteDataShow;