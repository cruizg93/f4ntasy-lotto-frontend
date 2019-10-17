import React from 'react';
import { Grid, Container } from '@material-ui/core'
import { FaFileExcel } from "react-icons/fa";
// import { IoIosContact } from "react-icons/io";
// import { IoIosContacts } from "react-icons/io";
import './styles.css';

class DetailTitle extends React.Component {

  render() {
    return (
      <Container maxwidth="xs" className="detail_header">
        <Grid item xs={7} className="header_title">
          <span>{this.props.titleLabel === undefined ? "NEED VALUE: ERROR" : this.props.titleLabel}</span>
        </Grid>
        <Grid item xs={5} className="header_icon">
          <FaFileExcel />
        </Grid>
      </Container>
    );
  }
}

export default DetailTitle;