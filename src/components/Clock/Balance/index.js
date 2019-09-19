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
            this.setState({ balance: result.data, symbol: (result.data < 0 ? " - " : (result.data > 0 ? " + " : "")) })
        })
    }

    componentDidMount() {
        this.balanceId = setInterval(
            () => this.updateBalance(),
            100000
        )
    }

    componentWillUnmount() {
        clearInterval(this.balanceId);
    }

    render() {
        return (
            <React.Fragment >
                <div style={{ textAlign: 'right', marginTop: '-8px' }} className={this.state.balance < 0 ? 'clock__column red__balance' : this.state.balance > 0 ? "clock__column green__balance" : "clock__column"}>
                    {this.state.balance}
                </div>
            </React.Fragment>
        )
    }
}

export default Balance;