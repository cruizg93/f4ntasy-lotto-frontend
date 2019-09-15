import React, { useState, useEffect, useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { adminService } from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';
import { Colors } from '../../../../../utils/__colors'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PageTitle from '../../../../View/PageTitle';
import { Currency } from '../../../../../utils/__currency';
import { FormatCurrency } from '../../../../../utils/__currency';

import AdminTitle from '../../../../Admin/components/AdminTitle';

import './styles.css'

const userNameReducer = (state, action) => {
    return state;
}

const JugadorDetalles = ({ ...props }) => {
    const [apuestasList, setApuestasList] = useState([]);
    const [name, setName] = useState('');
    const [moneda, setMoneda] = useState("L");
    const username = useReducer(userNameReducer, props.location.state.username);

    useEffect(() => {
        adminService.list_apuestas_details(username[0]).then((result) => {
            setApuestasList(Array.from(result.data.sorteos));
            setName(result.data.name);
            setMoneda((result.data.moneda === "LEMPIRAS" || result.data.moneda === "L") ? Currency.Lempiras : Currency.Dollar);
        })
    }, [])
    return (
        <React.Fragment>
            <AdminTitle titleLabel='Resumen Venta Individual' />
            <Container maxWidth="sm" style={{ padding: '0px' }}>
                <Grid item={11} className="userInfo" >
                    <span>
                        {username}{" - "}{moneda.symbol}
                        {'\u00A0'}{"[ "}{name.length > 15 ? name.substring(0, 14) : name}{" ]"}
                    </span>
                </Grid>
                <Grid container >
                    {apuestasList.map((apuesta, index) =>
                        <JugadorDetallesEntry key={index} {...apuesta} index={index}
                            username={props.location.state.username}
                            moneda={moneda.symbol}
                            {...props} />
                    )}
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default JugadorDetalles;