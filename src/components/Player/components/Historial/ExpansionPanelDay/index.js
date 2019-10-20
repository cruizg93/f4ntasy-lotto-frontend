import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DetallesDialogP from '../../../../View/Dialog/DetallesDialogP';
import { LocalPrintshop } from "@material-ui/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaFileExcel } from "react-icons/fa";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons';
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import { playerService } from "../../../../../service/api/player/player.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import ListHistoryDetail from '../ListHistoryDetail'
import RowList from '../../../../View/RowList'
import PrintPdfUserP from "../PrintPdfUserP"

import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import './styles.css'

const ExpanionPanelDay = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [winList, setWinList] = React.useState([]);
  const [openComprarInfo, setOpenComprarInfo] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // const userInfo = props.jugadorName ? props.jugadorUsername + ' - ' + props.moneda + ' [' + props.jugadorName + ']' : ''
  const username = JSON.parse(localStorage.getItem('currentUser'))['username']
  const userInfo = username ? username + ' - ' + props.money + ' [' + ']' : ''
  const image = props.winner && props.winner.type === 'DIARIA' ? DiariaLogo : ChicaLogo
  const hour = props.winner && props.winner.type === 'DIARIA' ? props.winner.hour : '12 pm'
  const winNumber = props.winner ? props.winner.numero.toString().padStart(2, '0') : '00'
  const fileName = username + '_' + props.day + '_' + hour + '.pdf'

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      playerService.apuestasOverview_sorteo(props.winner.id).then((result) => {
        if (result.status === 401) {
          authenticationService.logout()
        } else {
          setWinList(result.data)
          setShow(true)
        }
      })
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
              winList && winList.apuestas && winList.apuestas.length > 0 &&
              <>
                <div style={{ display: 'flex', padding: '0px 24px 0px 24px ' }}>
                  <ListHistoryDetail list={winList.apuestas} ></ListHistoryDetail>
                  <div style={{ flex: 0.3, textAlign: 'center' }}>
                    {
                      winList.xApuestas === true ?
                        <div className='header_icon' onClick={() => handleClickOpenDetailes()}> <FaFileExcel /></div>
                        : <div style={{ paddingTop: 18 }}></div>
                    }
                    {show && (
                      <PDFDownloadLink
                        document={
                          <PrintPdfUserP
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
                {
                  winList.summary &&
                  <Grid item xs={12} style={{ height: 126, justifyContent: 'center', display: 'flex' }}>
                    <Grid item xs={6} className="summary">
                      <RowList col_1={['Costo:', 'Comisión:', 'Total:']} symbol={props.money}
                        col_2={[winList.summary.ventas, winList.summary.comisiones, winList.summary.subTotal]}
                        style={{ height: 90 }}></RowList>
                      <Grid item className="premio">
                        <div className="sign">
                          <span>Premio</span>
                        </div>
                        <div className="value">
                          <span>
                            {props.money}{'\u00A0'}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(winList.summary.premios)}
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              </>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <DetallesDialogP
        open={openComprarInfo}
        handleClose={handleCloseComprarInfo}
        day={props.day}
        money={props.money}
        winNum={props.winner.numero}
        context="Su compra fue exitosa, puede ver los detalles en la pantalla de compras activas."
        winList={winList}
        dataset={props}
      >
      </DetallesDialogP>
    </Grid>

  )
};

export default ExpanionPanelDay;

