import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircleNumber from "../../../Utils/CircleNumber/index";
import { FaLock, FaBan } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoIosHelpCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";


class ConfirmNumWinDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel(value) {
    this.props.handleClose(value);
  }

  render() {
    const icon = this.props.icon;
    const titleFontSize = this.props.titleFontSize ? this.props.titleFontSize : '21px';
    const contentFontSize = this.props.contentFontSize ? this.props.contentFontSize : '18px';
    const contentHeight = this.props.contentHeight ? this.props.contentHeight : '80px';
    return (
      <div className="container_rowList">
        <Grid container className="text_container" >
          <Dialog
            disableBackdropClick
            maxwidth="xs"
            minwidth="xs"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog-title" style={{ paddingBottom: 0, maxWidth: 279 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ fontSize: titleFontSize, paddingTop: 16, lineHeight: '26px' }}>
                  {this.props.title}
                </div>
                <div style={{ textAlign: 'center', paddingBottom: 13 }}>
                  {
                    icon === 'help' ?
                      <IoIosHelpCircleOutline size={60} style={{ color: "#ff3333", paddingTop: '15px' }} /> :
                      <IoIosCheckmarkCircleOutline size={45} style={{ color: "#009933" }} />
                  }
                </div>
              </div>
            </DialogTitle>
            <DialogContent style={{ alignSelf: 'center', maxWidth: 279 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircleNumber numero={this.props.numero} width={'45px'} fontSize={'25px'}></CircleNumber>
              </div>
              <div style={{ color: '#19B000', paddingBottom: 20, paddingTop: 10 }}>
                <span style={{ fontSize: '18px' }}>{this.props.type} - </span>
                <span style={{ fontSize: '16px' }}>{this.props.time} - {this.props.day.replace(',', '')}</span>
              </div>
            </DialogContent>
            <DialogActions style={{ margin: '0 auto', width: '100%' }}>
              <Button onClick={() => this.handleCancel(true)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }} autoFocus>Aceptar</Button>
              <Button onClick={() => this.handleCancel(false)} style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default ConfirmNumWinDialog;
