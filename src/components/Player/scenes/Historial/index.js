import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { playerService } from "../../../../service/api/player/player.service";
import HistorialData from '../../components/Historial/index';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import NativeSelect from '@material-ui/core/NativeSelect';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { FormatCurrencySymbol } from '../../../../utils/__currency';
import AdminTitle from '../../../Admin/components/AdminTitle_Center';
import { userActions } from '../../../../store/actions';
import './styles.css'

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
    const [weekId, setWeekId] = useState('');

    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.list_historial_weeks().then((result) => {
            setWeekList(result.data)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, []);

    const handleChangeSelect = event => {
        setCurrent(event.target.selectedIndex)
        setWeekId(event.target.value)
        if (event.target.value !== '') {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            playerService.weekOverview_jugador(event.target.value).then((result) => {
                let currency = result.data.summary.currency === 'LEMPIRA' ? 'L' : '$'
                result.data.summary.currency = currency;
                setWeek(result.data)
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        } else {
            // setPlaceholderUser("P000x0");
        }
        // setEntry(event.target.value);

    };
    return (
        <React.Fragment>
            <AdminTitle titleLabel='Sorteos Pasados' />
            <Grid container maxwidth='xs' className='player_Sorteos_Pasados'>
                <Grid container className="combo_bet">
                    <Grid item xs={12} className="combo_box">
                        <NativeSelect
                            value={weekId}
                            className="native_select"
                            onChange={handleChangeSelect}
                            input={<BootstrapInput className="bootstrap_input" />}
                        >
                            <option key={0} value="0" >Busqueda por semanas</option>
                            {
                                (weekList.length > 0) && weekList.map((c, index) =>
                                    <option key={index + 1} value={c.id}> {c.monday} - {c.sunday}</option>
                                )
                            }
                        </NativeSelect>
                    </Grid>
                    {
                        current > 0 && week.summary ?
                            <Grid item xs={12} className="week_total_text">
                                <Grid item xs={6} className="left_text">
                                    <p>Compras</p>
                                    <p>Comisiones</p>
                                    <p>Sub-total</p>
                                    <p>Premios</p>
                                    <p>Bonos</p>
                                    <p>Perdidas / Ganancias:</p>
                                </Grid>
                                <Grid item xs={6} className="right_text">
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.ventas.toFixed(2))}</p>
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.comisiones.toFixed(2))}</p>
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.subTotal.toFixed(2))}</p>
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.premios.toFixed(2))}</p>
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.bonos.toFixed(2))}</p>
                                    <p>{week.summary.currency}{'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(week.summary.currency, week.summary.perdidasGanas.toFixed(2))}</p>
                                </Grid>
                            </Grid>
                            : null
                    }
                </Grid>
                {
                    current > 0 && week.sorteosPasados && week.sorteosPasados.map((apuesta, index) =>
                        <HistorialData key={index} apuesta={apuesta} money={week.summary.currency} index={index} {...props} />
                    )
                }
            </Grid>
        </React.Fragment>
    )
};

export default connect()(HistorialPlayer);