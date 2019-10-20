import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import DetallesDialog from '../../../../View/Dialog/DetallesDialog';
import { FaFileExcel } from "react-icons/fa";
import { LocalPrintshop } from "@material-ui/icons";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons';
import { adminService } from "../../../../../service/api/admin/admin.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import { userActions } from '../../../../../store/actions';
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import ListHistoryDetail from '../ListHistoryDetail'
import RowList from '../../../../View/RowList'
import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import PrintPdfAdmin from "../PrintPdfAdmin";
import { PDFDownloadLink } from "@react-pdf/renderer";
import './styles.css'

const ExpanionPanelDay = (props) => {

  const [expanded, setExpanded] = React.useState(false);
  const [winList, setWinList] = React.useState(null);
  const [winDetailList, setWinDetailList] = React.useState(null);
  const [colorStyle, setColorStyle] = useState('');
  const [openComprarInfo, setOpenComprarInfo] = React.useState(false);
  const [show, setShow] = React.useState(false);

  console.log('props', props)
  const userInfo = props.jugadorName ? props.jugadorUsername + ' - ' + props.moneda + ' [' + props.jugadorName + ']' : ''
  const image = props.winner && props.winner.type === 'DIARIA' ? DiariaLogo : ChicaLogo
  const hour = props.winner && props.winner.type === 'DIARIA' ? props.winner.hour : '12 pm'
  const winNumber = props.winner ? props.winner.numero.toString().padStart(2, '0') : '00'
  const fileName = props.jugadorUsername + '_' + props.jugadorName + '_' + props.day + '_' + hour + '.pdf'

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      if (props.casa === 'casa') {
        let currency = props.moneda === 'L' ? "lempira" : "dolar"
        adminService.get_historial_apuestasOverview_sorteo(props.winner.id, currency).then((result) => {
          if (result.status === 401) {
            authenticationService.logout()
          } else {
            let color = result.data.summary.perdidasGanas > 0 ? '#009144' : result.data.summary.perdidasGanas < 0 ? '#ED1C24' : '#4E84C8'
            setColorStyle(color)
            setWinList(result.data)
          }
        })
      } else {
        adminService.get_historial_apuestasOverview_sorteoAndJugador(props.jugadorId, props.winner.id).then((result) => {
          if (result.status === 401) {
            authenticationService.logout()
          } else
            setWinList(result.data)
          setShow(true)
        })
      }
    }
  };

  function handleClickOpenDetailes() {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    adminService.get_historial_apuestas_sorteoAndJugador(props.winner.id, props.jugadorId).then((result) => {
      if (result.status === 401) {
        authenticationService.logout()
      } else {
        setWinDetailList(result.data)
        setOpenComprarInfo(true)
      }
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  function handleCloseComprarInfo() {
    setOpenComprarInfo(false)
    const { dispatch } = props;
    dispatch(userActions.loading_end())
  }

  return (
    <Grid container maxwidth='xs' className="time_text_valor">
      <Grid item xs={12} >
        <ExpansionPanel onChange={handleChangeExpand('panel1')}
          TransitionProps={{ unmountOnExit: true }} className="expansionPanel_day" >
          <ExpansionPanelSummary
            expandIcon={expanded ? <Remove className="expansion_icon_remove" /> : <Add className="expansion_icon" />}
            aria-controls="panel1bh-content"
          >
            <div style={{ display: 'flex', width: '100%' }}>
              <Grid item className="icon" component={Link}
                to={
                  {
                    pathname: `/historial/sorteos/${props.winner.id}/apuestas`,
                    state: {
                      type: props.winner.type,
                      day: props.day,
                      time: props.winner.hour
                    }
                  }
                }
              >
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
                    <div id="container-apuesta-historial-data-asistente" style={{ display: 'flex', padding: '0px 24px 0px 24px ' }}>
                      <ListHistoryDetail list={winList.apuestas} flex={1} width={'100%'}></ListHistoryDetail>
                      <div style={{ flex: 0.3, textAlign: 'center' }}>
                        {
                          winList.xApuestas === true ?
                            <div className='admin_header_icon' onClick={() => handleClickOpenDetailes()}> <FaFileExcel /></div>
                            : <div style={{ paddingTop: 18 }}></div>
                        }
                        {show && (
                          <PDFDownloadLink
                            document={
                              <PrintPdfAdmin
                                userInfo={userInfo}
                                image={image}
                                hour={hour}
                                day={props.day}
                                winNumber={winNumber}
                                list={winList.apuestas}
                                summary={winList.summary}
                              />
                            }
                            fileName={fileName}
                            style={{
                              textDecoration: "none",
                              padding: "3px 25px 6px 25px",
                              color: "#ffffff",
                              backgroundColor: "#663399",
                              border: "1px solid #4a4a4a",
                              borderRadius: '15px'
                            }}
                          >
                            {({ blob, url, loading, error }) => //'New'
                              <LocalPrintshop className="iconP" />
                            }
                          </PDFDownloadLink>
                        )}
                      </div>
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
                                <p>{FormatNumberSymbol(winList.summary.ventas)}</p>
                                <p>{FormatNumberSymbol(winList.summary.comisiones)}</p>
                                <p>{FormatNumberSymbol(winList.summary.subTotal)}</p>
                                <p>{FormatNumberSymbol(winList.summary.premios)}</p>
                                <p style={{ color: colorStyle }}>
                                  {FormatNumberSymbol(Math.abs(winList.summary.perdidasGanas))}
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
        winList={winDetailList}
        dataset={props}
      >
      </DetallesDialog>
    </Grid>

  )
};

export default connect(null, null)(ExpanionPanelDay);

