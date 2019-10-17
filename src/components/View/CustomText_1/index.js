import React from 'react';
import NumberFormat from 'react-number-format';

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
    return (
      <div className="container_custominput_1" style={{ width: this.props.width }}>
        <div className="icon-container">
          $ 1.00 =
        </div>
        <div className="text-container">
          <NumberFormat
            readOnly={this.props.readOnly}
            onInput={this.props.onInput}
            onChange={this.props.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            type={this.props.type}
            style={{ fontSize: this.props.fontSize }}
            autoComplete="off"
            ref={this.props.ref}
          />
        </div>
      </div>
    );
  }
}

export default CustomText;
