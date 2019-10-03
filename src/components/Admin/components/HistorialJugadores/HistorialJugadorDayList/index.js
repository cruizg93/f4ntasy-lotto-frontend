import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";

import { FormatCurrencySymbol } from '../../../../../utils/__currency';
import RowList from '../../../../View/RowList'

import HistorialJugadorByDay from '../HistorialJugadorByDay';
import './styles.css'

const useStyles = makeStyles(theme => ({
  disabled: {
    background: '#f4f4f4',
    opacity: '1 !important'
  },
}));

const HistorialJugadoreDayList = (props) => {
  const classes = useStyles();

  const [bono, setBono] = React.useState('');
  const [dayList, setDayList] = React.useState(props.dayList);

  const color = dayList.balance > 0 ? '#009144' :
    dayList.balance < 0 ? '#ED1C24' : '#4E84C8';
  const sign = dayList.balance > 0 ? '+' :
    dayList.balance < 0 ? '-' : '\u00A0';
  const moneda = dayList.summary.currency.toLowerCase() === 'lempira' ? 'L' : '$'


  return (
    <Grid container maxwidth='xs' className="container_historial_jugadore_dayList">
      <Grid item xs={12} >
        {
          props.weekData && dayList && dayList.sorteosPasados.length > 0 ?
            <div className='container_expasionPanelBody'>
              {
                dayList.sorteosPasados.map((row, index) =>
                  <Grid item xs={12} key={index}>
                    <HistorialJugadorByDay key={index} apuesta={row} index={index} {...props}
                      moneda={moneda}></HistorialJugadorByDay>
                  </Grid>
                )
              }
              <Grid item xs={12} style={{ height: 145, justifyContent: 'center', display: 'flex' }}>
                <Grid item xs={6} className="summary">
                  <RowList col_1={['Ventas:', 'Comisión:', 'Bonno:', 'Total:']} symbol={dayList.summary.currency.toLowerCase() === 'lempira' ? 'L' : '$'}
                    col_2={[dayList.summary.ventas, dayList.summary.comisiones, dayList.summary.bonos, dayList.summary.subTotal]}
                    style={{ height: 90 }}></RowList>
                  <Grid item className="premio">
                    <div className="sign">
                      <span>Premio</span>
                    </div>
                    <div className="value">
                      <span>
                        {dayList.summary.currency.toLowerCase() === 'lempira' ? 'L' : '$'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{dayList.summary.premios.toFixed(2)}
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            : null
        }
      </Grid>
    </Grid>

  )
};

export default HistorialJugadoreDayList;

