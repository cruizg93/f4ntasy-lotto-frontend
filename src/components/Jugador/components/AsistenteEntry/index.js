import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/index";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { adminService } from "../../../../service/api/admin/admin.service";
// import { TiPen } from "react-icons/ti";
import { GoTrashcan } from "react-icons/go";

import "./styles.css";

const AsistenteDataShow = ({ match, id, username, name, ...props }) => {
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
            if (result.data === "Apuestas") {
                toast("fail");
            } else {
                handler();
            }
        })
    }

    return (
        <Grid container style={{ lineHeight: '39px' }} className="container_expand">
            <Grid className="labelUser" style={{ flex: 4, textAlign: 'left' }}>
                <Typography className="form_center-label expand_labelText" >
                    {username} {' ['} {name} {']'}
                </Typography>
            </Grid>
            <Grid className="grid_goTranhcan" style={{ textAlign: 'left', paddingLeft: '3em' }} >
                <GoTrashcan style={{ color: "#AEAEAE" }} onClick={handleClickOpen} />
            </Grid>
            <Dialog
                disableBackdropClick
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

                    }} color="primary" >
                        Aceptar
                        </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default AsistenteDataShow;