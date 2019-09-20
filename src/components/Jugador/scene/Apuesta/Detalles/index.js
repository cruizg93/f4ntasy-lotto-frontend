import React, { useState, useEffect, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { IoIosContact } from "react-icons/io";
import { adminService } from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';

import { Currency } from '../../../../../utils/__currency';
import AdminTitle from '../../../../Admin/components/AdminTitle';
import RowList from '../../../../View/RowList'

import './styles.css'

const userNameReducer = (state, action) => {
    return state;
}

const JugadorDetalles = ({ ...props }) => {

    const [apuestasList, setApuestasList] = useState([]);
    const [name, setName] = useState('');
    const [moneda, setMoneda] = useState("L");
    const username = useReducer(userNameReducer, props.location.state.username);

    const [values, setValues] = useState([]);
    const col = ['Ventas:', 'Comisión:', 'Totales:'];
    useEffect(() => {
        adminService.list_apuestas_details(username[0]).then((result) => {
            setApuestasList(Array.from(result.data.sorteos));
            setName(result.data.name);
            setMoneda((result.data.moneda === "LEMPIRAS" || result.data.moneda === "L") ? Currency.Lempiras : Currency.Dollar);
            let total = result.data.sorteos.reduce((sum, row) => sum + row.total, 0);
            let comision = result.data.sorteos.reduce((sum, row) => sum + row.comision, 0);
            let riesgo = result.data.sorteos.reduce((sum, row) => sum + row.riesgo, 0);
            setValues([total, comision, riesgo])
        })
    }, [])
    return (
        <React.Fragment>
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Resumen Venta Individual' />
            </Container>
            <Container maxWidth="xs" className="container_individual">
                <Grid item xs={12} className="userInfo" >
                    <span>
                        {username}{" - "}{moneda.symbol}
                        {'\u00A0'}{"[ "}{name.length > 15 ? name.substring(0, 14) : name}{" ]"}
                    </span>
                </Grid>
                <Grid container className="body">
                    {apuestasList.map((apuesta, index) =>
                        <JugadorDetallesEntry key={index} {...apuesta} index={index}
                            username={props.location.state.username}
                            moneda={moneda.symbol}
                            name={name.length > 15 ? name.substring(0, 14) : name}
                            {...props} />
                    )}
                </Grid>
            </Container>
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <Grid container maxWidth="xs" className="container_summary">
                    <Grid item xs={10} className="summaryTotal" >
                        <RowList col_1={col} symbol={moneda.symbol} col_2={values} style={{ height: 95 }}></RowList>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default JugadorDetalles;