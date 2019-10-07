import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core'
import { configureStore } from './store';
import RouteApp from './container/RouteApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <Container maxwidth="xs" className="app-main">
                <Provider store={configureStore()}>
                    <Router>
                        <Route path="/" component={RouteApp} />
                    </Router>
                </Provider>
            </Container>
        );
    }
}

export default App;
