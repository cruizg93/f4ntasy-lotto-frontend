import React, {Component} from 'react';
import { NavLink, Link} from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Backdrop from '../Backdrop/Backdrop';
import {MenuLinks}  from '../MenuLinks/MenuLinks';
import Button from '@material-ui/core/Button';

import './Toolbar.css';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
            user: ''
        };
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };

    logoutClickHandler() {
        sessionStorage.setItem('userData', '');
        sessionStorage.clear();
    }

    componentDidMount(){
        let user=JSON.parse(sessionStorage.getItem('userData'));
        // console.log(user['username']);
        this.setState({user: user['username']} )
    }

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        <NavLink to="/" exact strict>The Logo</NavLink>
                    </div>
                    <div className="spacer"/>
                    <div className="toolbar__navigation-items">
                        <ul>
                            <MenuLinks/>
                            <Button component={Link} to="/login" onClick={this.logoutClickHandler} color="inherit">Salir</Button>


                        </ul>
                    </div>
                    <div className="toolbar__user-username">
                        {this.state.user}
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>
                </nav>
            </header>

        );
    }
}


export default Toolbar;