import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";

import { adminService } from "../../../../service/api/admin/admin.service";
import InputBonoDialog from './InputBonoDialog';
import InformationDialog from '../../../View/Dialog/InformationDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons'
import { FormatCurrencySymbol } from '../../../../utils/__currency';
import RowList from '../../../View/RowList'

import HistorialJugadorByDay from './HistorialJugadorByDay';
import Bono_PNG from '../../../View/assets/bono.png';
import './styles.css'

const useStyles = makeStyles(theme => ({
  disabled: {
    background: '#f4f4f4',
    opacity: '1 !important'
  },
}));

const HistorialJugadores = ({ match: { url }, ...props }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorPasswordOpen, setErrorPasswordOpen] = React.useState(false);
  const [bono, setBono] = React.useState('');
  const [dayList, setDayList] = React.useState(null);

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      adminService.get_historial_weekOverviewByJugador(props.weekData.id, props.jugador.id).then((result) => {
        setDayList(result.data)
      })
    }
  };

  const color = props.jugador.balance > 0 ? '#009144' :
    props.jugador.balance < 0 ? '#ED1C24' : '#4E84C8';
  const sign = props.jugador.balance > 0 ? '+' :
    props.jugador.balance < 0 ? '-' : '\u00A0';
  const moneda = props.jugador.moneda.toLowerCase() === 'lempira' ? 'L' : '$'

  const showOpen = () => {
    setOpen(true)
  }

  const handleClose_password_error = () => {
    setOpen(false);
    setErrorPasswordOpen(false);
  }

  const handleClose = (bono, flag, password = '') => {
    setOpen(false);
    setErrorPasswordOpen(false);
    setBono(bono);
    if (flag === true) {
      adminService.admin_password_confirm('', password).then((result) => {
        if (result.data === true) {
          //bono setting
          adminService.submit_bono(props.jugador.id, bono, props.jugador.moneda.toLowerCase(), props.weekData.id).then((result) => {
            props.updateBono()
          })
            .catch((error) => {
              setErrorPasswordOpen(true)
            })
        } else {
          setErrorPasswordOpen(true)
        }
      })
    }
  }

  return (
    <Grid container maxwidth='xs' className="container_historial_jugadores">
      <Grid item xs={12} >
        <ExpansionPanel onChange={handleChangeExpand('panel1')}
          TransitionProps={{ unmountOnExit: true }} className="expansionPanel">
          <ExpansionPanelSummary
            expandIcon={expanded ? <Remove className="expansion_icon_remove" /> : <Add className="expansion_icon" />}
            aria-controls="panel1bh-content" className="container_expansion_summary"
          >
            <Grid item className="userText" onClick={() => showOpen()}>
              <span>{props.jugador.username}{'\u00A0'}{'-'}{'\u00A0'}{moneda}{'\u00A0'}{' ['}{props.jugador.name}{']'}</span>
              {
                props.jugador.haveBono &&
                <img src={Bono_PNG} alt='bonoPng' />
              }
            </Grid>
            <Grid item className="valorText" style={{ color: color }}>
              <div className="right">
                <span>{sign}{moneda}</span>
              </div>
              <div className="left">
                <span>
                  {'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(moneda, Math.abs(props.jugador.balance).toFixed(2))}
                </span>
              </div>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPanelBody">
            <div></div>
            {
              props.weekData && dayList && dayList.sorteosPasados.length > 0 ?
                <div className='container_expasionPanelBody'>
                  {
                    dayList.sorteosPasados.map((row, index) =>
                      <Grid item xs={12} key={index}>
                        <HistorialJugadorByDay key={index} apuesta={row} index={index} {...props}
                          moneda={dayList.summary.currency.toLowerCase() === 'lempira' ? 'L' : '$'}></HistorialJugadorByDay>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <InputBonoDialog
        open={open}
        handleClose={handleClose}
        icon={Bono_PNG}
        title={`${props.jugador.username}${moneda}-${moneda} [${props.jugador.name}]`}
        context={'Asignar bono a este vendedor para la semana de ......'}
        days={`${props.weekData.monday} - ${props.weekData.sunday}`}>
      </InputBonoDialog>
      <InformationDialog
        open={errorPasswordOpen}
        handleClose={handleClose_password_error}
        title={'Contraseña incorrecta! intente otra vez...'}
        context={''}
        icon={'ioIosWarning'}
        iconSize={67}
        titleFontSize={'22px'}
        contentFontSize={'16px'}
        contentHeight={'60px'}>
      </InformationDialog>
    </Grid>

  )
};

export default HistorialJugadores;

