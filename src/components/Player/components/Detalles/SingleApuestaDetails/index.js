import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from "@material-ui/core/styles/index";
import {red} from "@material-ui/core/colors/index";
import {Colors} from "../../../../../utils/__colors";
import CircleNumber from "../../../../Utils/CircleNumber/index";
import {FaTrashAlt} from 'react-icons/fa';
import Button from "@material-ui/core/Button/index";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {playerService} from "../../../../../service/api/player/player.service"

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
        padding: '5px',
        textAlign: 'center'
    },
    textNumber: {
        fontWeight: 'bold',
        width: '60px',
        padding: '0 .5rem',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    },
    textMoneda: {
        fontWeight: 'bold',
        marginTop: ".5rem",
        textAlign: 'center',
    },
    iconClose: {
        margin: '0 auto',
        display: 'block',
        color: Colors.Btn_Red,
        '&:hover':{
            cursor: "pointer"
        }  
    },

}));
const SingleApuestaDetails=({numero, valor, ...props})=>{
    const classes = useStyles();

    const [open, setOpen] = useState(false);  
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        playerService.delete_apuesta_number(props.location.state.id, numero, props.userId).then((result)=>{
            props.update();
            setOpen(false);
        })
        
    }

    console.log(props)
    return (
        <React.Fragment>
             <Grid item xs={4}
                  container
                  justify="flex-end"
                   spacing={1}
            >
                <Grid item id={`text-${props.index}`} className={classes.textNumber }>
                    
                    <CircleNumber numero={numero}/>                  
                    
                    
                </Grid>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  spacing={1}
            >
                <Typography variant="body1" gutterBottom className={classes.textMoneda}>
                    
                </Typography>
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.negative}>
                    {" "}{valor.toFixed(2)}
                </Typography>
            </Grid>
           
            <Grid item xs={2}
                  container
                  justify="center"
                  spacing={1}
            >
                 <FaTrashAlt className={classes.iconClose} onClick={handleClickOpen}/>
            </Grid>
            <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-eliminar-numero"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-eliminar-numero">{`Deseas eliminar el numero ${numero}`}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Una vez eliminado el número no podrá recuperarlo
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
        </React.Fragment>
    )
};

export default SingleApuestaDetails;