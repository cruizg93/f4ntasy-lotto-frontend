import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircleNumber from "../../../Utils/CircleNumber/index";

class DoubleVerificationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(value) {
    this.props.handleClose(value);
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
          <div >
            <div style={{ textAlign: 'center', paddingBottom: 13 }}>
            </div>
            <div style={{ fontSize: titleFontSize }}>
              {this.props.title}
            </div>
          </div>
        </DialogTitle>
        <div className="custom_input_dialog_content" style={{ textAlign: 'center', height: contentHeight }}>
          <Grid className='content_text'>
            <Grid style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
              <CircleNumber numero={this.props.numero} width={'45px'} fontSize={'25px'}></CircleNumber>
            </Grid>
            {this.props.context.replace(',', '')}
          </Grid>
        </div>
        <DialogActions style={{ margin: '0 auto', width: '100%', maxWidth: 279 }}>
          <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }} autoFocus>Aceptar</Button>
          <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '17px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DoubleVerificationDialog;
