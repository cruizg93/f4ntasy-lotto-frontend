import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeActions } from '../../../store/actions';

class Time extends Component {

    updateTime() {
        const { dispatch } = this.props;
        dispatch(timeActions.time())
    }

    componentWillMount() {
        this.updateTime()
    }

    componentDidMount() {
        this.timeId = setInterval(
            () => this.updateTime(),
            30000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    render() {
        return (
            <>
                <div className={'clock__column'}>
                    {this.props.current_day}
                </div>
                <div className={'clock__column'}>
                    {this.props.current_time}
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ date_time }) => {
    const { current_day, current_time } = date_time;
    return { current_day, current_time }
};
export default connect(mapStateToProps)(Time);