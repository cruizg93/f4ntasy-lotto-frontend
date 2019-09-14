import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Clock from "../../components/Clock/Clock";

import './HeaderBar.css';

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
            isAdmin: false,
            isAsistente: false,
            isPlayer: false,
            open: false
        };

    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false })
    };

    logoutClickHandler() {
        this.handleClickOpen();
    }

    componentWillMount() {
        let role = this.props.role || '';
        this.setState({
            isAdmin: (role === 'Admin' || role === 'Master'),
            isAsistente: role === 'Asistente',
            isPlayer: role === 'Player'
        })
    }


    handleClickOpen() {
        this.setState((prevState) => {
            return { open: !prevState.open };
        });
    }

    handleClose() {
        this.setState((prevState) => {
            return { open: !prevState.open };
        });
    }

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }
        return (
            <>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}
                    logoutClickHandler={this.logoutClickHandler}
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                    isPlayer={this.state.isPlayer} />
                <SideDrawer show={this.state.sideDrawerOpen}
                    drawerClickHandler={this.drawerToggleClickHandler}
                    logoutClickHandler={this.logoutClickHandler}
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                />
                {backdrop}
                <Clock
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                    isPlayer={this.state.isPlayer}
                />

            </>
        );
    }
}

const mapStateToProps = ({ ui, user }) => {
    const { drawerType } = ui;
    const { role } = user;
    return { drawerType, role }
};

export default connect(mapStateToProps)(HeaderBar);