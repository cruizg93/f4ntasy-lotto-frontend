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
import { GiInfo } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { IoIosWarning } from "react-icons/io";
import { IoIosHelpCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";


class InformationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel(value) {
    this.props.handleClose(value);
  }

  render() {
    const icon = this.props.icon;
    const iconSize = this.props.iconSize ? this.props.iconSize : 60;
    const titleFontSize = this.props.titleFontSize ? this.props.titleFontSize : '25px';
    const contentFontSize = this.props.contentFontSize ? this.props.contentFontSize : '25px';
    const contentHeight = this.props.contentHeight ? this.props.contentHeight : '90px'
    return (
      <div className="container_rowList">
        <Grid container className="text_container" >
          <Dialog
            maxwidth="xs"
            minwidth="xs"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
          >
            <DialogTitle id="confirmation-dialog-title">
              <div className="dialogTitle">
                <div style={{ textAlign: 'center' }}>
                  {
                    icon === 'faLock' ?
                      <FaLock size={iconSize} style={{ color: "#ff3333", paddingTop: '15px', paddingBottom: 20 }} /> :
                      icon === 'faBan' ?
                        <FaBan size={iconSize} style={{ color: "#663399", paddingTop: '15px', paddingBottom: 20 }} /> :
                        icon === 'giInfo' ?
                          <GiInfo size={iconSize} style={{ color: "#ff3333", paddingTop: '15px', paddingBottom: 13 }} /> :
                          icon === 'info' ?
                            <GoVerified size={iconSize} style={{ color: "#009933", paddingTop: '15px', paddingBottom: 13 }} /> :
                            icon === 'ioIosWarning' ?
                              <IoIosWarning size={iconSize} style={{ color: "#ff3333", paddingTop: '15px', paddingBottom: 13 }} /> :
                              <IoIosCheckmarkCircleOutline size={iconSize} style={{ color: "#ff3333", paddingTop: '15px', paddingBottom: 13 }} />
                  }
                </div>
                <div style={{ fontSize: titleFontSize }}>
                  {this.props.title}
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ fontSize: contentFontSize, height: contentHeight }}>
                {this.props.context}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', margin: '0 auto', width: '78%' }}>
              <Button onClick={() => this.handleCancel()} style={{ fontSize: '18px', color: '#5891DC' }}>OK</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

export default InformationDialog;
