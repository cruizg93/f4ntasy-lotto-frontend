import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons'
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import ExpanionPanelDay from '../ExpansionPanelDay';
import './styles.css'

const useStyles = makeStyles(theme => ({
  disabled: {
    background: '#f4f4f4',
    opacity: '1 !important'
  },
}));


const HistorialJugadorByDay = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const color = props.apuesta.balance > 0 ? '#009144' :
    props.apuesta.balance < 0 ? '#ED1C24' : '#4E84C8';
  const sign = props.apuesta.balance > 0 ? '+' :
    props.apuesta.balance < 0 ? '-' : '\u00A0';
  const disable = props.apuesta.balance === 0 ? false : false;
  // const disable = props.apuesta.balance === 0 ? true : false;
  const colorTmp = props.apuesta.summary.perdidasGanas > 0 ? '#009144' : (props.apuesta.summary.perdidasGanas < 0 ? '#ED1C24' : '#4E84C8')
  // setColorStyle(colorTmp)
  return (
    <Grid container maxwidth='xs' className="container_historial_jugadorByDay">
      <Grid item xs={12} >
        <ExpansionPanel onChange={handleChangeExpand('panel1')}
          disabled={disable}
          TransitionProps={{ unmountOnExit: true }} className="expansionPanel_day">
          <ExpansionPanelSummary
            expandIcon={expanded ? <Remove className="expansion_icon_remove" /> : <Add className="expansion_icon" />}
            aria-controls="panel1bh-content"
            classes={{ disabled: classes.disabled }}
          >
            <Grid item className="numeroText">
              {props.apuesta.sorteoTime}
            </Grid>
            <Grid item className="valorText" style={{ color: color }}>
              <div className="right">
                <span>{sign}{props.moneda}</span>
              </div>
              <div className="left">
                <span>
                  {'\u00A0'}{'\u00A0'}{FormatNumberSymbol(Math.abs(props.apuesta.balance))}
                </span>
              </div>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPanelBody">
            {
              props.apuesta.sorteos ?
                <>
                  {
                    props.apuesta.sorteos.map((row, index) =>
                      row.id &&
                      <Grid item xs={12} key={index}>
                        <ExpanionPanelDay winner={row} casa={props.casa ? props.casa : 'vendedor'}
                          jugadorId={props.jugadorId} jugadorUsername={props.jugadorUsername} jugadorName={props.jugadorName}
                          day={props.apuesta.sorteoTime} moneda={props.moneda}></ExpanionPanelDay>
                      </Grid>
                    )
                  }
                  {
                    props.casa && props.casa === 'casa' ?
                      <Grid item xs={12} style={{ height: 126, justifyContent: 'center', display: 'flex' }}>
                        <Grid item xs={12} className="summary" style={{ marginLeft: 20 }}>
                          <Grid item xs={12} className="week_total_text">
                            <Grid item xs={6} className="left_text">
                              <p>Ventas:</p>
                              <p>Comisiones:</p>
                              <p>Sub-total:</p>
                              <p>Premios:</p>
                              <p>Perdidas / Ganancias:</p>
                            </Grid>
                            <Grid item xs={6} className="right_text">
                              <div className="left">
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p>{props.moneda}</p>
                                <p style={{ color: colorTmp }}>
                                  {props.apuesta.summary.perdidasGanas > 0 ? '+' : props.apuesta.summary.perdidasGanas ? '-' : ''}{props.moneda}
                                </p>
                              </div>
                              <div className="right">
                                <p>{FormatNumberSymbol(props.apuesta.summary.ventas)}</p>
                                <p>{FormatNumberSymbol(props.apuesta.summary.comisiones)}</p>
                                <p>{FormatNumberSymbol(props.apuesta.summary.subTotal)}</p>
                                <p>{FormatNumberSymbol(props.apuesta.summary.premios)}</p>
                                <p style={{ color: colorTmp }}>
                                  {FormatNumberSymbol(Math.abs(props.apuesta.summary.perdidasGanas))}
                                </p>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      :
                      <Grid >
                      </Grid>
                  }
                </>
                : null
            }

          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>

  )
};

export default HistorialJugadorByDay;

