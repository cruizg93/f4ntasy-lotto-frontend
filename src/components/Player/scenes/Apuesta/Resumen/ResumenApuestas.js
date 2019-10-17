import React from 'react';
import { FormatNumberSymbol } from '../../../../../utils/__currency';
import './styles.css'

function ResumenApuestas(props) {
    // const paddingBottom = props.paddingBottom ? props.paddingBottom : 0;
    const marginL = props.marginL ? props.marginL : 0;
    const currencySymbol = props.apuestaCurrency ? props.apuestaCurrency.symbol : 'L'
    return (
        <div className="userP_apuntada_resume">
            <div style={{ marginLeft: marginL }}></div>
            <div className="left">
                <div>Costo:</div>
                <div>Comision:</div>
                <div>Total:</div>
            </div>
            <div className="middle">
                <div>{currencySymbol}</div>
                <div>{currencySymbol}</div>
                <div>{currencySymbol}</div>
            </div>
            <div className="right">
                <div>
                    {FormatNumberSymbol(props.costoTotal)}
                </div>
                <div>
                    {FormatNumberSymbol(props.comisionTotal)}
                </div>
                <div>
                    {FormatNumberSymbol(props.total)}
                </div>
            </div>
        </div>
    )

}

export default ResumenApuestas;