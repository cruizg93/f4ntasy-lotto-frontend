import React, {Component} from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import Clock from "../Clock/Clock";
import Container from '@material-ui/core/Container';
import {authenticationService} from "../../service/api/authentication/authentication.service";
import { utilService } from '../../service/api/utils/util.service';
import FirstChangePassword from '../Password/scene/FirstChange/index';
import {history} from "../../_helpers/history";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




import './Dashboard.css';

class Dashboard extends Component {

    state = {
        sideDrawerOpen: false,
        redirect: false,
        isAdmin: false,
        isAsistente: false,
        noFirst: true,
        open: false
    };

    constructor(props){
        super(props);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };

    componentWillMount() {
        utilService.isFirstConnection().then((result)=>{
            this.setState({noFirst : result.data});            
        })
        this.setState({
            isAdmin: (authenticationService.type_user() === 'Admin' ||
                authenticationService.type_user() === 'Master'),
            isAsistente: authenticationService.type_user() === 'Asistente'
        })
    }

    logoutClickHandler() {
        this.handleClickOpen();
    }

    handleClickOpen() {
        this.setState((prevState) => {
            return {open: !prevState.open};
        });
    }

    handleClose() {
        this.setState((prevState) => {
            return {open: !prevState.open};
        });
    }

    handleCloseAccept() {
        authenticationService.logout();
        history.push('/login');
        this.setState({open: !this.open});             
    }
    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: "100%"}} className="App">               
                    <>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-crear-usuario"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle
                                id="alert-dialog-crear-usuario">Salir</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {`Desea salir?`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                            Cancel
                                </Button>                                 
                                <Button onClick={() => {
                                    this.handleCloseAccept();  
                                }} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </Dialog> 
                         <Toolbar drawerClickHandler={this.drawerToggleClickHandler}
                            logoutClickHandler={this.logoutClickHandler}
                            admin={this.state.isAdmin}
                            asistente={this.state.isAsistente}/>
                         <SideDrawer show={this.state.sideDrawerOpen}
                            drawerClickHandler={this.drawerToggleClickHandler}
                            logoutClickHandler={this.logoutClickHandler}
                            admin={this.state.isAdmin}
                            asistente={this.state.isAsistente}
                        />
                        {backdrop}

                        <main>
                            <Clock
                                    admin={this.state.isAdmin}
                                    asistente={this.state.isAsistente}
                            />
                            <Container maxWidth="sm" className={"container__box"}>
                                {this.props.childComponent}
                            </Container>

                        </main>
                    </>
                       

            </div>
        );
    }
}

export default Dashboard;