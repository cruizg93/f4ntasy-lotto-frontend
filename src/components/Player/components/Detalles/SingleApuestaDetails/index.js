import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from "@material-ui/core/styles/index";
import { red } from "@material-ui/core/colors/index";
import { Colors } from "../../../../../utils/__colors";
import CircleNumber from "../../../../Utils/CircleNumber/index";
import { FaTrashAlt } from 'react-icons/fa';
import Button from "@material-ui/core/Button/index";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './styles.css'
import { playerService } from "../../../../../service/api/player/player.service"

const SingleApuestaDetails = ({ numero, valor, ...props }) => {

    const [open, setOpen] = useState(false);
    const numberValue = valor.toFixed(2)
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCloseAccept() {
        playerService.delete_apuesta_number(props.location.state.id, numero, props.userId).then((result) => {
            props.update();
            setOpen(false);
        })

    }

    return (
        <div className="singleApuestaDetails">
            <div item id={`text-${props.index}`} className='textNumber'>
                <p>{numero.toString().padStart(2, "0")}</p>
            </div>
            <div className='textValue'>
                <p id={`text-${props.index}`}>
                    {parseFloat(numberValue.toString())}
                </p>
            </div>
            <div className='removeIcon'>
                <FaTrashAlt className='iconClose' onClick={handleClickOpen} />
            </div>
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
                        handleCloseAccept();
                    }} color="primary" autoFocus>
                        Aceptar
                                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default SingleApuestaDetails;