import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { adminService } from "../../../../../service/api/admin/admin.service";
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import { red, blue } from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import { userActions } from '../../../../../store/actions';
import AdminTitle from '../../../components/AdminTitle_Center';
import { FormatCurrencySymbol } from '../../../../../utils/__currency';
import HistorialJugadores from '../../../components/HistorialJugadores';
import HistorialJugadoreByDay from '../../../components/HistorialJugadores/HistorialJugadorByDay';

import Dollar_ON from '../../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../../View/assets/Lempiras_OFF.png';

import '../../../../../common.css'
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
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontWeight: 'bold'
    },
    textWithBorder: {
        fontWeight: 'bold',
        border: '1px solid #747474',
        margin: '1rem',
    },
    textWithBorderTop: {
        fontWeight: 'bold',
        borderTop: '1px solid #747474',
        margin: '1rem',
    },
    textBlock: {
        fontWeight: 'bold',
        display: 'block !important'
    },
    textNoDisponible: {
        fontWeight: 'bold',
        margin: '2rem',
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));

const HistorialSemanaAnteriorAdmin = (props) => {
    const classes = useStyles();
    const [weekList, setWeekList] = useState([]);
    const [week, setWeek] = useState([]);
    const [current, setCurrent] = useState(0);
    const [weekId, setWeekId] = useState('');
    const [historyType, setHistoryType] = useState('vendedor');
    const [moneda, setMoneda] = useState('lempira');
    const [colorStyle, setColorStyle] = useState('');

    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.get_historial_weeklist().then((result) => {
            if (result.data.summary) {
                let color = result.data.summary.perdidasGanas > 0 ? '#009144' : result.data.summary.perdidasGanas < 0 ? '#ED1C24' : '#4E84C8'
                setColorStyle(color)
            }
            setWeekList(result.data)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, []);

    function updateBono() {
        updateWeekResult(weekId, historyType, moneda)
    }

    function updateWeekResult(id, type, moneda_type) {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.get_historial_weekOverview(id, type, moneda_type).then((result) => {
            if (result.data.summary) {
                let currency = result.data.summary.currency.toUpperCase() === 'LEMPIRA' ? 'L' : '$'
                result.data.summary.currency = currency;
                let color = result.data.summary.perdidasGanas > 0 ? '#009144' : result.data.summary.perdidasGanas < 0 ? '#ED1C24' : '#4E84C8'
                setColorStyle(color)
            }
            setWeek(result.data)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    const handleChangeSelect = event => {
        setCurrent(event.target.selectedIndex)
        setWeekId(event.target.value)
        if (event.target.value !== '') {
            updateWeekResult(event.target.value, historyType, moneda);
        }
    };

    const changeMonedaType = (moneda_type) => {
        setMoneda(moneda_type);
        if (current > 0)
            updateWeekResult(weekList[current - 1].id, historyType, moneda_type)
    }

    const handleDolar = () => {
        if (moneda !== "dolar")
            changeMonedaType("dolar")
    }

    const handleLempira = () => {
        if (moneda !== "lempira")
            changeMonedaType("lempira")
    }

    const handleHistoryType = (type) => {
        if (historyType !== type) {
            setHistoryType(type)
            if (current > 0)
                updateWeekResult(weekList[current - 1].id, type, moneda)
        }
    }

    return (
        <React.Fragment>
            <AdminTitle titleLabel='Sorteos Pasados' />
            <Grid container maxwidth='xs' className='admin_Sorteos_Pasados'>
                <Grid className="btn_group_history_monda" >
                    <Button className={`${historyType === 'casa' ? 'select' : ''} btn_casa`} onClick={() => handleHistoryType('casa')} style={{ marginLeft: 25 }}>
                        <span className="circle ml-10"></span>
                        <span className="text">Casa</span>
                    </Button>
                    <Button className={`${historyType === 'vendedor' ? 'select' : ''} btn_casa`} onClick={() => handleHistoryType('vendedor')} style={{ marginLeft: 10 }}>
                        <span className="circle ml-10"></span>
                        <span className="text">Vendedor</span>
                    </Button>
                    <Button className="btn_dolar" onClick={() => handleDolar()} >
                        {moneda === "dolar" ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                    </Button>
                    <Button className="btn_lempiras" onClick={() => handleLempira()} >
                        {moneda !== "dolar" ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                    </Button>
                </Grid>
                <Grid container className="combo_bet">
                    <Grid item xs={12} className="combo_box">
                        <NativeSelect
                            value={weekId}
                            className="native_select"
                            onChange={handleChangeSelect}
                            input={<BootstrapInput className="bootstrap_input" />}
                        >
                            <option value='' >Busqueda por semanas</option>
                            {
                                (weekList.length > 0) && weekList.map((c, index) =>
                                    <option key={index} value={c.id} > {c.monday} - {c.sunday}</option>
                                )
                            }
                        </NativeSelect>
                    </Grid>
                    {
                        current > 0 && week.summary ?
                            <Grid item xs={12} className="week_total_text">
                                <Grid item xs={6} className="left_text">
                                    <p>Ventas:</p>
                                    <p>Comisiones:</p>
                                    <p>Sub-total:</p>
                                    <p>Premios:</p>
                                    <p>Bonos:</p>
                                    <p>Perdidas / Ganancias:</p>
                                </Grid>
                                <Grid item xs={6} className="right_text">
                                    <div className="left">
                                        <p>{week.summary.currency}</p>
                                        <p>{week.summary.currency}</p>
                                        <p>{week.summary.currency}</p>
                                        <p>{week.summary.currency}</p>
                                        <p>{week.summary.currency}</p>
                                        <p style={{ color: colorStyle }}>
                                            {week.summary.perdidasGanas > 0 ? '+' : week.summary.perdidasGanas ? '-' : ''}{week.summary.currency}
                                        </p>
                                    </div>
                                    <div className="right">
                                        <p>{FormatCurrencySymbol(week.summary.currency, week.summary.ventas.toFixed(2))}</p>
                                        <p>{FormatCurrencySymbol(week.summary.currency, week.summary.comisiones.toFixed(2))}</p>
                                        <p>{FormatCurrencySymbol(week.summary.currency, week.summary.subTotal.toFixed(2))}</p>
                                        <p>{FormatCurrencySymbol(week.summary.currency, week.summary.premios.toFixed(2))}</p>
                                        <p>{FormatCurrencySymbol(week.summary.currency, week.summary.bonos.toFixed(2))}</p>
                                        <p>{FormatCurrencySymbol(week.summary.currency, Math.abs(week.summary.perdidasGanas).toFixed(2))}</p>
                                    </div>
                                </Grid>
                            </Grid>
                            : <div></div>
                    }
                </Grid>
                {
                    current > 0 && week.jugadores &&
                    <Grid className="user_list">
                        {
                            week.jugadores.map((jugador, index) =>
                                <HistorialJugadores key={index} jugador={jugador} weekData={weekList[current - 1]} updateBono={updateBono} index={index} {...props} />
                            )
                        }
                    </Grid>
                }
                {
                    current > 0 && week.sorteosPasados &&
                    <Grid className="user_list">
                        {
                            week.sorteosPasados.map((row, index) =>
                                <HistorialJugadoreByDay key={index} casa={'casa'} apuesta={row}
                                    moneda={week.summary.currency}
                                    weekData={weekList[current - 1]} index={index} {...props} />
                            )
                        }
                    </Grid>
                }
            </Grid>
        </React.Fragment>
    )
};

export default connect()(HistorialSemanaAnteriorAdmin);