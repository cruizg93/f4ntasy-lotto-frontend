import React from 'react';
import { Grid, Container } from '@material-ui/core'
import './styles.css';

class AdminTitle extends React.Component {
  render() {
    return (
      <Grid item maxWidth="xs" className="admin_header">
        <span>{this.props.titleLabel === undefined ? "NEED VALUE: ERROR" : this.props.titleLabel}</span>
      </Grid>
    );
  }
}

export default AdminTitle;