import React from 'react';

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
    console.log('props', this.props.ref)
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
