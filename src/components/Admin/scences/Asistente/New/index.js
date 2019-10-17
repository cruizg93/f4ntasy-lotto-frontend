import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import AdminTitle from '../../../components/AdminTitle_Center';
import CustomText from '../../../../View/CustomText';
import { MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { adminService } from '../../../../../service/api/admin/admin.service';
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import InformationDialog from '../../../../View/Dialog/InformationDialog';
import UserXInformationDialog from '../../../../View/Dialog/UserXInformationDialog';
import { userActions } from '../../../../../store/actions';
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
        // transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const NewAsistente = ({ ...props }) => {
    const [placeholderUser, setPlaceholderUser] = React.useState("P000x0");
    const [inputUserName, setInputUserName] = useState(''); // '' is the initial state value
    const [inputPassword, setInputPassword] = useState('123456789'); // '' is the initial state value
    const [person, setPerson] = React.useState('');
    const [options, setOptions] = React.useState('<option value=""></option>');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [comboBox, setComboBox] = useState('none');
    const [username, setUsername] = useState('none');

    useEffect(() => {
        users();
    }, [])

    function handleClickOpen() {
        if (inputPassword === '' || inputUserName === '' || placeholderUser.includes("P000x0")) {
            setOpenError(true)
        } else {
            onClickHandlerCreate()
        }
    }

    function handleClose() {
        setOpen(false);
        props.history.push("/");
    }
    function handleCloseError() {
        setOpenError(false);
        if (inputUserName === '') {
            setUsername('solid 1px red');
        }
        if (placeholderUser.includes("P000x0")) {
            setComboBox('solid 1px red');
        }
        setTimeout(() => {
            setComboBox('none')
            setUsername('none')
        }, 3000)
    }

    function onClickHandlerCreate() {
        let utype = person;
        let data = {
            name: inputUserName,
            password: inputPassword,
            username: placeholderUser,
            playerId: utype
        };
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.add_player_asistente(data).then((result) => {
            if (result.status === 401) {
                authenticationService.logout()
            } else if (result.status === 409 || result.status === 500) {
                setOpenError(true);
            } else {
                setOpen(true)
            }
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    function users() {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        adminService.list_players_username()
            .then((response) => {
                if (response.status === 401) {
                    authenticationService.logout()
                } else {
                    let users = response.data.map((c, index) =>
                        <option key={index} value={c.id} label={c.username}> {c.username}</option>
                    );
                    setOptions(users);
                    setComboBox('none')
                    setUsername('none')
                }
                dispatch(userActions.loading_end())
            },
                (error) => {
                    // var status = error.response.status
                    dispatch(userActions.loading_end())
                }
            );
    }

    const handleChangeSelect = event => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        let option = optionElement.getAttribute('label');
        let placeValue = option.split("-");
        if (event.target.value !== '') {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            adminService.count_player_asistente(event.target.value).then((result) => {
                if (result.status === 401) {
                    authenticationService.logout()
                } else
                    setPlaceholderUser(placeValue[0].trim() + "x" + (result.data + 1));
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        } else {
            setPlaceholderUser("P000x0");
        }

        setPerson(event.target.value);
        setComboBox('none')
        setUsername('none')
    };

    return (
        <React.Fragment>
            <ToastContainer autoClose={8000} />
            <AdminTitle titleLabel='Crear Vendedor X' />
            <Grid container className='container_create_vendedor_x'>
                <Grid item xs={12} className="combo_box" style={{ border: comboBox }}>
                    <NativeSelect
                        value={person}
                        className="native_select"
                        onChange={handleChangeSelect}
                        input={<BootstrapInput className="bootstrap_input" />}
                    >
                        <option value="" label=''>Lista vendedores P</option>
                        {options}
                    </NativeSelect>
                </Grid>
                <Grid container style={{ background: 'white' }}>
                    <Grid item className="pt-15 pb-15 pl-45" style={{ width: 320 }}>
                        <CustomText readOnly value={placeholderUser} icon={MdSettings}></CustomText>
                    </Grid>
                    <Grid item className="pt-15 pb-15 pl-45" style={{ width: 320 }}>
                        <CustomText readOnly value={inputPassword} icon={MdSettings}
                            onInput={e => setInputPassword(e.target.value)}>
                        </CustomText>
                    </Grid>
                    <Grid item className="pt-15 pb-15 pl-45" style={{ width: 320, border: username }}>
                        <CustomText value={inputUserName} icon={TiPencil}
                            onInput={e => setInputUserName(e.target.value)}>
                        </CustomText>
                    </Grid>
                </Grid>
                <Grid variant="extended" className="container_crear_btn">
                    <Fab className="crear_btn" onClick={handleClickOpen}>
                        Crear
                    </Fab>
                </Grid>
            </Grid>

            <UserXInformationDialog
                open={open}
                handleClose={handleClose}
                title={'Creación exitosa'}
                context={'El usuario a sido creado exitosamente'}
                id={placeholderUser}
                password={inputPassword}
                iconSize={67}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'60px'}>
            </UserXInformationDialog>
            <InformationDialog
                open={openError}
                handleClose={handleCloseError}
                icon={'giInfo'}
                title={'Información incompleta'}
                context={'Hay campos de información que son obligatorios, complete el formulario antes de crear.'}
                id={placeholderUser}
                password={inputPassword}
                iconSize={70}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'80px'}>
            </InformationDialog>
        </React.Fragment>
    )
}
export default connect()(NewAsistente);