import React from 'react';
import {Router, Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Login from './components/Login/Login';
import {PrivateRoute} from './components/PrivateRoute/PrivateRoute';
import Jugador from './components/Jugador/Jugador';
import Apuestas from './components/Apuestas/Apuestas';
import Nuevo from './components/Jugador/Nuevo';
import CssBaseline from '@material-ui/core/CssBaseline';
import Cambio from './components/Cambio/Cambio';
import Password from './components/Password/Password';
import Fijar from './components/Fijar/Fijar';
import {history} from "./_helpers/history";
import {Role} from "./_helpers/role";
import EditarAsistente from './components/Admin/scences/Asistente/Editar/index';
import EditarJugador from './components/Jugador/components/Editar/index';
import BalanceJugador from './components/Jugador/scene/Balance/index';
import JugadorDetalles from './components/Jugador/scene/Apuesta/Detalles/index';
import DesgloseApuestaJugador from './components/Jugador/scene/Apuesta/Detalles/Desglose/index';

import ApuestaActivaJugadorDetalles from './components/Jugador/scene/Apuesta/Detalles/Single/index';
import PlayerPassword from "./components/Player/scenes/Password/Password";
import AdicionarApuesta from './components/Player/scenes/Apuesta/Adicionar/index';
import AdicionarNumero from './components/Player/scenes/Apuesta/AdicionarNumero/index';
import ApuestaActiva from "./components/Player/scenes/Apuesta/Activa";
import ApuestasActivasAdmin from './components/Admin/scences/ApuestasActivas/index';
import ApuestaActivaAdminDetalle from './components/Admin/scences/ApuestasActivas/Detalles/index';
import HistorialSemanaActualAdmin from './components/Admin/scences/Historial/SemanaActual/index';
import HistorialUsuarioDetalles from './components/Admin/components/HistorialUsuarioDetalles/index';
import HistorialUserSingleDayDetail
    from './components/Admin/scences/Historial/SemanaActual/HistorialUserSingleDayDetail/index';
import HistorialSemanaAnteriorAdmin from './components/Admin/scences/Historial/SemanaAnterior/index';
import NumerosGanadores from './components/Admin/scences/Historial/NumerosGanadores/index';
import NumeroGanador from './components/Admin/scences/Sistema/NumeroGanador/index';
import BalanceAdmin from './components/Admin/scences/Historial/Balance/index';

import ApuestaActivaAsistente from './components/PAsistente/scene/Apuesta/Activa/index';
import AdicionarApuestaAsistente from './components/PAsistente/scene/Apuesta/Adicionar/index';
import AdicionarNumeroApuestaAsistente from './components/PAsistente/scene/Apuesta/AdicionarNumero/index';
import DetallesAsistente from './components/PAsistente/scene/Apuesta/Detalle/index';
import DetallesApuesta from './components/Player/scenes/Apuesta/Detalles/index';
import ComprarApuesta from './components/Player/scenes/Apuesta/Comprar/index';
import HistorialPlayer from './components/Player/scenes/Historial/index';
import DetallesPlayer from './components/Player/scenes/Historial/Detalles/index';
import DetallesPAsistente from './components/PAsistente/scene/Historial/Detalles/index';
import HistorialAsistente from './components/PAsistente/scene/Historial/index';

import Temporal from './components/Admin/scences/Temporal/index';

import Index from './components/Index/index';
class App extends React.Component {
    render() {
        return (
            <div style={{height: "100%"}} className="App">
                <CssBaseline/>
                <Router history={history}>
                    <div>

                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <PrivateRoute
                                key="main"
                                exact path="/"   
                                roles={[Role.Admin, Role.Master, Role.Player, Role.Asistente]}                             
                                component={Index}
                            />   
                            <PrivateRoute                                
                                exact path="/temporal"   
                                roles={[Role.Admin, Role.Master]}                             
                                component={Temporal}
                            />                         
                            <PrivateRoute
                                exact path="/jugador/editar/:jugadorId"
                                roles={[Role.Admin, Role.Master]}
                                component={EditarJugador}
                            />
                            <PrivateRoute
                                exact path="/jugador/balance/:jugadorId"
                                roles={[Role.Admin, Role.Master]}
                                component={BalanceJugador}
                            />
                            <PrivateRoute
                                exact path="/jugador/apuestas/detalles"
                                roles={[Role.Admin, Role.Master]}
                                component={JugadorDetalles}
                            />

                            <PrivateRoute
                                exact path="/jugador/apuestas/detalles/:apuestaId"
                                roles={[Role.Admin, Role.Master]}
                                component={ApuestaActivaJugadorDetalles}
                            />
                            <PrivateRoute
                                exact path="/jugador/apuestas/detalles/:apuestaId/desglose"
                                roles={[Role.Admin, Role.Master]}
                                component={DesgloseApuestaJugador}
                            />
                            <PrivateRoute
                                exact path="/asistente/editar/:userId"
                                roles={[Role.Admin, Role.Master]}
                                component={EditarAsistente}
                            />                           
                            <PrivateRoute
                                exact path="/jugadores"
                                roles={[Role.Admin, Role.Master]}
                                component={Jugador}
                            />
                            <PrivateRoute
                                exact path="/apuestas/activas"
                                roles={[Role.Admin, Role.Master]}
                                component={ApuestasActivasAdmin}
                            />
                            <PrivateRoute
                                exact path="/apuestas/activas/:apuestaId"
                                roles={[Role.Admin, Role.Master]}
                                component={ApuestaActivaAdminDetalle}
                            />
                            <PrivateRoute
                                exact path="/apuestas"
                                roles={[Role.Admin, Role.Master]}
                                component={Apuestas}
                            />                            
                            <PrivateRoute
                                exact path="/historial/semana/actual"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialSemanaActualAdmin}
                            />
                            <PrivateRoute
                                exact path="/historial/semana/actual/usuario/:userId"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialUsuarioDetalles}
                            />
                            <PrivateRoute
                                exact path="/historial/semana/actual/usuario/:userId/desglose"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialUserSingleDayDetail}
                            />
                            <PrivateRoute
                                exact path="/historial/numeros/ganadores"
                                roles={[Role.Admin, Role.Master]}
                                component={NumerosGanadores}
                            />
                            <PrivateRoute
                                exact path="/historial/semana/anterior"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialSemanaAnteriorAdmin}
                            />
                            <PrivateRoute
                                exact path="/historial/semana/anterior/usuario/:userId"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialUsuarioDetalles}
                            />
                            <PrivateRoute
                                exact path="/historial/semana/anterior/usuario/:userId/desglose"
                                roles={[Role.Admin, Role.Master]}
                                component={HistorialUserSingleDayDetail}
                            />

                             <PrivateRoute
                                exact path="/historial/balance"
                                roles={[Role.Admin, Role.Master]}
                                component={BalanceAdmin}
                            />
                            <PrivateRoute
                                exact path="/jugador/nuevo"
                                roles={[Role.Admin, Role.Master]}
                                component={Nuevo}
                            />
                            <PrivateRoute
                                exact path="/sistema/cambio"
                                roles={[Role.Admin, Role.Master]}
                                component={Cambio}
                            />
                            <PrivateRoute
                                exact path="/sistema/password/update"
                                roles={[Role.Admin, Role.Master]}
                                component={Password}
                            />
                            <PrivateRoute
                                exact path="/sistema/topes"
                                roles={[Role.Admin, Role.Master]}
                                component={Fijar}
                            />
                            <PrivateRoute
                                exact path="/sistema/numero/ganador"
                                roles={[Role.Admin, Role.Master]}
                                component={NumeroGanador}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuestas"
                                roles={[Role.Player]}
                                component={AdicionarApuesta}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuestas/:apuestaId"
                                roles={[Role.Player]}
                                component={AdicionarNumero}
                            />
                            <PrivateRoute
                                exact strict path="/usuario/apuestas/hoy/activas"
                                roles={[Role.Player]}
                                component={AdicionarApuesta}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuestas/hoy/activas/:apuestaId"
                                roles={[Role.Player]}
                                component={ApuestaActiva}
                            />
                            <PrivateRoute
                                exact path="/usuario/historial"
                                roles={[Role.Player]}
                                component={HistorialPlayer}
                            />
                            <PrivateRoute
                                exact path="/usuario/historial/:apuestaId"
                                roles={[Role.Player]}
                                component={DetallesPlayer}
                            />
                            <PrivateRoute
                                exact path="/usuario/historial/:apuestaId/desgloce"
                                roles={[Role.Player]}
                                component={DetallesPlayer}
                            />
                            <PrivateRoute
                                exact path="/usuario/password/cambiar"
                                roles={[Role.Player, Role.Asistente]}
                                component={PlayerPassword}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuesta/detalles"
                                roles={[Role.Player]}
                                component={DetallesApuesta}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuesta/comprar"
                                roles={[Role.Player]}
                                component={ComprarApuesta}
                            />
                            <PrivateRoute
                                exact path="/asistente/apuestas"
                                roles={[Role.Asistente]}
                                component={AdicionarApuestaAsistente}
                            />
                            <PrivateRoute
                                exact path="/asistente/apuesta/detalles"
                                roles={[Role.Asistente]}
                                component={DetallesAsistente}
                            />
                            <PrivateRoute
                                exact path="/asistente/apuestas/:apuestaId"
                                roles={[Role.Asistente]}
                                component={AdicionarNumeroApuestaAsistente}
                            />
                            <PrivateRoute
                                exact strict path="/asistente/apuestas/hoy/activas"
                                roles={[Role.Asistente]}
                                component={AdicionarApuestaAsistente}
                            />
                            <PrivateRoute
                                exact path="/asistente/apuestas/hoy/activas/:apuestaId"
                                roles={[Role.Asistente]}
                                component={ApuestaActivaAsistente}
                            />
                            <PrivateRoute
                                exact path="/asistente/historial"
                                roles={[Role.Asistente]}
                                component={HistorialAsistente}
                            />

                             <PrivateRoute
                                exact path="/asistente/historial/:apuestaId"
                                roles={[Role.Asistente]}
                                component={DetallesPAsistente}
                            />
                            <Route path="*" render={() => "404 NOT FOUND"}/>
                        </Switch>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;
