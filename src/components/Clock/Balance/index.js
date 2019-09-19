import React, { Component } from 'react';
import { playerService } from "../../../service/api/player/player.service";
import './Balance.css';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0.0,
            symbol: ""
        };
    }

    updateBalance() {
        playerService.get_balance().then((result) => {
            this.setState({ balance: result.data.balance, 
                symbol: (result.data.balance < 0 ? "-" : (result.data.balance > 0 ? " +" : "")) ,
                currency:result.data.currency            
            })
        })
    }

    componentDidMount() {
        this.updateBalance();
        this.balanceId = setInterval(
            () => this.updateBalance(),
            300000
        )
    }

    componentWillUnmount() {
        clearInterval(this.balanceId);
    }

    render() {
        return (
            <React.Fragment >
                <div className={this.state.balance < 0 ? 'clock__column red__balance' : this.state.balance > 0 ? "clock__column green__balance" : "clock__column"}>
                    {this.state.currency}{this.state.symbol}{this.state.balance}
                </div>
            </React.Fragment>
        )
    }
}

export default Balance;