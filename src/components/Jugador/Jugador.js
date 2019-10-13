import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Container } from '@material-ui/core'

import { adminService } from "../../service/api/admin/admin.service";
import authenticationService from '../../service/api/authentication/authentication.service';
import { FormatNumberSymbol } from '../../utils/__currency';
import { Currency } from '../../utils/__currency';
import JugadorDataShow from './components/JugadorEntry/index';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FaUserPlus } from 'react-icons/fa';

import { userActions } from '../../store/actions';

import 'react-toastify/dist/ReactToastify.css';
import './Jugador.css';
import { css } from "glamor";
class Jugador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jugadorList: [],
            password: '',
            totalsMoney: 0,
            totalsDolar: 0,
            totalsLempira: 0,
            apuestaCurrency: '$'
        };
    }
    toast_notification = (type) => {
        if (type === "success") {
            toast.success("Usuario eliminado !", {
                className: css({
                    background: "#5891DC !important"
                }),
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
        const apuestaCurrency = this.state.jugadorList[0].monedaType.toLowerCase() === "lempira" ? Currency.Lempira : Currency.Dollar;
        this.setState({
            ...this.state,
            apuestaCurrency: apuestaCurrency,
            totalsMoney: totals
        })
    }

    reload() {
        const { dispatch } = this.props;
        dispatch(userActions.loading_start())

        adminService.list_players_details().then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else {
                this.toast_notification("success");
                this.setState({
                    jugadorList: Array.from(result.data.jugadores),
                    totalsDolar: result.data.totalDolar,
                    totalsLempira: result.data.totalLempira
                });
                this.update_totalsMoney()
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(userActions.loading_start())
        adminService.list_players_details().then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else {
                this.setState({
                    jugadorList: Array.from(result.data.jugadores),
                    totalsDolar: result.data.totalDolar,
                    totalsLempira: result.data.totalLempira
                });
                this.update_totalsMoney()
            }
            dispatch(userActions.loading_end())
            window.scrollTo(0, 0);

        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    render() {
        return (
            <div>
                <ToastContainer autoClose={3000} />
                <Container maxwidth="xs" className="resumen_container">
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
                        <span className="resumen_total_text">{'$'}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(this.state.totalsDolar)}</span>
                        <span className="resumen_total_val">{'L'}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(this.state.totalsLempira)}</span>
                    </Grid>
                    <Grid container maxwidth="xs" direction="row">
                        {this.state.jugadorList.map((jugador, index) =>
                            <JugadorDataShow key={index} {...jugador} {...this.props} handler={this.reload.bind(this)} toast={this.toast_notification} />
                        )}
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default connect()(Jugador);