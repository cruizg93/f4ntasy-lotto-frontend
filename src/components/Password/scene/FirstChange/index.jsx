import React, { useState } from 'react';
import './FirstChange.css';

import { utilService } from '../../../../service/api/utils/util.service';


const FirstChangePassword = ({ ...props }) => {
    const [password, setPassword] = useState('');
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    function updatePassword() {
        utilService.firstConnection(password).then((result) => {
            console.log(result.data)
        })
    }
    return (
        <React.Fragment>
            <div className="login-page">
                <div className="form">
                    <form className="login-form">
                        <input type="password" placeholder="password" name="password"
                            value={password}
                            onChange={handlePasswordChange} />
                        <button ref={btn => {
                            this.btn = btn;
                        }} onClick={updatePassword}>Acceder
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}