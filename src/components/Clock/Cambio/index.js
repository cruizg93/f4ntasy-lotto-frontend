import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {adminService} from "../../../service/api/admin/admin.service";
import './Cambio.css';

class Cambio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cambio: 0.0
        }
    }

    updateCambio() {
        adminService.get_current_cambio().then((result) => {
            this.setState({balance: result})

        })
    }

    componentWillMount() {
        adminService.get_current_cambio().then((result) => {
            this.setState({cambio: result.data})

        })
    }

    componentDidMount() {
        this.cambioId = setInterval(
            () => this.updateCambio(),
            5000
        )
    }

    componentWillUnmount() {
        clearInterval(this.cambioId);
    }

    clickHandler = (e) => {
        e.preventDefault();
        /* this.props.history.push('/sistema/cambio'); */
    }


    render() {
        return (
            <React.Fragment>
                <div className={"clock__column"}>      
                    <Link to="/sistema/cambio" className={"column__cambio"}>
                        {"L @ "}{this.state.cambio}
                    </Link>                                            
                </div>               
            </React.Fragment>
        )
    }
}


export default Cambio;