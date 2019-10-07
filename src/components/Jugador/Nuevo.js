import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './Nuevo.css';
import './components/Diaria/Diaria'

import Diaria from "./components/Diaria/Diaria";
import Chica from "./components/Chica/Chica";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CustomText from '../View/CustomText';

import { adminService } from "../../service/api/admin/admin.service";
import { Colors } from '../../utils/__colors';
import { userActions } from '../../store/actions';

import Dollar_ON from '../View/assets/Dollar_ON.png';
import Dollar_OFF from '../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../View/assets/Lempiras_OFF.png';
import AdminTitle from '../Admin/components/AdminTitle_Center';

import { MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";

import '../../common.css'
import { Divider } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

const Nuevo = ({ ...props }) => {

    const classes = useStyles();
    const [selectedValueMoneda, setSelectedValueMoneda] = React.useState('');
    const [placeholderUser, setPlaceholderUser] = React.useState("P000");
    const [diariaPremioMil, setDiariaPremioMil] = React.useState('');
    const [diariaPremioLempirasMil, setDiariaPremioLempirasMil] = React.useState('');
    const [diariaCostoMil, setDiariaCostoMil] = React.useState('');
    const [diariaComision, setDiariaComision] = React.useState('');
    const handleChangeDiariaPremioMil = event => setDiariaPremioMil(event.target.value);
    const handleChangeDiariaCostoMil = event => setDiariaCostoMil(event.target.value);
    const handleChangeDiariaComision = event => setDiariaComision(event.target.value);
    const handleChangeDiariaPremioLempirasMil = event => setDiariaPremioLempirasMil(event.target.value);
    const [moneda, setMoneda] = useState("dolar");
    const [selectedDiariaType, setSelectedDiariaType] = React.useState('');

    const handleChangeDiariaType = event => setSelectedDiariaType(event.target.value);
    const [chicaPremioMil, setChicaPremioMil] = React.useState('');
    const [chicaPremioDirectoMil, setChicaPremioDirectoMil] = React.useState('');
    const [chicaPremioPedazosMil, setChicaPremioPedazosMil] = React.useState('');
    const [chicaCostoMil, setChicaCostoMil] = React.useState('');
    const [chicaComision, setChicaComision] = React.useState('');
    const [chicaCostoPedazos, setChicaCostoPedazos] = React.useState('');

    const [chicaComisionPedazos, setChicaComisionPedazos] = React.useState('');

    const [selectedChicaType, setSelectedChicaType] = React.useState('');

    const handleChangeChicaPremioMil = event => setChicaPremioMil(event.target.value);
    const handleChangeChicaPremioDirectoMil = event => setChicaPremioDirectoMil(event.target.value);
    const handleChangeChicaPremioPedazosMil = event => setChicaPremioPedazosMil(event.target.value);

    const handleChangeChicaCostoMil = event => setChicaCostoMil(event.target.value);
    const handleChangeChicaComision = event => setChicaComision(event.target.value);
    const handleChangeChicaCostoPedazos = event => setChicaCostoPedazos(event.target.value);
    const handleChangeChicaComisionPedazos = event => setChicaComisionPedazos(event.target.value);

    const handleChangeChicaType = event => {
        setSelectedChicaType(event.target.value);
    };
    //Input
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [open, setOpen] = useState(false);
    const mounted = useState(true);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        props.history.push("/");
        return () => {
            mounted.current = false;
        };
    }
    function success_response() {
        toast.success("Usuario guardado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function duplicado() {
        toast.warn("Usuario duplicado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function error_reponse() {
        toast.error("Existen datos erroneos o incompletos !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function update_jugador() {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.count().then((response) => {
            let number = response.data;
            let length = Math.log(number) * Math.LOG10E + 1 | 0;
            let pword = 'P';
            switch (length) {
                case 1:
                    pword = pword + "00" + number;
                    break;
                case 2:
                    pword = pword + "0" + number;
                    break;
                default:
                    pword = pword + number;
                    break;
            }
            setPlaceholderUser(pword)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function clean() {
        setDiariaPremioMil('');
        setDiariaPremioLempirasMil('');
        setDiariaCostoMil('');
        setDiariaComision('');
        setSelectedDiariaType('dm');
        setChicaPremioMil('');
        setChicaPremioDirectoMil('');
        setChicaPremioPedazosMil('');
        setChicaCostoMil('');
        setChicaComision('');
        setChicaCostoPedazos('');
        setChicaComisionPedazos('');
        setSelectedChicaType('cm');
        setInputUserName('');
        setInputPassword('123456789')
    }

    useEffect(() => {
        update_jugador();
    }, []);


    function handleChange(val) {
        setSelectedValueMoneda(val);
    }

    function onClickHandlerCreate() {
        let utype = 'p';
        let submit = true;
        if (inputPassword === '' || inputUserName === '' || selectedValueMoneda === '' || selectedDiariaType === '' || selectedChicaType === '') {
            submit = false;
        }

        let dparam1 = diariaCostoMil;
        let dparam2 = diariaPremioMil;
        if (selectedDiariaType === 'dd') {
            dparam1 = diariaComision;
            dparam2 = diariaPremioLempirasMil;
        }
        if (dparam1 === '' || dparam1 === 0 || dparam2 === '' || dparam2 === 0) {
            submit = false;
        }

        let cparam1 = 0;
        let cparam2 = 0;
        let cparam3 = 0;
        switch (selectedChicaType) {
            case 'cd':
                cparam1 = chicaComision;
                cparam2 = chicaPremioDirectoMil;
                break;
            case 'cp':
                cparam1 = chicaComisionPedazos;
                cparam2 = chicaCostoPedazos;
                cparam3 = chicaPremioPedazosMil;
                break;
            default:
                cparam1 = chicaCostoMil;
                cparam2 = chicaPremioMil;
                break;
        }
        if ((cparam1 === 0 && cparam2 === 0) || (selectedChicaType === 'cp' && cparam3 === 0)) {
            submit = false;
        }

        if (!submit) {
            error_reponse();
            return;
        }
        let data = {
            name: inputUserName,
            password: inputPassword,
            username: placeholderUser,
            utype: utype,
            mtype: selectedValueMoneda,
            dtype: selectedDiariaType,
            dparam1: dparam1,
            dparam2: dparam2,
            ctype: selectedChicaType,
            cparam1: cparam1,
            cparam2: cparam2,
            cparam3: cparam3,
        };

        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.new_player(data)
            .then(function (response) {
                handleClickOpen();
                clean();
                dispatch(userActions.loading_end())
            })
            .catch(function (error) {
                error_reponse();
                dispatch(userActions.loading_end())
            });
    }

    return (
        <div>
            <React.Fragment>
                <ToastContainer autoClose={8000} />
                <Container maxwidth="xs" style={{ padding: 0 }}>
                    <AdminTitle titleLabel='Crear Vendedor P' />
                </Container>

                <Dialog
                    disableBackdropClick
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-crear-usuario"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-crear-usuario">Su Jugador a sido creado exitosamente</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Usuario: ${placeholderUser} contraseña: ${inputPassword}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose();
                        }} color="primary" autoFocus>
                            Aceptar
                                </Button>
                    </DialogActions>
                </Dialog>
                <Container maxwidth="xs" className="container_crear_p">
                    <Container maxwidth="xs" style={{ display: 'flex', height: 60, paddingLeft: 40 }}>
                        <Grid item xs={8} className="title_info" >
                            <div className="text">
                                *Escoger moneda para transacciones
                            </div>
                        </Grid>
                        <Grid item xs={4} className="btn_group_moneda" >
                            <Button style={{ paddingTop: 9 }} onClick={() => handleChange('l')}>
                                {selectedValueMoneda === 'l' ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                            </Button>
                            <Button style={{ marginLeft: -3, paddingTop: 9 }} onClick={() => handleChange('d')}>
                                {selectedValueMoneda === 'd' ? <img src={Lempiras_ON} alt="Dollar_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
                            </Button>
                        </Grid>
                    </Container>
                    <Container maxwidth="xs" className="container_usersetting">
                        <Container className="username">
                            <Grid item className="pt-15 pb-15">
                                <CustomText readOnly value={placeholderUser} icon={MdSettings}></CustomText>
                            </Grid>
                            <Grid item >
                                <CustomText readOnly value={inputPassword} icon={TiPencil} onInput={e => setInputPassword(e.target.value)}></CustomText>
                            </Grid>
                            <Grid item className="pt-15 pb-15">
                                <CustomText placeholder='Nombre' onInput={e => setInputUserName(e.target.value)}></CustomText>
                            </Grid>
                        </Container>
                    </Container>

                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        className="{classes.boxContainerDiaria}"
                    >
                        <Diaria premio={diariaPremioMil}
                            onChangePremioMil={handleChangeDiariaPremioMil}
                            premioLempiras={diariaPremioLempirasMil}
                            onChangePremioLempirasMil={handleChangeDiariaPremioLempirasMil}
                            costo={diariaCostoMil}
                            onChangeCostoMil={handleChangeDiariaCostoMil}
                            comision={diariaComision}
                            onChangeComisionMil={handleChangeDiariaComision}
                            diariaType={selectedDiariaType}
                            onChangeDiariaType={handleChangeDiariaType}
                        />
                    </Grid>

                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        className={classes.boxContainerDiaria}
                    >
                        <Chica
                            premioMil={chicaPremioMil}
                            onChangePremioMil={handleChangeChicaPremioMil}
                            premioDirecto={chicaPremioDirectoMil}
                            onChangePremioDirectoMil={handleChangeChicaPremioDirectoMil}
                            premioPedazos={chicaPremioPedazosMil}
                            onChangePremioPedazos={handleChangeChicaPremioPedazosMil}
                            costoMil={chicaCostoMil}
                            onChangeCostoMil={handleChangeChicaCostoMil}
                            comision={chicaComision}
                            onChangeComisionMil={handleChangeChicaComision}
                            costoPedazos={chicaCostoPedazos}
                            onChangeCostoPedazos={handleChangeChicaCostoPedazos}
                            comisionPedazos={chicaComisionPedazos}
                            onChangeComisionPedazos={handleChangeChicaComisionPedazos}

                            chicaType={selectedChicaType}
                            onChangeChicaType={handleChangeChicaType}

                        />
                    </Grid>
                    <Divider xs={12} style={{ background: '#f4f4f4' }} />
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ background: 'white', height: 76, position: 'fixed', bottom: 0 }}
                    >
                        <Fab className="btn_crear" variant="extended" onClick={onClickHandlerCreate} >
                            <span className="textP">Crear</span>
                        </Fab>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default connect()(Nuevo);
