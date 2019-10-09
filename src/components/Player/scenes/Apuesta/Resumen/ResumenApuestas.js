import React from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import { FormatCurrency } from '../../../../../utils/__currency';
import { Colors } from '../../../../../utils/__colors';
import './styles.css'
const useStyles = makeStyles({
    apuestaList: {
        width: "100%",
    },
    resumenCompraContainer: {
        backgroundColor: "#f4f4f4",
        paddingTop: "0.65rem",
    },
    resumenCompraText: {
        textAlign: "left",
        color: "#999999",
        lineHeight: "0.85",
        paddingBottom: "0.65rem",
        fontSize: '1.1rem'
    },
    resumenCompraValue: {
        color: Colors.Jugador_Blue,
        lineHeight: "0.85",
        paddingBottom: "0.65rem",
        fontSize: '1.1rem'
    }
});

function ResumenApuestas(props) {
    // const paddingBottom = props.paddingBottom ? props.paddingBottom : 0;
    const marginL = props.marginL ? props.marginL : 0;
    return (
        <div className="userP_apuntada_resume">
            <div style={{ marginLeft: marginL }}></div>
            <div className="left">
                <div>Costo:</div>
                <div>Comision:</div>
                <div>Total:</div>
            </div>
            <div className="middle">
                <div>L</div>
                <div>L</div>
                <div>L</div>
            </div>
            <div className="right">
                <div>
                    {FormatCurrency(props.apuestaCurrency, props.costoTotal)}
                </div>
                <div>
                    {FormatCurrency(props.apuestaCurrency, props.comisionTotal)}
                </div>
                <div>
                    {FormatCurrency(props.apuestaCurrency, props.total)}
                </div>
            </div>
        </div>
    )

}

export default ResumenApuestas;