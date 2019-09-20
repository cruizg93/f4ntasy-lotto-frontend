import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { Currency } from '../../../../../utils/__currency';
import { FormatCurrencySymbol } from '../../../../../utils/__currency';

import './styles.css'

// const ApuestaActivaRiesgoEntry = ({ numero, dineroApostado, posibleRiesgo, totalRiesgo, moneda, total, ...props }) => {
class ApuestaActivaRiesgoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortFilter: 0
        }
    }

    dataFilter = () => {
        this.setState({
            sortFilter: (this.state.sortFilter + 1) % 3
        })
    }

    desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el, index) => el[0]);
    }

    getSorting(order) {
        if (order === 0)
            return (a, b) => -this.desc(a, b, 'numero')
        return (order === 1) ? (a, b) => this.desc(a, b, 'totalRiesgo') : (a, b) => -this.desc(a, b, 'totalRiesgo');
    }

    render() {
        const symbol = this.props.moneda && this.props.moneda === 'dolar' ? '$' : 'L';
        return (
            <div className="container_table_ventas">
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Ventas</th>
                            <th>Premio</th>
                            <th className="riesgo" onClick={() => this.dataFilter()}>Riesgo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.stableSort(this.props.riesgoList, this.getSorting(this.state.sortFilter)).slice()
                                .map((numero, index) => {
                                    return (
                                        <>
                                            {
                                                this.props.numeroMaxRiesgo === numero.numero ?
                                                    <tr className="highlighted">
                                                        <td className="numero">{numero.numero.toString().padStart(2, "0")}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.posiblePremio.toFixed(2))}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.dineroApostado.toFixed(2))}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.totalRiesgo.toFixed(2))}</td>
                                                    </tr>
                                                    :
                                                    <tr>
                                                        <td className="numero">{numero.numero.toString().padStart(2, "0")}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.posiblePremio.toFixed(2))}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.dineroApostado.toFixed(2))}</td>
                                                        <td>{symbol}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(this.props.moneda, numero.totalRiesgo.toFixed(2))}</td>
                                                    </tr>
                                            }
                                        </>
                                    );
                                })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};

export default ApuestaActivaRiesgoEntry;