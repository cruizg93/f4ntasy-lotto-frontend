import React from 'react';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';
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



class App extends React.Component {
    render() {
        return (
            <div style={{height: "100%"}} className="App">
                <CssBaseline/>
                <Router>
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
                                component={Apuestas}
                            />
                             <PrivateRoute
                                exact path="/sistema"
                                component={Apuestas}
                            />
                             <PrivateRoute
                                exact path="/historial"
                                component={Apuestas}
                            />
                            <PrivateRoute
                                exact path="/jugador/nuevo"
                                component={Nuevo}
                            />
                            <PrivateRoute
                                exact path="/sistema/cambio"
                                component={Cambio}
                            />
                            <PrivateRoute
                                exact path="/sistema/password/update"
                                component={Password}
                            />
                            <PrivateRoute
                                exact path="/sistema/topes"
                                component={Fijar}
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
