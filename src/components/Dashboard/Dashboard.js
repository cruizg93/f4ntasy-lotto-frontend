import React, {Component} from 'react';
import {BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';



class Dashboard extends Component {

    state = {
        sideDrawerOpen: false,
        redirect: false
    };
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };

    logoutClickHandler = () => {
        this.setState(prevState => ({
            loggedIn: !prevState.loggedIn
        }));
        // console.log("Logout clicked");
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
        this.setState({redirect: true});
    };

    componentDidMount() {

    }

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: "100%"}} className="App">
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen} logoutClickHandler={this.logoutClickHandler}/>
                {backdrop}
                <main style={{marginTop: '63px'}}>
                    <Router>
                        <Switch>
                            <Route path="/" render={
                            () => {
                                return (<div>
                                    Welcome home about
                                </div>);
                            }}/>
                        {/*<Route path={"/jugador"} exact strict*/}
                               {/*component={(props) => <Jugador {...props} isAuthed={true}/>}/>*/}

                        <Route path="/about"  render={
                            () => {
                                return (<div>
                                    Welcome About
                                </div>);
                            }
                        }/>
                        </Switch>


                    </Router>
                </main>

            </div>
        );
    }
}

export default Dashboard;