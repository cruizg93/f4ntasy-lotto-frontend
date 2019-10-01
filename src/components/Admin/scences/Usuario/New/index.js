import React from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './New.css';

class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        this.setState({
            open: true
        })
    }

    componentWillReceiveProps() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
        this.props.history.push("/");
    }

    handleLink(url) {
        this.setState({
            open: false
        })
        this.props.history.push(url);
    }

    render() {

        return (
            <React.Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                >
                    <DialogTitle id="confirmation-dialog-title" className="container_dialogTitle">
                        <div className="dialogTitle">
                            Tipo de vendedor
                        </div>
                    </DialogTitle>
                    <DialogContent className="container_dialogContent">

                    </DialogContent>
                    <DialogActions className="container_dialogAction">
                        <div className="action_btn">
                            <Fab onClick={() => this.handleLink('/usuario/nuevo/jugador')} className="btn_p">
                                <span >P</span>
                            </Fab>
                            <Fab onClick={() => this.handleLink('/usuario/nuevo/asistente')} className="btn_x">
                                <span >X</span>
                            </Fab>
                        </div>
                    </DialogActions>
                    <div className="cancel_btn_x">
                        <Button onClick={() => this.handleClose()} >Cancelar</Button>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default NewUser;