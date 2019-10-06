import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from "@material-ui/core/styles";

import './styles.css'

const styles = {
  someTextField: {
    minHeight: 10,
    maxHeight: 10,
    fontSize: '1rem'
  }
};

class InputBonoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bono: '',
      password: '',
    }
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(value) {
    if (value === true) {
      if (this.state.bono === '' || this.state.bono < 0 || this.state.password === '')
        return;
    }
    this.props.handleClose(this.state.bono, value, this.state.password);
  }

  handleChangeBono = (e) => {
    this.setState({
      ...this.state,
      bono: e.target.value
    })
  }

  handleChangeAdminPassword = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  render() {
    return (
      <Dialog
        disableBackdropClick
        maxwidth="xs"
        minwidth="xs"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div className="bono-dialog-title">
          <img src={this.props.icon} />
          <span>
            {this.props.title}
          </span>
        </div>
        <DialogContent className="admin_bono_dialog_content">
          <Grid className='content_text'>
            {this.props.context}
          </Grid>
          <Grid className="days">
            {this.props.days}
          </Grid>
          <Grid className="input_bono">
            <NumberFormat
              id="bono-admin-input"
              label="Cantidad bono"
              placeholder="Cantidad bono"
              margin="normal"
              variant="outlined"
              fullWidth
              value={this.state.bono}
              allowNegative={false}
              format="#######"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: this.props.classes.someTextField } }}
              customInput={TextField}
              onChange={(e) => this.handleChangeBono(e)}
              autoComplete="off"
            />
            <input name="DummyUsername" type="text" style={{ display: 'none' }} />
            <input name="DummyPassword" type="password" style={{ display: 'none' }} />
          </Grid>
          <Grid className="input_admin_password">
            <TextField
              id="bono-ganador-input_password"
              label="Contraseña Admin"
              placeholder="Contraseña"
              margin="normal"
              variant="outlined"
              fullWidth
              value={this.state.password}
              type='password'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ classes: { input: this.props.classes.someTextField } }}
              onChange={(e) => this.handleChangeAdminPassword(e)}
              autoComplete="off"
            />
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: '0 auto', width: '100%' }}>
          <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }} autoFocus>Aceptar</Button>
          <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InputBonoDialog);
