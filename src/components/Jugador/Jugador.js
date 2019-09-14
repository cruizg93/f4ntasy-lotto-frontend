import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Container } from '@material-ui/core'

import { adminService } from "../../service/api/admin/admin.service";
import JugadorDataShow from './components/JugadorEntry/index';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MainStyles } from '../View/MainStyles';
import { FaUserPlus } from 'react-icons/fa';
import PageTitle from '../View/PageTitle';

import 'react-toastify/dist/ReactToastify.css';
import './Jugador.css';
class Jugador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jugadorList: [],
            password: '',
            totalsMoney: 0
        };
    }
    toast_notification = (type) => {
        if (type === "success") {
            toast.success("Usuario eliminado !", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("Existen apuestas activas asociadas al usuario", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    update_totalsMoney() {
        const totals = this.state.jugadorList.reduce((acc, row) => acc + row.total, 0)
        this.setState({
            ...this.state,
            totalsMoney: totals
        })
    }

    reload() {
        adminService.list_players_details().then((result) => {

            this.toast_notification("success");
            this.setState({
                jugadorList: Array.from(result.data)
            });
            this.update_totalsMoney()
        })
    }

    componentDidMount() {
        adminService.list_players_details().then((result) => {
            console.log('jagadorList', Array.from(result.data))
            this.setState({
                jugadorList: Array.from(result.data)
            });
            this.update_totalsMoney()
        })
    }

    render() {
        return (
            <div>
                <ToastContainer autoClose={8000} />
                <Container maxWidth="sm" className="resumen_container">
                    <Grid container
                        direction="row"
                        className="resumen_header"
                    >
                        <Typography variant="h5" className="resume_title">
                            Resumen Vendedores
                        </Typography>
                        <Button color="primary" className="resume_create_btn"
                            component={Link}
                            to={
                                {
                                    pathname: `/usuario/nuevo`,
                                }
                            }
                        >
                            <FaUserPlus className="resumen_create_icon" />
                        </Button>
                    </Grid>
                    <Grid className="resumen_total">
                        <span className="resumen_total_text">Totales:</span>
                        <span className="resumen_total_val">${'\u00A0'}{'\u00A0'}{this.state.totalsMoney}</span>
                    </Grid>
                    <Grid container spacing={1}
                        direction="row"
                    >
                        {this.state.jugadorList.map((jugador, index) =>
                            <JugadorDataShow key={index} {...jugador} {...this.props} handler={this.reload} toast={this.toast_notification} />
                        )}
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default connect()(Jugador);