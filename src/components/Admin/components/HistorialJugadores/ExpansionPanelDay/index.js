import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";
import DetallesDialog from '../../../../View/Dialog/DetallesDialog';
import { FaFileExcel } from "react-icons/fa";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons';
import { adminService } from "../../../../../service/api/admin/admin.service";
import { FormatCurrencySymbol } from '../../../../../utils/__currency';
import ListHistoryDetail from '../ListHistoryDetail'
import RowList from '../../../../View/RowList'
import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import './styles.css'

const ExpanionPanelDay = (props) => {

  const [expanded, setExpanded] = React.useState(false);
  const [winList, setWinList] = React.useState(null);
  const [colorStyle, setColorStyle] = useState('');
  const [openComprarInfo, setOpenComprarInfo] = React.useState(false);

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      if (props.casa === 'casa') {
        adminService.get_historial_apuestasOverview_sorteo(props.winner.id).then((result) => {
          let color = result.data.summary.perdidasGanas > 0 ? '#009144' : result.data.summary.perdidasGanas < 0 ? '#ED1C24' : '#4E84C8'
          setColorStyle(color)
          setWinList(result.data)
        })
      } else {
        adminService.get_historial_apuestasOverview_sorteoAndJugador(props.jugadorId, props.winner.id).then((result) => {
          setWinList(result.data)
        })
      }
    }
  };

  function handleClickOpenDetailes() {
    setOpenComprarInfo(true)
  }

  function handleCloseComprarInfo() {
    setOpenComprarInfo(false)
  }

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
                  <div className="inlineText">{props.winner.numero ? props.winner.numero.toString().padStart(2, '0') : '00'}</div>
                </div>
              </Grid>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPanelBodyLast">
            <div></div>
            {
              winList && winList.apuestas.length > 0 &&
              <>
                {
                  props.casa && props.casa !== 'casa' &&
                  <>
                    <div style={{ display: 'flex', padding: '0px 24px 0px 24px ' }}>
                      <ListHistoryDetail list={winList.apuestas} ></ListHistoryDetail>
                      <span className='header_icon' onClick={() => handleClickOpenDetailes()}> <FaFileExcel /></span>
                    </div>
                    <Divider />
                  </>
                }
                {
                  winList.summary &&
                  <Grid item xs={12} style={{ height: 126, justifyContent: 'center', display: 'flex' }}>
                    {
                      props.casa && props.casa === 'casa' ?
                        <Grid item xs={12} className="summary" style={{ marginLeft: 20 }}>
                          <Grid item xs={12} className="week_total_text">
                            <Grid item xs={6} className="left_text" >
                              <p>Ventas:</p>
                              <p>Comisiones:</p>
                              <p>Sub-total:</p>
                              <p>Premios:</p>
                              <p>Perdidas / Ganancias:</p>
                            </Grid>
                            <Grid item xs={6} className="right_text" style={{ color: '#999999' }}>
                              <div className="left">
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p style={{ color: colorStyle }}>
                                  {winList.summary.perdidasGanas > 0 ? '+' : winList.summary.perdidasGanas ? '-' : ''}{props.moneda}
                                </p>
                              </div>
                              <div className="right">
                                <p>{FormatCurrencySymbol(props.moneda, winList.summary.ventas.toFixed(2))}</p>
                                <p>{FormatCurrencySymbol(props.moneda, winList.summary.comisiones.toFixed(2))}</p>
                                <p>{FormatCurrencySymbol(props.moneda, winList.summary.subTotal.toFixed(2))}</p>
                                <p>{FormatCurrencySymbol(props.moneda, winList.summary.premios.toFixed(2))}</p>
                                <p style={{ color: colorStyle }}>
                                  {FormatCurrencySymbol(props.moneda, Math.abs(winList.summary.perdidasGanas).toFixed(2))}
                                </p>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        :
                        <Grid item xs={6} className="summary">
                          <RowList col_1={['Costo:', 'Comisión:', 'Total:']} symbol={props.moneda}
                            col_2={[winList.summary.ventas, winList.summary.comisiones, winList.summary.subTotal]}
                            style={{ height: 90 }}></RowList>
                          <Grid item className="premio">
                            <div className="sign" style={{ paddingRight: 0 }}>
                              <span>Premio</span>
                            </div>
                            <div className="value">
                              <span>
                                {props.moneda}{'\u00A0'}{'\u00A0'}{'\u00A0'}{winList.summary.premios.toFixed(2)}
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                    }
                  </Grid>
                }
              </>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <DetallesDialog
        open={openComprarInfo}
        handleClose={handleCloseComprarInfo}
        day={props.day}
        money={props.moneda}
        winNum={props.winner.numero}
        context="Su compra fue exitosa, puede ver los detalles en la pantalla de compras activas."
        winList={winList}
        dataset={props}
      >
      </DetallesDialog>
    </Grid>

  )
};

export default ExpanionPanelDay;

