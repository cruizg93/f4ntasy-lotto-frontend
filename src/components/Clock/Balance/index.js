import React, {Component} from 'react';
import {playerService} from "../../../service/api/player/player.service";


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
            <React.Fragment>
                {this.state.balance}
            </React.Fragment>
        )
    }
}

export default Balance;