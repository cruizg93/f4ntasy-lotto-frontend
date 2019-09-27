import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { playerService } from "../../../../service/api/player/player.service";
import HistorialData from '../../components/Historial/index';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { FormatCurrencySymbol } from '../../../../utils/__currency';
import AdminTitle from '../../../Admin/components/AdminTitle_Center';
import './styles.css'

function createData1(numero, numeroText, valor) {
    return { numero, numeroText, valor };
}

const rows2 = [
    createData1(0, 'lun, 22 abr', 123456789),
    createData1(1, 'mar, 23 abr', -123456789),
    createData1(2, 'mie, 24 abr', 0),
    createData1(3, 'jue, 25 abr', -2060),
    createData1(4, 'vie, 26 abr', 0),
    createData1(5, 'sab, 27 abr', 0),
    createData1(6, 'dom, 28 abr', 0),
];

function createData(compras, comisiones, sub_total, premios, bonos, perdidas_Ganancias, money, days) {
    return { compras, comisiones, sub_total, premios, bonos, perdidas_Ganancias, money, days };
}

const rows1 = [
    createData(123456789, 0, 34, 0, 0, '(+verde o -rojo)', '$', rows2),
    createData(23456789, 0, 0, 33, 0, '(+verde o -rojo)', '$', rows2),
    createData(3456789, 0, 22, 0, 0, '(+verde o -rojo)', '$', rows2),
];


const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        // transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const HistorialPlayer = (props) => {
    const [entry, setEntry] = useState([]);
    const [weekList, setWeekList] = useState([]);
    const [week, setWeek] = useState([]);
    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        playerService.list_historial_apuestas().then((result) => {
            setWeekList(result.data)
            setWeekList(['1-8', '9-15', '16-21'])
            console.log(weekList)
        })
    }, []);

    const handleChangeSelect = event => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        setCurrent(index)
        console.log(entry.length)
        // let option = optionElement.getAttribute('label');
        // let placeValue = option.split("-");
        if (event.target.value !== '') {
            // adminService.count_player_asistente(event.target.value).then((result) => {
            //     console.log(placeValue)
            //     setPlaceholderUser(placeValue[0].trim() + "x" + (result.data + 1));
            // });
        } else {
            // setPlaceholderUser("P000x0");
        }
        // setEntry(event.target.value);
        setWeek(rows1);

    };
    console.log('week', week)
    return (
        <React.Fragment>
            <AdminTitle titleLabel='Sorteos Pasados' />
            <Grid container maxwidth='xs' className='player_Sorteos_Pasados'>
                <Grid container className="combo_bet">
                    <Grid item xs={12} className="combo_box">
                        <NativeSelect
                            value={current}
                            className="native_select"
                            onChange={handleChangeSelect}
                            input={<BootstrapInput className="bootstrap_input" />}
                        >
                            <option value="0" >Busqueda por semanas</option>
                            {
                                (weekList.length > 0) && weekList.map((c, index) =>
                                    <option key={index} value={index + 1} label={c}> {c}</option>
                                )
                            }
                        </NativeSelect>
                    </Grid>
                    {
                        current > 0 ?
                            <Grid item xs={12} className="week_total_text">
                                <Grid item xs={6} className="left_text">
                                    <p>Compras</p>
                                    <p>Comisiones</p>
                                    <p>Sub-total</p>
                                    <p>Premios</p>
                                    <p>Bonos</p>
                                    <p>Perdidas / Ganancias</p>
                                </Grid>
                                <Grid item xs={6} className="right_text">
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week[current - 1].money, week[current - 1].compras.toFixed(2))}</p>
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week[current - 1].money, week[current - 1].comisiones.toFixed(2))}</p>
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week[current - 1].money, week[current - 1].sub_total.toFixed(2))}</p>
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week[current - 1].money, week[current - 1].premios.toFixed(2))}</p>
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week[current - 1].money, week[current - 1].bonos.toFixed(2))}</p>
                                    <p>{week[current - 1].money}{'\u00A0'}{'\u00A0'}{week[current - 1].perdidas_Ganancias}</p>
                                </Grid>
                            </Grid>
                            : null
                    }
                </Grid>
                {
                    current > 0 && week[current - 1].days.map((apuesta, index) =>
                        <HistorialData key={index} apuesta={apuesta} money={week[current - 1].money} index={index} {...props} />
                    )
                }
            </Grid>
        </React.Fragment>
    )
};

export default HistorialPlayer;