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
    return (
      <div className="container_rowList">
        <Grid container className="text_container" >
          <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog-title">
              <div className="dialogTitle">
                <div style={{ textAlign: 'center', paddingBottom: 13 }}>
                  {
                    icon === 'help' ?
                      <IoIosHelpCircleOutline size={60} style={{ color: "#ff3333", paddingTop: 15 }} /> :
                      <IoIosCheckmarkCircleOutline size={60} style={{ color: "#009933", paddingTop: 15 }} />
                  }
                </div>
                <div style={{ fontSize: '25px' }}>
                  {this.props.title}
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ fontSize: '18px', height: 70 }}>
                {this.props.context}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ margin: '0 auto', width: '100%' }}>
              <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
              <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }} autoFocus>Aceptar</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default ConfirmDialogR;
