import React, {Component} from 'react';
import Cambio from './Cambio/index';
import Balance from './Balance/index';

import './Clock.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            isAdmin: false,
            isAsistente: false,
        };
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }


    options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    componentWillMount() {
        this.setState({
            isAdmin: this.props.admin,
            isAsistente: this.props.asistente,
        })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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


                    {(!this.state.isAdmin && !this.state.isAsistente) &&
                    <Balance/>

                    }
                    {this.state.isAdmin &&
                    <Cambio/>

                    }
                </div>

            </div>
        )
    }
}

export default Clock;