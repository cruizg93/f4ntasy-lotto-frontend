import React, {Component} from 'react';
import {playerService} from "../../../service/api/player/player.service";
import './Balance.css';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0.0
        };
    }

    updateBalance() {
        playerService.get_balance().then((result) => {
            this.setState({balance: result.data})
        })
    }

    componentDidMount() {
        this.balanceId = setInterval(
            () => this.updateBalance(),
            60000
        )
    }

    componentWillUnmount() {
        clearInterval(this.balanceId);
    }

    render() {
        return (
            <React.Fragment >
                <div className={this.state.balance < 0 ? 'clock__column red__balance' : this.state.balance > 0 ? "clock__column green__balance" : "clock__column"}>                    
                    {this.state.balance}                 
                </div>                           
            </React.Fragment>
        )
    }
}

export default Balance;