import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IoIosWarning } from "react-icons/io";

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  onConfirm() {
    this.props.onConfirm();
  }
  onCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onCancel}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          <div className="dialogTitle">
            <div style={{ textAlign: 'center' }}>
              <IoIosWarning size={60} style={{ color: 'red', marginTop: '15px', marginBottom: 13 }} />
            </div>
            <div style={{ fontSize: 25, textAlign: 'center' }}>
              Precaución
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: '17px', height: '70px' }}>
            Si se sale o refresca esta pagina, toda la información que ha digitado se perdera.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ margin: '0 auto', width: '100%' }} >
          <Button onClick={() => this.onConfirm()} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}>Aceptar</Button>
          <Button onClick={() => this.onCancel()} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
