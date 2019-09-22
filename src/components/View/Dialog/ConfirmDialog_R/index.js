import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FaLock, FaBan } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoIosHelpCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";


class ConfirmDialogR extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel(value) {
    this.props.handleClose(value);
  }

  render() {
    const icon = this.props.icon;
    console.log("icon", icon)
    return (
      <div className="container_rowList">
        <Grid container className="text_container" >
          <Dialog
            maxWidth="xs"
            minWidth="xs"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog-title">
              <div className="dialogTitle">
                <div style={{ textAlign: 'center' }}>
                  {
                    icon === 'help' ?
                      <IoIosHelpCircleOutline size={60} style={{ color: "#ff3333", paddingTop: '15px' }} /> :
                      <IoIosCheckmarkCircleOutline size={45} style={{ color: "#009933" }} />
                  }
                </div>
                <div style={{ fontSize: '25px' }}>
                  {this.props.title}
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ fontSize: '18px', height: '120px' }}>
                {this.props.context}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', margin: '0 auto', width: '78%' }}>
              <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '18px', color: '#5891DC' }}>Cancelar</Button>
              <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '18px', color: '#5891DC' }} autoFocus>Aceptar</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default ConfirmDialogR;
