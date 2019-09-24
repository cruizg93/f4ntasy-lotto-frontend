import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Button, Container } from '@material-ui/core';
import { FaUserAlt, FaLock } from "react-icons/fa";

import { userActions } from '../../store/actions';
import authenticationService from '../../service/api/authentication/authentication.service';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    error_reponse = () => {
        toast.error("Error de usuario o contraseña !", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    loginClickHandler = e => {
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            return;
        }
        const { dispatch } = this.props;
        dispatch(userActions.login(this.state, this.props.history))
    };

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    render() {
        return (
            <div className="login-page">
                <ToastContainer autoClose={8000} />
                <Container maxWidth="xs">
                    <Grid item xs={12} className="grid-username">
                        <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaUserAlt /></span>
                            </div>
                            <input type="text" id="username" className="form-control" onChange={this.onChange} value={this.state.username} placeholder="Usuario" />
                        </div>
                    </Grid>
                    <Grid item xs={12} className="grid-password">
                        <div className="input-group input-group-lg" >
                            <div className="input-group-prepend" >
                                <span className="input-group-text" ><FaLock /></span>
                            </div>
                            <input type="password" id="password" className="form-control" onChange={this.onChange} value={this.state.password} placeholder="Contraseña" />
                        </div>
                    </Grid>
                    <Grid item xs={12} className="grid-login">
                        <Button variant="contained" className="login-button" onClick={this.loginClickHandler}>
                            Iniciar Sesión
                        </Button>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default connect()(Login);