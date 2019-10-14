import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { playerService } from "../../../../../service/api/player/player.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import ApuestaData from '../../../components/Apuesta/index';

import AdminTitle from '../../../../Admin/components/AdminTitle_Center';
import RowList from '../../../../View/RowList'
import { userActions } from '../../../../../store/actions';
import './styles.css'

class AdicionarApuesta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: [],
            values: [],
            moneda: 'L'
        }
    }

    componentDidMount() {
        if (this.props.firstConnection === true) {
            authenticationService.logout();
        }
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(userActions.loading_start())
        playerService.list_apuestas_hoy_by_username().then((result) => {
            if (result.status === 401) {
                authenticationService.logout();
            } else {
                let total = result.data.reduce((sum, row) => sum + row.total, 0);
                let comision = result.data.reduce((sum, row) => sum + row.comision, 0);
                let riesgo = result.data.reduce((sum, row) => sum + row.riesgo, 0);
                let moneda = ((result.data.length > 0) && (result.data[0].moneda.indexOf("LEMPIRA") === 0)) ? 'L' : '$'
                this.setState({
                    entry: result.data,
                    values: [total, comision, riesgo],
                    moneda: moneda
                })
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }
    render() {
        const col = ['Ventas:', 'Comisión:', 'Totales:'];
        return (
            <>
                <AdminTitle titleLabel='Sorteos' />
                <div className="player_resumen_ventas_generales">
                    <Grid container style={{ maxWidth: 444 }}>
                        <Grid item xs={12} className="empty_border">

                        </Grid>
                        {this.state.entry.map((apuesta, index) =>
                            <ApuestaData key={index} apuesta={apuesta} index={index} {...this.props} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Container maxwidth="xs" style={{ padding: 0 }}>
                        <Grid container maxwidth="xs" className="container_summary">
                            <Grid item xs={10} className="summaryTotal" >
                                <RowList col_1={col} symbol={this.state.moneda} col_2={this.state.values} style={{ height: 95 }}></RowList>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </>
        )
    }
};

const mapStateToProps = ({ user }) => {
    const { loginState, firstConnection, role } = user;
    return { loginState, firstConnection, role }
};

export default connect(mapStateToProps)(AdicionarApuesta);