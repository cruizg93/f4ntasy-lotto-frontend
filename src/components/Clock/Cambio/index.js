import React, {Component} from 'react';
import {adminService} from "../../../service/api/admin/admin.service";


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


    render() {
        return (
            <React.Fragment>
                <div className={'clock__column'}>                    
                         {"L @ "}{this.state.cambio}                   
                </div>               
            </React.Fragment>
        )
    }
}


export default Cambio;