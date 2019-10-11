import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import Clock from "../../components/Clock/Clock";
import { GoSignOut } from "react-icons/go";
import authenticationService from "../../service/api/authentication/authentication.service";
import { history } from "../../_helpers/history";
import { userActions } from '../../store/actions';
import './HeaderBar.css';

class HeaderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
            redirect: false,
            isAdmin: false,
            isAsistente: false,
            isPlayer: false,
            open: false
        };
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    handleCloseAccept() {
        this.setState({ open: false });

        const { dispatch } = this.props;
        dispatch(userActions.loading_start())
        authenticationService.logout().then((result) => {
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });

        history.push('/login');
    }

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-crear-usuario"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ width: '279px', textAlign: 'center' }}
                        id="alert-dialog-crear-usuario">
                        <div className="dialogTitle">
                            <div style={{ textAlign: 'center', paddingBottom: 13, paddingTop: 35 }}>
                                <GoSignOut size={45} />
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description"
                            style={{ fontSize: 25, textAlign: 'center', color: 'black', padding: '10px 0px 15px 0px' }}
                        >
                            {`Desea salir?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ margin: '0 auto', width: '100%' }}>
                        <Button onClick={this.handleClose}
                            style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}
                            color="primary">
                            Cancelar
                                </Button>
                        <Button onClick={() => {
                            this.handleCloseAccept();
                        }}
                            style={{ fontSize: '18px', color: '#5891DC', marginRight: 10 }}
                            color="primary" autoFocus>
                            Aceptar
                                </Button>
                    </DialogActions>
                </Dialog>
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler.bind(this)}
                    logoutClickHandler={this.logoutClickHandler.bind(this)}
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                    isPlayer={this.state.isPlayer} />
                <SideDrawer show={this.state.sideDrawerOpen}
                    drawerClickHandler={this.drawerToggleClickHandler.bind(this)}
                    logoutClickHandler={this.logoutClickHandler.bind(this)}
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                />
                {backdrop}
                <Clock
                    admin={this.state.isAdmin}
                    asistente={this.state.isAsistente}
                    isPlayer={this.state.isPlayer}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ ui, user }) => {
    const { drawerType } = ui;
    const { role } = user;
    return { drawerType, role }
};

export default connect(mapStateToProps)(HeaderBar);