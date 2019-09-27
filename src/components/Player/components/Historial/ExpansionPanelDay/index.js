import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons'
import { FormatCurrencySymbol } from '../../../../../utils/__currency';
import ListHistoryDetail from '../ListHistoryDetail'
import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import './styles.css'

const ExpanionPanelDay = (props) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log('props11', props)

  return (
    <Grid container maxwidth='xs' className="time_text_valor">
      <Grid item xs={12} >
        <ExpansionPanel onChange={handleChangeExpand('panel1')}
          TransitionProps={{ unmountOnExit: true }} className="expansionPanel_day">
          <ExpansionPanelSummary
            expandIcon={expanded ? <Remove className="expansion_icon_remove" /> : <Add className="expansion_icon" />}
            aria-controls="panel1bh-content"
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <Grid item className="icon">
                {props.winner.type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
              </Grid>
              <Grid item className="time" >
                {props.winner.type === "DIARIA" ? props.winner.hour : '12 pm'}
              </Grid>
              <Grid item className="winNum" >
                <div className="circle">
                  <div className="inlineText">{props.winner.winNum}</div>
                </div>
              </Grid>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPanelBody">
            <ListHistoryDetail list={props.winner.list} ></ListHistoryDetail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>

  )
};

export default ExpanionPanelDay;

