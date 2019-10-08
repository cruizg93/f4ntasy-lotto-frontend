import React from 'react';
import { Grid, Container } from '@material-ui/core'
import { IoIosContact } from "react-icons/io";
import { IoIosContacts } from "react-icons/io";
import './styles.css';

class AdminTitle extends React.Component {

  render() {
    let iconName = this.props.iconName ? this.props.iconName : '';
    let fontSize = (this.props.fontSize) ? this.props.fontSize : "22px"
    return (
      <Container maxwidth="xs" className="admin_header" style={{ fontSize: fontSize }}>
        <Grid item xs={10} className="header_title">
          <span>{this.props.titleLabel === undefined ? "NEED VALUE: ERROR" : this.props.titleLabel}</span>
        </Grid>
        <Grid item xs={2} className="header_icon">
          {
            iconName === 'IoIosContacts' ? <IoIosContacts /> :
              iconName === 'IoIosContact' ? <IoIosContact size='37' /> : null
          }
        </Grid>
      </Container>
    );
  }
}

export default AdminTitle;