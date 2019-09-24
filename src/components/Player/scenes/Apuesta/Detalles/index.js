import React, { useState, useEffect } from 'react';
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
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    apuestaContainer: {
        borderRight: "#afb6b8 1px solid",
    }

}));

const ImprimirButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        lineHeight: 1.5,
        padding: "15px 0",
        backgroundColor: Colors.Main,
        color: Colors.Btn_Blue_Dark,
        marginTop: '1rem',
        marginBottom: '1rem',
        border: 'none !important',
        borderRadius: '0',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            color: Colors.Input_bkg
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const DetallesApuesta = ({ ...props }) => {
    console.log("props", props)
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    const [apuestaType, setApuestaType] = useState("Diaria");
    const [moneda, setMoneda] = useState(" $ ");
    useEffect(() => {
        playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
            setList(Array.from(result.data));
        })
        setTitle(props.location.state.title.title);
        setApuestaType(props.location.state.type);
        setMoneda(props.location.state.moneda);
    }, []);

    function handleOnPrint() {
        const input = document.getElementById("apuesta-activa-numeros-detalles");
        printDocument6(input, title + '-activa-detalles');
    }

    const update = () => {
        playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
            setList([]);
            setList(Array.from(result.data));
        })
    }
    return (
        <div style={{ background: 'white', paddingTop: 112, paddingBottom: 68 }}>
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
                style={{ background: 'white' }}
            >
                <Grid item xs={12}>
                    {list.map((apuestaDetail, index) =>
                        <ShowDetallesApuesta key={index} {...apuestaDetail} index={index} moneda={moneda}
                            update={update}
                            {...props}
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Fab className="localPrintshop" variant="extended" onClick={handleOnPrint} >
                        <LocalPrintshop className="iconP" />
                        <span className="textP">Imprimir</span>
                    </Fab>
                    <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                        <Typography variant="body1" gutterBottom>
                            Imprimir
                            </Typography>
                    </ImprimirButton>
                </Grid>
            </Grid>

        </div>
    )

};

export default DetallesApuesta;