import React, {Component} from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import Clock from "../Clock/Clock";
import Container from '@material-ui/core/Container';
import {authenticationService} from "../../service/api/authentication/authentication.service";
import { utilService } from '../../service/api/utils/util.service';
import FirstChangePassword from '../Password/scene/FirstChange/index';

import './Dashboard.css';

class Dashboard extends Component {

    state = {
        sideDrawerOpen: false,
        redirect: false,
        isAdmin: false,
        isAsistente: false,
        noFirst: true
    };
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

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: "100%"}} className="App">               
                    <>
                         <Toolbar drawerClickHandler={this.drawerToggleClickHandler}
                            admin={this.state.isAdmin}
                            asistente={this.state.isAsistente}/>
                         <SideDrawer show={this.state.sideDrawerOpen}
                            drawerClickHandler={this.drawerToggleClickHandler}
                            admin={this.state.isAdmin}
                            asistente={this.state.isAsistente}
                        />
                        {backdrop}

                        <main style={{marginTop: '63px'}}>
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