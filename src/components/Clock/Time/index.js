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
            100000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    render() {
        return (
            <>
                <div className={'clock__column'} style={{ textAlign: 'left', marginTop: '-8px' }}>
                    {this.props.current_day.toLowerCase()}
                </div>
                <div className={'clock__column'} style={{ marginTop: '-8px' }}>
                    {this.props.current_time.toLowerCase()}
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