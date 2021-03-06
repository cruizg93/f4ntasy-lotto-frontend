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
    const Icon = this.props.icon;
    return (
      <div className="container_custominput" style={{ width: this.props.width }}>
        <div className="icon-container">
          {Icon ? <Icon size="24" color="lightgrey" /> : ' '}
        </div>
        <div className="text-container">
          {
            this.props.number ?
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
              /> :
              <input
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
          }

        </div>
      </div>
    );
  }
}

export default CustomText;
