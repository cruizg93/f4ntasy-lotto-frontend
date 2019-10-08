import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@material-ui/core/Container';
import { adminService } from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';

import { Currency } from '../../../../../utils/__currency';
import AdminTitle from '../../../../Admin/components/AdminTitle';
import RowList from '../../../../View/RowList'
import { userActions } from '../../../../../store/actions';
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
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.list_apuestas_details(username[0]).then((result) => {
            setApuestasList(Array.from(result.data.sorteos));
            setName(result.data.name);
            setMoneda((result.data.moneda === "LEMPIRA" || result.data.moneda === "L") ? Currency.Lempira : Currency.Dollar);
            let total = result.data.sorteos.reduce((sum, row) => sum + row.total, 0);
            let comision = result.data.sorteos.reduce((sum, row) => sum + row.comision, 0);
            let riesgo = result.data.sorteos.reduce((sum, row) => sum + row.riesgo, 0);
            setValues([total, comision, riesgo])
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, [])

    const updateApuestasActivas = (monedaType) => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())

        adminService.list_apuestas_details(username[0]).then((result) => {
            setApuestasList([]);
            setApuestasList(Array.from(result.data.sorteos));
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function toast_notification(type) {
        if (type === "success") {
            toast.success("Numero adcionado", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error("Numero incorrecto", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <Container maxwidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Resumen Venta Individual' iconName='IoIosContact' />
            </Container>
            <Container maxwidth="xs" className="container_individual">
                <Grid item xs={12} className="userInfo" >
                    <span>
                        {username[0]}{" - "}{moneda.symbol}
                        {'\u00A0'}{"[ "}{name.length > 15 ? name.substring(0, 14) : name}{" ]"}
                    </span>
                </Grid>
                <Grid container className="body">
                    {apuestasList.map((apuesta, index) =>
                        <JugadorDetallesEntry key={index} {...apuesta} index={index}
                            moneda={moneda.symbol}
                            name={name.length > 15 ? name.substring(0, 14) : name}
                            update={updateApuestasActivas}
                            toast={toast_notification}
                            {...props} />
                    )}
                </Grid>
            </Container>
            <Container maxwidth="xs" style={{ padding: 0 }}>
                <Grid container maxwidth="xs" className="container_summary">
                    <Grid item xs={10} className="summaryTotal" >
                        <RowList col_1={col} symbol={moneda.symbol} col_2={values} style={{ height: 95 }}></RowList>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default connect()(JugadorDetalles);