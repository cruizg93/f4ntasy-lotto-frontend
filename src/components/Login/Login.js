import React, {Component} from 'react';

import {authenticationService} from '../../service/api/authentication/authentication.service';

import './Login.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(props) {
        super(props);
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
        this.state = {
            username: '',
            password: '',
            // redirect: false
        };
        this.loginClickHandler = this.loginClickHandler.bind(this);
    }

    error_reponse = () => {
        toast.error("Error de usuario o contraseña !", {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    loginClickHandler = (e) => {
        e.preventDefault();
        authenticationService.login(this.state.username, this.state.password)
                            .then(
                                user => {
                                    console.log(user);
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    // setSubmitting(false);
                                    // setStatus(error);
                                }
                            );
        // PostData(this.state).then((result) => {
        //     let responseJSON = result;
        //     // console.log(responseJSON);
        //     if (responseJSON.accessToken) {
        //         sessionStorage.setItem('userData', JSON.stringify(responseJSON));
        //         // this.setState({redirect: true});
        //         Auth.login(() => {
        //             this.props.history.push("/");
        //         })
        //
        //     } else {
        //         this.error_reponse()
        //     }
        // })

    };

    loginOnChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});

    };

    render() {
        return (
            <div className="login-page">
                <ToastContainer autoClose={8000} />
                <div className="form">
                    <form className="login-form">
                        <input type="text" placeholder="username" name="username" onChange={this.loginOnChangeHandler}/>
                        <input type="password" placeholder="password" name="password"
                               onChange={this.loginOnChangeHandler}/>
                        <button ref={btn => {
                            this.btn = btn;
                        }} onClick={this.loginClickHandler}>Acceder
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;