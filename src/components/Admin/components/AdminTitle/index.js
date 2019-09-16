import React from 'react';

import './styles.css';

class AdminTitle extends React.Component {
  render() {
    return (
      <div className="admin_header">
        <span>{this.props.titleLabel === undefined ? "NEED VALUE: ERROR" : this.props.titleLabel}</span>
      </div>
    );
  }
}

export default AdminTitle;