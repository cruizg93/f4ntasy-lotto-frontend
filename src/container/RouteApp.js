import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';
import Login from '../components/Login/Login';
import Jugador from '../components/Jugador/Jugador';
import HeaderBar from './HeaderBar';

import PrivateRoute from './PrivateRoute';
import { Role } from "../_helpers/role";

import Nuevo from '../components/Jugador/Nuevo';
import Cambio from '../components/Cambio/Cambio';
import Password from '../components/Password/Password';
import Fijar from '../components/Fijar/Fijar';
import EditarAsistente from '../components/Admin/scences/Asistente/Editar/index';
import EditarJugador from '../components/Jugador/components/Editar/index';
import BalanceJugador from '../components/Jugador/scene/Balance/index';
import JugadorDetalles from '../components/Jugador/scene/Apuesta/Detalles/index';
import DesgloseApuestaJugador from '../components/Jugador/scene/Apuesta/Detalles/Desglose/index';

import ApuestaActivaJugadorDetalles from '../components/Jugador/scene/Apuesta/Detalles/Single/index';
import PlayerPassword from "../components/Player/scenes/Password/Password";
import AdicionarApuesta from '../components/Player/scenes/Apuesta/Adicionar/index';
import AdicionarNumero from '../components/Player/scenes/Apuesta/AdicionarNumero/index';
import ApuestaActiva from "../components/Player/scenes/Apuesta/Activa";
import ApuestasActivasAdmin from '../components/Admin/scences/ApuestasActivas/index';
import ApuestaActivaAdminDetalle from '../components/Admin/scences/ApuestasActivas/Detalles/index';
import HistorialUsuarioDetalles from '../components/Admin/components/HistorialUsuarioDetalles/index';
import HistorialSemanaAnteriorAdmin from '../components/Admin/scences/Historial/SemanaAnterior/index';
import NumerosGanadores from '../components/Admin/scences/Historial/NumerosGanadores/index';
import BalanceAdmin from '../components/Admin/scences/Historial/Balance/index';

import ApuestaActivaAsistente from '../components/PAsistente/scene/Apuesta/Activa/index';
import AdicionarApuestaAsistente from '../components/PAsistente/scene/Apuesta/Adicionar/index';
import AdicionarNumeroApuestaAsistente from '../components/PAsistente/scene/Apuesta/AdicionarNumero/index';
import DetallesAsistente from '../components/PAsistente/scene/Apuesta/Detalle/index';
import DetallesApuesta from '../components/Player/scenes/Apuesta/Detalles/index';
import ComprarApuesta from '../components/Player/scenes/Apuesta/Comprar/index';
import HistorialPlayer from '../components/Player/scenes/Historial/index';
import DetallesPlayer from '../components/Player/scenes/Historial/Detalles/index';
import DetallesPAsistente from '../components/PAsistente/scene/Historial/Detalles/index';
import HistorialAsistente from '../components/PAsistente/scene/Historial/index';

import NewUser from '../components/Admin/scences/Usuario/New/index';
import NewAsistente from '../components/Admin/scences/Asistente/New/index';
import FirstChangePassword from '../components/Password/scene/FirstChange/index'

import Index from '../components/Index/index';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */

class RouterApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
    }
  }

  setBackground = (path) => {
    const grayColor = '#f4f4f4'
    const whiteColor = '#ffffff'
    if (!path) return grayColor
    if (path.indexOf('/usuario/apuesta/detalles') === 0) return whiteColor;
    if (path.indexOf('/usuario/apuestas/hoy/activas/') === 0) return whiteColor;
    if (path.indexOf('/jugador/apuestas/detalles/') === 0) return whiteColor;
    if (path.indexOf('/usuario/apuestas/') === 0) return whiteColor;
    if (path.indexOf('/usuario/password/cambiar') === 0) return whiteColor;
    if (path.indexOf('/usuario/historial') === 0) return whiteColor;
    if (path.indexOf('/usuario/nuevo/asistente') === 0) return whiteColor;
    if (path.indexOf('/historial/semana/anterior') === 0) return whiteColor;
    if (path.indexOf('/asistente/apuestas') === 0) return whiteColor;
    return grayColor;
  }

  render() {
    const { loginState } = this.props;
    if (window.location.pathname !== '/login') {
      if (!loginState) {
        return (<Redirect to={'/login'} />);
      }
    }
    const background = this.setBackground(this.props.location.pathname)
    return (
      <LoadingOverlay
        active={this.props.loading}
        spinner
        styles={{
          spinner: (base) => ({
            ...base,
            width: '55px',
            '& svg circle': {
              stroke: 'rgba(255, 0, 0, 0.5)'
            }
          })
        }}
      >
        <div className="app-container" style={{ background: background }}>
          {
            loginState &&
            <HeaderBar />
          }
          <div className="app-main-container">
            <main className="app-main-content-wrapper">
              <div className="app-main-content">
                <div className="app-wrapper">
                  <Switch>
                    <PrivateRoute
                      key="main"
                      exact path="/"
                      roles={[Role.Admin, Role.Master, Role.Player, Role.Asistente]} authed={this.props.role}
                      component={Index}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/jugador" component={Jugador} />
                    <PrivateRoute
                      key="password"
                      exact path="/password/new"
                      roles={[Role.Admin, Role.Master, Role.Player, Role.Asistente]} authed={this.props.role}
                      component={FirstChangePassword}
                    />
                    <PrivateRoute
                      exact path="/jugador/editar/:jugadorId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={EditarJugador}
                    />
                    <PrivateRoute
                      exact path="/jugador/balance/:jugadorId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={BalanceJugador}
                    />
                    <PrivateRoute
                      exact path="/jugador/apuestas/detalles"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={JugadorDetalles}
                    />

                    <PrivateRoute
                      exact path="/jugador/apuestas/detalles/:apuestaId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={ApuestaActivaJugadorDetalles}
                    />
                    <PrivateRoute
                      exact path="/jugador/apuestas/detalles/:apuestaId/desglose"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={DesgloseApuestaJugador}
                    />
                    <PrivateRoute
                      exact path="/asistente/editar/:userId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={EditarAsistente}
                    />
                    <PrivateRoute
                      exact path="/apuestas/activas"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={ApuestasActivasAdmin}
                    />
                    <PrivateRoute
                      exact path="/apuestas/activas/:apuestaId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={ApuestaActivaAdminDetalle}
                    />
                    <PrivateRoute
                      exact path="/historial/semana/actual/usuario/:userId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={HistorialUsuarioDetalles}
                    />
                    <PrivateRoute
                      exact path="/historial/numeros/ganadores"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={NumerosGanadores}
                    />
                    <PrivateRoute
                      exact path="/historial/semana/anterior"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={HistorialSemanaAnteriorAdmin}
                    />
                    <PrivateRoute
                      exact path="/historial/semana/anterior/usuario/:userId"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={HistorialUsuarioDetalles}
                    />
                    <PrivateRoute
                      exact path="/historial/balance"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={BalanceAdmin}
                    />
                    <PrivateRoute
                      exact path="/usuario/nuevo"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={NewUser}
                    />
                    <PrivateRoute
                      exact path="/usuario/nuevo/jugador"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={Nuevo}
                    />
                    <PrivateRoute
                      exact path="/usuario/nuevo/asistente"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={NewAsistente}
                    />
                    <PrivateRoute
                      exact path="/sistema/cambio"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={Cambio}
                    />
                    <PrivateRoute
                      exact path="/sistema/password/update"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={Password}
                    />
                    <PrivateRoute
                      exact path="/sistema/topes"
                      roles={[Role.Admin, Role.Master]} authed={this.props.role}
                      component={Fijar}
                    />
                    <PrivateRoute
                      exact path="/usuario/apuestas"
                      roles={[Role.Player]} authed={this.props.role}
                      component={AdicionarApuesta}
                    />
                    <PrivateRoute
                      exact path="/usuario/apuestas/:apuestaId"
                      roles={[Role.Player]} authed={this.props.role}
                      component={AdicionarNumero}
                    />
                    <PrivateRoute
                      exact strict path="/usuario/apuestas/hoy/activas"
                      roles={[Role.Player]} authed={this.props.role}
                      component={AdicionarApuesta}
                    />
                    <PrivateRoute
                      exact path="/usuario/apuestas/hoy/activas/:apuestaId"
                      roles={[Role.Player]} authed={this.props.role}
                      component={ApuestaActiva}
                    />
                    <PrivateRoute
                      exact path="/usuario/historial"
                      roles={[Role.Player]} authed={this.props.role}
                      component={HistorialPlayer}
                    />
                    <PrivateRoute
                      exact path="/usuario/historial/:apuestaId"
                      roles={[Role.Player]} authed={this.props.role}
                      component={DetallesPlayer}
                    />
                    <PrivateRoute
                      exact path="/usuario/historial/:apuestaId/desgloce"
                      roles={[Role.Player]} authed={this.props.role}
                      component={DetallesPlayer}
                    />
                    <PrivateRoute
                      exact path="/usuario/password/cambiar"
                      roles={[Role.Player, Role.Asistente]} authed={this.props.role}
                      component={PlayerPassword}
                    />
                    <PrivateRoute
                      exact path="/usuario/apuesta/detalles"
                      roles={[Role.Player]} authed={this.props.role}
                      component={DetallesApuesta}
                    />
                    <PrivateRoute
                      exact path="/usuario/apuesta/comprar"
                      roles={[Role.Player]} authed={this.props.role}
                      component={ComprarApuesta}
                    />
                    <PrivateRoute
                      exact path="/asistente/apuestas"
                      roles={[Role.Asistente]} authed={this.props.role}
                      component={AdicionarApuestaAsistente}
                    />
                    <PrivateRoute
                      exact path="/asistente/apuesta/detalles"
                      roles={[Role.Asistente]} authed={this.props.role}
                      component={DetallesAsistente}
                    />
                    <PrivateRoute
                      exact path="/asistente/apuestas/:apuestaId"
                      roles={[Role.Asistente]} authed={this.props.role}
                      component={AdicionarNumeroApuestaAsistente}
                    />
                    <PrivateRoute
                      exact path="/asistente/apuestas/hoy/activas/:apuestaId"
                      roles={[Role.Asistente]} authed={this.props.role}
                      component={ApuestaActivaAsistente}
                    />
                    <PrivateRoute
                      exact path="/asistente/historial/:apuestaId"
                      roles={[Role.Asistente]} authed={this.props.role}
                      component={DetallesPAsistente}
                    />
                    <Route path='*' render={() => (<Redirect to="/" />)} />
                  </Switch>
                </div>
              </div>
            </main>
            {/* {this.state.showMsg && alertMessage.type === 'warning' && NotificationManager.warning(alertMessage.message, 'Warning')} */}
            <NotificationContainer />
          </div>
        </div>
      </LoadingOverlay>

    );
  }
}

const mapStateToProps = ({ user, loading_state }) => {
  const { loginState, role } = user;
  const { loading } = loading_state;
  return { loginState, role, loading }
};
export default connect(mapStateToProps)(RouterApp);