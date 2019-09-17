import React, { Component } from 'react';
import { timeService } from "../../../service/api/time/time.service";

class Time extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: "",
            date: ""
        }
    }

    updateTime() {
        timeService.time().then((result) => {
            this.setState({ time: result.data.time, date: result.data.formatDate })
        })

    }

    componentWillMount() {
        timeService.time().then((result) => {
            this.setState({ time: result.data.time, date: result.data.formatDate })
        })
    }

    componentDidMount() {
        this.timeId = setInterval(
            () => this.updateTime(),
            100000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }


    render() {
        return (
            <React.Fragment>
                <div className={'clock__column'}>
                    {this.state.date}
                </div>
                <div className={'clock__column'}>
                    {this.state.time}
                </div>
            </React.Fragment>
        )
    }
}


export default Time;