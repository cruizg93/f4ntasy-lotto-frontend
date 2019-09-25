import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { playerService } from "../../../../../service/api/player/player.service";
import ApuestaData from '../../../components/Apuesta/index';

import AdminTitle from '../../../../Admin/components/AdminTitle_Center';
import RowList from '../../../../View/RowList'
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

    componentWillMount() {
        playerService.list_apuestas_hoy_by_username().then((result) => {
            let total = result.data.reduce((sum, row) => sum + row.total, 0);
            let comision = result.data.reduce((sum, row) => sum + row.comision, 0);
            let riesgo = result.data.reduce((sum, row) => sum + row.riesgo, 0);
            let moneda = (result.data.size > 0 && result.data[0].moneda != "LEMPIRA") ? 'L' : '$'
            this.setState({
                entry: result.data,
                values: [total, comision, riesgo],
                moneda: moneda
            })
            console.log("entry", result.data)
        })
    }
    render() {
        const col = ['Ventas:', 'Comisión:', 'Totales:'];
        return (
            <div className="player_resumen_ventas_generales">
                <Container maxWidth="xs" style={{ padding: 0 }}>
                    <AdminTitle titleLabel='Sorteos' />
                </Container>
                <Grid container
                    direction="row"
                    justify="center"
                >
                    {this.state.entry.map((apuesta, index) =>
                        <ApuestaData key={index} apuesta={apuesta} index={index} {...this.props} />
                    )}
                </Grid>
                <Container maxWidth="xs" style={{ padding: 0 }}>
                    <Grid container maxWidth="xs" className="container_summary">
                        <Grid item xs={10} className="summaryTotal" >
                            <RowList col_1={col} symbol={this.state.moneda} col_2={this.state.values} style={{ height: 95 }}></RowList>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
};

export default AdicionarApuesta;