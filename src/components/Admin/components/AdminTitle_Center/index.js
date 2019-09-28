import React from 'react';
import { Grid, Container } from '@material-ui/core'
import './styles.css';

class AdminTitle extends React.Component {

  render() {
    return (
      <Container maxidth="xs" className="admin_header_center">
        <Grid item xs={10} className="header_title">
          <span>{this.props.titleLabel === undefined ? "NEED VALUE: ERROR" : this.props.titleLabel}</span>
        </Grid>
      </Container>
    );
  }
}

export default AdminTitle;