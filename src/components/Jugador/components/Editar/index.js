import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

import Diaria from "../Diaria/Diaria";
import Chica from "../Chica/Chica";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { adminService } from "../../../../service/api/admin/admin.service";
import { Colors } from "../../../../utils/__colors";
import AlertDialog from "../../../AlertDialog/index";

import AdminTitle from '../../../Admin/components/AdminTitle_Center';
import CustomText from '../../../View/CustomText';

import { userActions } from '../../../../store/actions';
import { MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import Dollar_ON from '../../../View/assets/Dollar_ON.png';
import Dollar_OFF from '../../../View/assets/Dollar_OFF.png';
import Lempiras_ON from '../../../View/assets/Lempiras_ON.png';
import Lempiras_OFF from '../../../View/assets/Lempiras_OFF.png';
import './Editar.css';

const EditarJugador = (props) => {
    const [disable, setDisable] = useState(true);
    const [selectedValueMoneda, setSelectedValueMoneda] = React.useState('l');
    //Input
    const [placeholderUser, setPlaceholderUser] = React.useState("P000");
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value

    const [diariaPremioMil, setDiariaPremioMil] = React.useState('1000');
    const [diariaPremioLempirasMil, setDiariaPremioLempirasMil] = React.useState('');
    const [diariaCostoMil, setDiariaCostoMil] = React.useState('');
    const [diariaComision, setDiariaComision] = React.useState('');

    const handleChangeDiariaPremioMil = event => setDiariaPremioMil(event.target.value);
    const handleChangeDiariaCostoMil = event => setDiariaCostoMil(event.target.value);
    const handleChangeDiariaComision = event => setDiariaComision(event.target.value);
    const handleChangeDiariaPremioLempirasMil = event => setDiariaPremioLempirasMil(event.target.value);
    const [selectedDiariaType, setSelectedDiariaType] = React.useState('dm');
    // const handleChangeDiariaType = event => {
    //     setSelectedDiariaType(event.target.value);
    // }
    const handleChangeDiariaType = event => {
        console.log('here')
        if (event.target.value === 'dm') {
            setDiariaPremioMil(1000);
        }
        setSelectedDiariaType(event.target.value);
    }

    const [chicaPremioMil, setChicaPremioMil] = React.useState('');
    const [chicaPremioDirectoMil, setChicaPremioDirectoMil] = React.useState('');
    const [chicaPremioPedazosMil, setChicaPremioPedazosMil] = React.useState('');

    const [chicaCostoMil, setChicaCostoMil] = React.useState('');
    const [chicaComision, setChicaComision] = React.useState('');
    const [chicaCostoPedazos, setChicaCostoPedazos] = React.useState('');
    const [chicaComisionPedazos, setChicaComisionPedazos] = React.useState('');
    const [selectedChicaType, setSelectedChicaType] = React.useState('cm');
    const [editable, setEditable] = React.useState(true);

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

    useEffect(() => {
        adminService.get_player_by_id(props.match.params.jugadorId).then((result) => {
            // setEditable(result.data.editable);
            setEditable(true);
            setPlaceholderUser(result.data.username);
            setInputUserName(result.data.name);
            if (result.data.moneda.monedaName.toUpperCase() === 'DOLAR') {
                setSelectedValueMoneda('d');
            } else {
                setSelectedValueMoneda('l');
            }

            if (result.data.costoChicaPedazos !== 0) {
                setSelectedChicaType('cp');
                setChicaCostoPedazos(result.data.costoChicaPedazos);
                setChicaComisionPedazos(result.data.comisionChicaPedazos);
                setChicaPremioPedazosMil(result.data.premioChicaPedazos)

            } else if (result.data.comisionChicaDirecto !== 0
                && result.data.premioChicaDirecto !== 0) {
                setSelectedChicaType('cd');
                setChicaPremioDirectoMil(result.data.premioChicaDirecto);
                setChicaComision(result.data.comisionChicaDirecto);
            } else {
                setChicaPremioMil(result.data.premioChicaMiles);
                setChicaCostoMil(result.data.costoChicaMiles);
            }

            if (result.data.premioDirecto !== 0) {
                setSelectedDiariaType('dd');
                setDiariaPremioLempirasMil(result.data.premioDirecto);
                setDiariaComision(result.data.comisionDirecto);
            } else {
                setDiariaPremioMil(result.data.premioMil);
                setDiariaCostoMil(result.data.costoMil);
            }

        })
    }, [])

    function handleChange(val) {
        setSelectedValueMoneda(val);
    }

    function onClickHandlerEditar() {
        let utype = 'p';
        let submit = true;
        if (inputUserName === '') {
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
            password: inputPassword === '' ? "1" : inputPassword,
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
        adminService.edit_player(data)
            .then(function (response) {
                props.history.push("/");
                return () => {
                    mounted.current = false;
                };

            })
            .catch(function (error) {
                duplicado();

            });

    }

    const editarFijarHandler = (e) => {
        if (!disable && editable) {
            onClickHandlerEditar();
        }
        if (editable)
            setDisable(!disable);
    }
    console.log('here', selectedValueMoneda)
    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <Container maxwidth="xs" style={{ padding: 0 }}>
                <AdminTitle titleLabel='Editar Vendedor P' />
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
                    <Button onClick={() => { handleClose() }} color="primary" autoFocus>
                        Aceptar
            </Button>
                </DialogActions>
            </Dialog>

            <Container maxwidth="xs" className="container_editar_p">
                {!editable ?
                    <AlertDialog msg={"El jugador tiene apuestas activas"} />
                    : null
                }
                <Container maxwidth="xs" style={{ display: 'flex', height: 60, paddingLeft: 35 }}>
                    <Grid item xs={8} className="title_info" >
                        <div className="text">
                            *Escoger moneda para transacciones
                        </div>
                    </Grid>
                    <Grid item xs={4} className="btn_group_moneda" >
                        <Button style={{ paddingTop: 9 }} onClick={() => handleChange('d')}>
                            {selectedValueMoneda === 'd' ? <img src={Dollar_ON} alt="Dollar_ON" /> : <img src={Dollar_OFF} alt="Dollar_OFF" />}
                        </Button>
                        <Button style={{ paddingTop: 9 }} onClick={() => handleChange('l')}>
                            {selectedValueMoneda === 'l' ? <img src={Lempiras_ON} alt="Lempiras_ON" /> : <img src={Lempiras_OFF} alt="Lempiras_OFF" />}
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
                            <CustomText placeholder='Nombre' value={inputUserName} onInput={e => setInputUserName(e.target.value)}></CustomText>
                        </Grid>
                    </Container>
                </Container>


                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
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
                        activate={disable}
                    />
                </Grid>


                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
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
                        activate={disable}
                    />
                </Grid>
                <Grid container
                    maxwidth="xs"
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="container_btn_crear"
                >
                    <Fab className="btn_crear" variant="extended" onClick={editarFijarHandler} >
                        <span className="textP">{disable ? "Editar" : "Fijar"}</span>
                    </Fab>
                    {/* <EditarFijarButton variant="outlined" color="primary"
                        className={disable ? classes.editLabel : classes.fijarLabel}
                        onClick={editarFijarHandler}
                    >
                        {disable ? "Editar" : "Fijar"}
                    </EditarFijarButton> */}
                </Grid>
            </Container>
        </React.Fragment>
    )
}


export default connect(null, null)(EditarJugador);


{/* <Grid container spacing={1}
    direction="row"
    justify="center"
    alignItems="flex-start"
    className={classes.headerContainer}
>
    <Grid item xs={6}>
        <Typography variant="h6" className={"form__center-label"}>
            {placeholderUser} / {inputUserName}
        </Typography>
    </Grid>
    <Grid item xs={6}>
        <FormControlLabel
            value="lempiras"
            control={
                <GreenRadio
                    checked={selectedValueMoneda === 'l'}
                    onChange={handleChange}
                    value="l"
                    name="radio-button-moneda"
                    inputProps={{ 'aria-label': 'L' }}
                    disabled={disable}
                />}
            label="Lempiras"
            labelPlacement="bottom"

        />
        <FormControlLabel
            value="dolar"
            control={
                <GreenRadio
                    checked={selectedValueMoneda === 'd'}
                    onChange={handleChange}
                    value="d"
                    name="radio-button-moneda"
                    inputProps={{ 'aria-label': 'D' }}
                    disabled={disable}
                />}
            label="Dolares"
            labelPlacement="bottom"
        />
    </Grid>
</Grid>

    <Divider />
    <Grid container spacing={1}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12}
            className={classes.boxContainerNuevo}
        >
            <TextField
                id="user"
                label="Nuevo Usuario"
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                fullWidth
                required
                value={placeholderUser}
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.inputData}

            />

            <TextField
                id="password"
                label="Contraseña"
                placeholder="Si no edita este campo la contraseña no se cambia"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={inputPassword}
                InputLabelProps={{
                    shrink: true,
                }}
                onInput={e => setInputPassword(e.target.value)}
                className={classes.inputData}
                disabled={disable}
            />

            <TextField
                id="username"
                label="Nombre"
                placeholder="Nombre"
                margin="normal"
                variant="outlined"
                fullWidth
                required
                value={inputUserName}
                InputLabelProps={{
                    shrink: true,
                }}
                onInput={e => setInputUserName(e.target.value)}
                className={classes.inputData}
                disabled={disable}
            />
        </Grid>

    </Grid>

    <Divider /> */}
