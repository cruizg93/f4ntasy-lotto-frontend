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
import PlayerPassword from "./components/Player/scenes/Password/Password";
import AdicionarApuesta from './components/Player/scenes/Apuesta/Adicionar/index';
import AdicionarNumero from './components/Player/scenes/Apuesta/AdicionarNumero/index';

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
                                exact path="/"
                                component={Jugador}
                            />
                            <PrivateRoute
                                exact path="/jugadores"
                                component={Jugador}
                            />
                            <PrivateRoute
                                exact path="/apuestas"
                                roles={[Role.Admin, Role.Master]}
                                component={Apuestas}
                            />
                            <PrivateRoute
                                exact path="/sistema"
                                roles={[Role.Admin, Role.Master]}
                                component={Apuestas}
                            />
                            <PrivateRoute
                                exact path="/historial"
                                roles={[Role.Admin, Role.Master]}
                                component={Apuestas}
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
                                exact path="/usuario/apuestas/activas"
                                roles={[Role.Player]}
                                component={AdicionarApuesta}
                            />
                            <PrivateRoute
                                exact path="/usuario/apuestas/activas/:apuestaId"
                                roles={[Role.Player]}
                                component={Jugador}
                            />
                            <PrivateRoute
                                exact path="/usuario/historial"
                                roles={[Role.Player]}
                                component={Jugador}
                            />
                            <PrivateRoute
                                exact path="/usuario/password/cambiar"
                                roles={[Role.Player]}
                                component={PlayerPassword}
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
