import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Container } from '@material-ui/core';
import { FaUserAlt, FaLock } from "react-icons/fa";

import { userActions } from '../../store/actions';
import { GiInfo } from "react-icons/gi";
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.entryInputNameRef = React.createRef();
        this.entryInputPasswordRef = React.createRef();
        this.entryButtonCreateRef = React.createRef();
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

    handleKeyDownName = (e) => {
        if (e.key === 'Enter') {
            this.entryInputPasswordRef.current.focus();
        }
    }

    handleKeyDownPassword = (e) => {
        if (e.key === 'Enter') {
            this.entryButtonCreateRef.current.focus();
        }
    }

    render() {
        return (
            <div className="login-page">
                <ToastContainer autoClose={8000} />
                <Container maxwidth="xs">
                    <input name="DummyUsername" type="text" style={{ display: 'none' }} />
                    <input name="DummyPassword" type="password" style={{ display: 'none' }} />
                    <Grid item xs={12} className="grid-username">
                        <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaUserAlt /></span>
                            </div>
                            <input type="text" id="username" className="form-control"
                                onChange={this.onChange}
                                value={this.state.username}
                                onKeyPress={this.handleKeyDownName}
                                ref={this.entryInputNameRef}
                                autoFocus
                                placeholder="Usuario" />
                        </div>
                    </Grid>
                    <Grid item xs={12} className="grid-password">
                        <div className="input-group input-group-lg" >
                            <div className="input-group-prepend" >
                                <span className="input-group-text" ><FaLock /></span>
                            </div>
                            <input type="password" id="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.password}
                                onKeyPress={this.handleKeyDownPassword}
                                ref={this.entryInputPasswordRef}
                                placeholder="Contraseña" />
                        </div>
                    </Grid>
                    <Grid item xs={12} className="grid-login">
                        <div tabIndex="1">
                            <button variant="contained" className="login-button"
                                ref={this.entryButtonCreateRef}
                                onClick={this.loginClickHandler}
                            >
                                Iniciar Sesión
                        </button>
                        </div>
                    </Grid>
                    {
                        this.props.loginFail &&
                        <Grid item xs={12} className="grid-login-fail">
                            <div className='icon'>
                                <GiInfo size={45} style={{ color: "#ff3333" }} />
                            </div>
                            <div className='text'>
                                <span>
                                    La combinación de usuario y contraseña que ha usado no es valida, trate de nuevo! si el problema persiste llame a su agente.
                            </span>
                            </div>
                        </Grid>
                    }
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    const { loginState, loginFail, role } = user;
    return { loginState, loginFail, role }
};
export default connect(mapStateToProps)(Login);