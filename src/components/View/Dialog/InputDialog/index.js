import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    fontSize: '0.9rem'
  }
};

class InputDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: '',
      password: '',
      showPassword: false
    }
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(value) {
    if (value === true) {
      if (this.state.numero === '' || this.state.numero < 0 || this.state.password === '')
        return;
    }
    this.props.handleClose(this.state.numero, value, this.state.password);
  }

  handleChangeNumeroGanador = (e) => {
    const twoDigitRegExp = new RegExp('^[0-9]{2}$');
    if (e.target.value === '' || twoDigitRegExp.test(e.target.value)) {
      this.setState({
        ...this.state,
        numero: e.target.value
      })
    }
  }

  handleChangeAdminPassword = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  componentWillReceiveProps() {
    this.setState({
      numero: '',
      password: '',
      showPassword: false
    })
  }

  render() {
    // const icon = this.props.icon;
    const titleFontSize = this.props.titleFontSize ? this.props.titleFontSize : '25px';
    // const contentFontSize = this.props.contentFontSize ? this.props.contentFontSize : '18px';
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
            </div>
            <div style={{ fontSize: titleFontSize }}>
              {this.props.title}
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="custom_input_dialog_content" style={{ maxWidth: 279 }}>
          <DialogContentText id="alert-dialog-description" style={{ height: contentHeight }}>
            <Grid className='content_text'>
              {this.props.context.replace(',', '')}
            </Grid>
            <Grid className="input_winNum">
              <NumberFormat
                id="numero-ganador-input"
                label="Número ganador"
                placeholder="Número ganador(0-99)"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.numero}
                allowNegative={false}
                format="##"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: this.props.classes.someTextField } }}
                customInput={TextField}
                onChange={(e) => this.handleChangeNumeroGanador(e)}
                autocomplete="off"
              />
              <input name="DummyUsername" type="text" style={{ display: 'none' }} />
              <input name="DummyPassword" type="password" style={{ display: 'none' }} />
            </Grid>
            <Grid className="input_admin_password">
              <TextField
                id="numero-ganador-input_password"
                label="Contraseña Admin"
                placeholder="Contraseña"
                margin="normal"
                variant="outlined"
                fullWidth
                value={this.state.password}
                type={this.state.showPassword ? 'text' : 'password'}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: this.props.classes.someTextField } }}
                customInput={TextField}
                onChange={(e) => this.handleChangeAdminPassword(e)}
                autocomplete="off"
              />

              <Button className="show_btn" onClick={() => this.handleClickShowPassword()}>
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
              </Button>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ margin: '0 auto', width: '100%' }}>
          <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }} >Aceptar</Button>
          <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InputDialog);
