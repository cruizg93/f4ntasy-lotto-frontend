import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles/index";
import NumberFormat from 'react-number-format';
import {red} from "@material-ui/core/colors/index";
import {FaTrashAlt} from 'react-icons/fa';
import Button from '@material-ui/core/Button';

import './ApuestaActiva.css';
import { Colors } from '../../../../utils/__colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    item: {
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
        color: red[400]
    },
    deleteIcon:{
        background: Colors.Btn_Red,
        color: Colors.Input_bkg,
        width: "1.5rem",
        height: "1.5rem",
        padding: ".2rem",
        '&:hover':{
            cursor: "pointer"
        }
    }

}));
const ApuestaActivaEntry = ({numero, valor, disable, ...props}) => {
    const classes = useStyles();   
    const [open, setOpen] = React.useState(false);  
    const eventId= props.index; 
    const update = props.update;

    

    function handleClickOpen(e) {       
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    } 
    function handleCloseAccept() {
        props.delete(eventId);
        setOpen(false);
        update();
        /* props.history.push("/");
        return () => {
            props.mounted.current = false;
        };    */     
    } 
    return (
        <>
         <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-crear-usuario"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-crear-usuario">Desea eliminar la apuesta al número {numero}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Una vez eliminada la apuesta no podrá recuperarla`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>      
                    <Button onClick={handleClose} color="primary">
                                Cancel
                    </Button>                           
                    <Button onClick={() => {
                        handleCloseAccept();  
                    }} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid item xs={4}
                  container
                  justify="flex-end"
            >
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.text}>
                    {numero}
                </Typography>
            </Grid>
            <Grid item xs={3}
                  container
                  justify="flex-start"
            >
                <NumberFormat
                    id={`user-apuesta-data-${props.index}`}
                    placeholder="Número"
                    margin="normal"
                    variant="outlined"
                    style={{marginRight: 50, width: 150}}
                    className={valor > 0 ? classes.root : classes.negative}
                    value={valor}
                    disabled={disable}
                    onBlur={props.onEdit}
                />
            </Grid>
            <Grid item xs={4}
                  container
                  justify="flex-start"
            >
                <FaTrashAlt id={`delete-apuesta-activa-valor-${props.index}`} className={`${classes.deleteIcon} form__center-label` }
                    onClick={handleClickOpen}
                />
            </Grid>
        </>
    )
};


export default ApuestaActivaEntry;