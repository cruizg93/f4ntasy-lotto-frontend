import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { playerService } from "../../../../../service/api/player/player.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import ApuestaData from '../../../components/Apuesta/index';

import AdminTitle from '../../../../Admin/components/AdminTitle_Center';
import { userActions } from '../../../../../store/actions';
import './styles.css'

class AdicionarApuestaAsistente extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entry: [],
        }
    }

    componentDidMount() {
        if (this.props.firstConnection === true) {
            authenticationService.logout()
        }
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(userActions.loading_start())
        playerService.list_apuestas_asistente_hoy_by_username().then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else {
                this.setState({
                    entry: result.data,
                })
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }
    render() {
        return (
            <>
                <AdminTitle titleLabel='Sorteos' />
                <div className="asistente_resumen_ventas_generales">
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
                </div>
            </>
        )
    }
};


const mapStateToProps = ({ user }) => {
    const { firstConnection } = user;
    return { firstConnection }
};
export default connect(mapStateToProps)(AdicionarApuestaAsistente);
