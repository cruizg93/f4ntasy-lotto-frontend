import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Currency } from '../../../../../utils/__currency';
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import { adminService } from "../../../../../service/api/admin/admin.service";
import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';
import imgRed from '../../../../View/assets/RED_PNG.png';
import imgPurple from '../../../../View/assets/Purple_PNG.png';
import imgGreen from '../../../../View/assets/Green_PNG.png';
import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';
import InputDialog from '../../../../View/Dialog/InputDialog';
import DoubleVerificationDialog from '../../../../View/Dialog/DoubleVerificationDialog';
import InformationDialog from '../../../../View/Dialog/InformationDialog';

import './styles.css';

// const JugadorDetallesEntry = ({ match: { url }, id, nombre, total, comision, riesgo, estado, username, moneda, type, day, hour, ...props }) => {
class JugadorDetallesEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false,
      icon: '',
      title: '',
      context: '',
      numero: ''
    }
  }
  handleClickOpen() {
    let icon = '', title = '', context = '', open = false, redOpen = false, purpleOpen = false;
    if (this.props.estado === 'ABIERTA') {  //open
      open = true;
      icon = 'help'
      title = 'Bloquear?'
      context = 'Si bloquea este sorteo ningún vendedor podrá accesarlo para hacer mas compras.'
    } else if (this.props.estado === 'BLOQUEADA') { //block
      purpleOpen = true;
      icon = 'help'
      title = 'Desbloquear?'
      context = 'Si desbloquea este sorteo todos los vendedores tendrán acceso a el.'
    } else if (this.props.estado === 'CERRADA') { //block
      redOpen = true;
    }
    this.setState({
      ...this.state,
      open: open,
      redOpen: redOpen,
      purpleOpen: purpleOpen,
      title: title,
      context: context,
      icon: icon
    })
  }

  handleClose_Purple(value) {
    this.setState({
      ...this.state,
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false
    })
    if (value === true) {
      adminService.cerrar_desbloquear(this.props.id).then((result) => {
        this.props.update(this.props.moneda);
      })
    }
  }

  handleClose(value) {
    this.setState({
      ...this.state,
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false
    })
    if (value === true) {
      if (this.props.estado === 'ABIERTA') {
        adminService.cerrar_apuesta(this.props.id).then((result) => {
          this.props.update(this.props.moneda);
        })
      }
    }
  }

  handleClose_password_error() {
    this.setState({
      ...this.state,
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false
    })
  }

  handleClose_double_verification(value) {
    this.setState({
      ...this.state,
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false
    })
    if (value === true) {
      adminService.open_apuesta(this.state.numero, this.props.id).then((result) => {
        this.props.update(this.props.moneda);
      })
    }
  }

  handleCloseRed(numero, flag, password = '') {
    this.setState({
      ...this.state,
      open: false,
      redOpen: false,
      purpleOpen: false,
      DoubleVerificationOpen: false,
      errorPasswordOpen: false,
      numero: numero
    })
    if (flag === true) {
      adminService.admin_password_confirm(this.props.id, password).then((result) => {
        if (result.data === true) {
          setTimeout(() => {
            this.setState({
              ...this.state,
              DoubleVerificationOpen: true
            })
          }, 20)
        } else {
          this.setState({
            ...this.state,
            errorPasswordOpen: true
          })
        }
      })
    }
  }
  render() {
    const apuestaCurrency = (this.props.moneda === "LEMPIRA" || this.props.moneda === "L") ? Currency.Lempira : Currency.Dollar;
    return (
      <>
        <Grid container spacing={0} className="container_jugadorDetailesEntry"
          direction="row"
          justify="center"
        >
          <Grid item xs={4} className="logo_icon" onClick={() => this.handleClickOpen()}>
            {this.props.type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
          </Grid>
          <Grid container item xs={8} direction="column">
            <Grid container justify="flex-start" className="headerLabelSorteoHour">
              <span className="time">{this.props.type === "DIARIA" ? this.props.hour : "12 pm"}{'\u00A0'}-{'\u00A0'}</span>
              <span className="day">{this.props.day.toLowerCase()}</span>
            </Grid>
            <Grid container className="valuesContainer">
              <Grid item xs={2} className="img_open_close" >
                {
                  this.props.estado === 'ABIERTA' ?
                    <img src={imgGreen} alt="ABIERTA" />
                    : this.props.estado === 'CERRADA' ?
                      <img src={imgRed} alt="Cerrado" />
                      : <img src={imgPurple} alt="BLOQUEADA " />
                }
              </Grid>
              <Grid item xs={3} className="textData">
                <Typography >
                  {"Total: "}{'\u00A0'}
                </Typography>
              </Grid>
              <Grid item xs={7} className="total_amount"
                component={this.props.total === 0 ? 'div' : Link}
                to={
                  {
                    pathname: `${this.props.match.url}/${this.props.id}`,
                    state: {
                      title: this.props.nombre,
                      userid: this.props.location.state.userid,
                      username: this.props.location.state.username,
                      name: this.props.name,
                      id: this.props.id,
                      moneda: this.props.moneda,
                      type: this.props.type,
                      day: this.props.day,
                      hour: this.props.hour,
                      // userId: this.props.location.state.id,
                    }
                  }
                }
              >
                <Typography className="body1" >
                  {apuestaCurrency.symbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(this.props.total)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ConfirmDialog
            open={this.state.purpleOpen}
            handleClose={this.handleClose_Purple.bind(this)}
            title={this.state.title}
            context={this.state.context}
            icon={this.state.icon}
            contentFontSize={'16px'}
            contentHeight={'80px'}>
          </ConfirmDialog>
          <ConfirmDialog
            open={this.state.open}
            handleClose={this.handleClose.bind(this)}
            title={this.state.title}
            context={this.state.context}
            icon={this.state.icon}
            contentFontSize={'16px'}
            contentHeight={'80px'}>
          </ConfirmDialog>
          <InputDialog
            open={this.state.redOpen}
            handleClose={this.handleCloseRed.bind(this)}
            title={`Adicionar número ganador`}
            context={this.props.type + ' - ' + (this.props.type === "DIARIA" ? this.props.hour : "12 pm") + ' - ' + this.props.day.toLowerCase()}
            titleFontSize={'19px'}
            contentFontSize={'16px'}
            contentHeight={'190px'}>
          </InputDialog>
          <DoubleVerificationDialog
            open={this.state.DoubleVerificationOpen}
            handleClose={this.handleClose_double_verification.bind(this)}
            title={`Esta seguro que el número ganador es el...`}
            numero={this.state.numero}
            context={this.props.type + ' - ' + (this.props.type === "DIARIA" ? this.props.hour : "12 pm") + ' - ' + this.props.day.toLowerCase()}
            titleFontSize={'20px'}
            contentFontSize={'16px'}
            contentHeight={'130px'}>
          </DoubleVerificationDialog>
          <InformationDialog
            open={this.state.errorPasswordOpen}
            handleClose={this.handleClose_password_error.bind(this)}
            title={'Contraseña incorrecta! intente otra vez...'}
            context={''}
            icon={'ioIosWarning'}
            iconSize={67}
            titleFontSize={'22px'}
            contentFontSize={'16px'}
            contentHeight={'60px'}>
          </InformationDialog>
        </Grid>
      </>
    )
  }
};

export default JugadorDetallesEntry;