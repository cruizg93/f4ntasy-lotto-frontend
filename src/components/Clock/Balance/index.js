import React, { Component } from 'react';
import { playerService } from "../../../service/api/player/player.service";
import './Balance.css';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0.0,
            symbol: "$"
        };
    }

    updateBalance() {
        playerService.get_balance().then((result) => {
            this.setState({ balance: result.data.balance, symbol: result.data.currency })
        })
    }

    componentDidMount() {
        this.balanceId = setInterval(
            () => this.updateBalance(),
            60000
        )
    }
    componentWillMount() {
        setTimeout(() => {
            this.updateBalance()
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.balanceId);
    }

    render() {
        return (
            <React.Fragment >
                <div style={{ textAlign: 'right', marginTop: '-8px' }} className={this.state.balance < 0 ? 'clock__column red__balance' : this.state.balance > 0 ? "clock__column green__balance" : "clock__column"}>
                    {this.state.symbol}{':'}{'\u00A0'}{this.state.balance}
                </div>
            </React.Fragment>
        )
    }
}

export default Balance;