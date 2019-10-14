import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { FaLock, FaBan } from "react-icons/fa";
// import { GoVerified } from "react-icons/go";
import { IoIosHelpCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";


class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel(value) {
    this.props.handleClose(value);
  }

  render() {
    const icon = this.props.icon;
    const titleFontSize = this.props.titleFontSize ? this.props.titleFontSize : '25px';
    const contentFontSize = this.props.contentFontSize ? this.props.contentFontSize : '18px';
    const contentHeight = this.props.contentHeight ? this.props.contentHeight : '80px';
    return (
      <Dialog
        disableBackdropClick
        maxwidth="xs"
        minwidth="xs"
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title" style={{ maxWidth: 279 }}>
          <div className="dialogTitle">
            <div style={{ textAlign: 'center', paddingBottom: 13 }}>
              {
                icon === 'help' ?
                  <IoIosHelpCircleOutline size={60} style={{ color: "#ff3333", paddingTop: '15px' }} /> :
                  <IoIosCheckmarkCircleOutline size={45} style={{ color: "#009933" }} />
              }
            </div>
            <div style={{ fontSize: titleFontSize }}>
              {this.props.title}
            </div>
          </div>
        </DialogTitle>
        <DialogContent style={{ maxWidth: 279 }}>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: contentFontSize, height: contentHeight }}>
            {this.props.context}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ margin: '0 auto', width: '100%' }}>
          <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }} >Aceptar</Button>
          <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
