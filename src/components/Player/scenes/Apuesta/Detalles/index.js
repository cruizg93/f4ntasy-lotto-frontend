import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { red, blue } from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import { withStyles } from "@material-ui/core/styles/index";
import { playerService } from "../../../../../service/api/player/player.service";
import ShowDetallesApuesta from '../../../components/Detalles/index';
import { printDocument6 } from "../../../../../_helpers/print";
import HeaderDescription from "../../../../HeaderDescription/index";
import { Colors } from "../../../../../utils/__colors";
import { LocalPrintshop } from "@material-ui/icons";
import Fab from '@material-ui/core/Fab';

import DetailTitle from '../../../../Admin/components/DetailTitle'
import TopBar from '../../../../View/jugador/TopBarDetails';
import { Currency, FormatCurrency } from '../../../../../utils/__currency';
import { userActions } from '../../../../../store/actions';

import './styles.css'

const DetallesApuesta = ({ ...props }) => {
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    const [apuestaType, setApuestaType] = useState("Diaria");
    const [moneda, setMoneda] = useState(" $ ");
    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
            setList(Array.from(result.data));
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
        setTitle(props.location.state.title.title);
        setApuestaType(props.location.state.type);
        setMoneda(props.location.state.moneda);

        window.scrollTo(0, 0)
    }, []);

    function handleOnPrint() {
        const input = document.getElementById("apuesta-activa-numeros-detalles");
        printDocument6(input, title + '-activa-detalles');
    }

    const update = () => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
            setList([]);
            setList(Array.from(result.data));
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }
    return (
        <div className="ventas_activas_detalles" >
            <DetailTitle titleLabel="Detalle" />
            <TopBar
                apuestaType={apuestaType}
                hour={props.location.state.hour}
                day={props.location.state.day}
                top={152}
            />
            <Grid container
                direction="row"
                justify="center"
            >
                <Grid item xs={12} id="apuesta-activa-numeros-detalles">
                    {list.map((apuestaDetail, index) =>
                        <ShowDetallesApuesta key={index} {...apuestaDetail} index={index} moneda={moneda}
                            update={update}
                            {...props}
                        />
                    )}
                </Grid>
                <div className="fixedFooter">
                    <Fab className="localPrintshop" onClick={handleOnPrint} >
                        <LocalPrintshop className="iconP" />
                        <span className="textP">Imprimir</span>
                    </Fab>
                </div>
            </Grid>

        </div>
    )

};

export default connect()(DetallesApuesta);