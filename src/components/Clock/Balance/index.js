import React, { Component } from 'react';
import { playerService } from "../../../service/api/player/player.service";
import { FormatNumberSymbol } from '../../../utils/__currency';
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
        const sign = this.state.balance > 0 ? '+' : this.state.balance < 0 ? '-' : ''
        const balance = FormatNumberSymbol(Math.abs(this.state.balance))
        return (
            <React.Fragment >
                <div style={{ textAlign: 'right', marginTop: '-4px' }} className={this.state.balance < 0 ? 'clock__column red__balance' : this.state.balance > 0 ? "clock__column green__balance" : "clock__column blue_balance"}>
                    {sign}{'\u00A0'}{this.state.symbol}{'\u00A0'}{'\u00A0'}{balance}
                </div>
            </React.Fragment>
        )
    }
}

export default Balance;