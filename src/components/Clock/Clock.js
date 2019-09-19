import React, { Component } from 'react';
import Cambio from './Cambio/index';
import Balance from './Balance/index';
import Time from './Time/index';


import './Clock.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            isAdmin: false,
            isAsistente: false,
            isPlayer: false,
        };
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }


    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
            isPlayer: this.props.player,
        })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    render() {

        return (
            <div className={'clock__row'}>
                <Time />

                {(!this.state.isAdmin && !this.state.isAsistente) &&
                    <Balance />
                }
                {this.state.isAdmin &&
                    <Cambio />
                }
            </div>
        )
    }
}

export default Clock;