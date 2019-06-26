import React, {Component} from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import Clock from "../Clock/Clock";


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
                    <Clock/>
                    {this.props.childComponent}
                </main>

            </div>
        );
    }
}

export default Dashboard;