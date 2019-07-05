import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Backdrop from '../Backdrop/Backdrop';
import {MenuLinks} from '../MenuLinks/MenuLinks';
import Button from '@material-ui/core/Button';
import {authenticationService} from "../../service/api/authentication/authentication.service";
import {Role} from "../../_helpers/role";

import './Toolbar.css';
import {history} from "../../_helpers/history";

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
            user: authenticationService.currentUserValue,
            toolbarClasses: ['toolbar']
        };
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    componentDidMount() {

        let username = this.state.user.username;
        let userType = username.charAt(0);
        switch (userType) {
            case 'P':
                if(username.indexOf("x")!==-1){
                    this.setState({toolbarClasses: ['toolbar yellow_bkg']});
                }else{
                    this.setState({toolbarClasses: ['toolbar green_bkg']});
                }
                break;
            case 'C':
                break;
            default:
                break;
        }
    }

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };

    logoutClickHandler() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        return (
            <header className={this.state.toolbarClasses}>
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        <NavLink to="/" exact strict>The Logo</NavLink>
                    </div>
                    <div className="spacer"/>
                    <div className="toolbar__navigation-items">
                        <ul>
                            <MenuLinks admin={this.props.admin}/>
                            <Button onClick={this.logoutClickHandler} color="inherit">Salir</Button>
                        </ul>
                    </div>
                    <div className="toolbar__user-username">
                        {this.state.user.username}
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