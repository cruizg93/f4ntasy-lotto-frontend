import React, {Component} from 'react';
import './Clock.css';
import axios from 'axios';
import {playerService} from "../../service/api/player/player.service";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            balance: 0.0
        };
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    updateBalance() {
        playerService.get_balance().then((result) => {
            this.setState({balance: result})
        })
    }


    options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.balanceId = setInterval(
            () => this.updateBalance(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        clearInterval(this.balanceId);
    }


    render() {

        return (
            <div className={'clock__row'}>
                <div className={'clock__column'}>
                    {this.monthNames[this.state.time.getMonth()] + " " + this.state.time.getUTCDate() + ", " + this.state.time.getFullYear()}
                </div>
                <div className={'clock__column'}>
                    {
                        this.state.time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                    }


                </div>
                <div className={'clock__column'}>
                    Otro
                </div>

            </div>
        )
    }
}

export default Clock;