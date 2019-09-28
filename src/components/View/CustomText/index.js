import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MdSettings } from "react-icons/md";
import { IoIosHelpCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";

import './styles.css'

class CustomText extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel(value) {
    this.props.handleClose(value);
  }

  render() {
    const Icon = this.props.icon;
    return (
      <div className="container_custominput" style={{ width: this.props.width }}>
        <div className="icon-container">
          {Icon ? <Icon size="24" color="lightgrey" /> : ' '}
        </div>
        <div className="text-container">
          <input
            readOnly={this.props.readOnly}
            onInput={this.props.onInput}
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            onChange={this.props.onChange}
            type={this.props.type}
            style={{ fontSize: this.props.fontSize }}
          // autoComplete="off"
          />
        </div>
      </div>
    );
  }
}

export default CustomText;
