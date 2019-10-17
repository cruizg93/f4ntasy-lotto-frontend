import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormatNumberSymbol } from '../../../utils/__currency';

import './styles.css';

class RowList extends React.Component {
  render() {
    return (
      <Grid container maxwidth="xs" className="container_rowList">
        <Grid container maxwidth="xs" className="text_container" >
          <Grid item xs={5} className="text_label">
            {
              this.props.col_1.map((entry, index) => <span key={index}>{entry}{'\u00A0'}<br /></span>)
            }
          </Grid>
          <Grid item xs={1} className="text_symbol">
            {
              this.props.col_1.map((entry, index) => <span key={index}>{this.props.symbol}{'\u00A0'}<br /></span>)
            }
          </Grid>
          <Grid item xs={6} className="text_value" style={{ paddingLeft: 10 }}>
            <div className="left">
              {
                this.props.col_2.map((entry, index) => <span key={index}>{FormatNumberSymbol(entry)}<br /></span>)
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default RowList;
