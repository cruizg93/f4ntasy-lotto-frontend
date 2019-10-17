import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';
import './styles.css'
import { playerService } from "../../../../../service/api/player/player.service"

const SingleApuestaDetails = ({ numero, valor, ...props }) => {
    const [open, setOpen] = useState(false);
    const numberValue = valor.toFixed(2)
    function handleClickOpen() {
        setOpen(true);
    }
    function handleClose(value) {
        setOpen(false);
        if (value === true) {
            if (props.userid) {
                playerService.delete_apuestas_activas_detallesX_sorteoAndNumeroAndJugador(props.location.state.id, props.userid, numero).then((result) => {
                    props.update();
                })
            } else {
                playerService.delete_apuestas_activas_sorteoAndNumeroAndJugador(props.location.state.id, numero).then((result) => {
                    props.update();
                })
            }
        }
    }
    return (
        <div className="singleApuestaDetails">
            <div id={`text-${props.index}`} className='textNumber'>
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
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                title={'Eliminar?'}
                context={'Esta seguro que quiere eliminar estas compras?'}
                icon='help'>
            </ConfirmDialog>
        </div>
    )
};

export default SingleApuestaDetails;