import React, { useState, useEffect } from 'react';
import './FirstChange.css';

import { utilService } from '../../../../service/api/utils/util.service';
import { authenticationService } from '../../../../service/api/authentication/authentication.service';
import { history } from "../../../../_helpers/history";

const FirstChangePassword = ({ ...props }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    useEffect(() => {
        setUsername(authenticationService.currentUserValue.username);
    })
    function updatePassword() {        
        if (password !== '') {
            utilService.firstConnection(password).then((result) => {
                authenticationService.logout();
                history.push('/login');
            })
        }
    }
    return (
        <React.Fragment>
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="Password" placeholder="Password" name="password"
                            value={password}
                            onChange={handlePasswordChange} />
                        <button onClick={updatePassword}>Acceder
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FirstChangePassword;