import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, NativeSelect, Fab, InputBase, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles/index";
import { list } from "../../service/api/password/password";
import { userActions } from '../../store/actions';
import { update_password } from '../../service/api/password/password';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MdSettings } from "react-icons/md";
import AdminTitle from '../Admin/components/AdminTitle_Center';
import ConfirmDialog from '../View/Dialog/ConfirmDialog';
import InformationPasswordDialolg from '../View/Dialog/InformationPasswordDialolg';
import CustomText from '../View/CustomText';
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

const Password = (props) => {
    const [open, setOpen] = useState(false);
    const [informationPasswordOpen, setInformationPasswordOpen] = useState(false);
    const [current, setCurrent] = useState(-1);
    const [userName, setUserName] = useState('');
    const [userList, setUserList] = useState([]);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        list().then((result) => {
            setUserList(Array.from(result.data));
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }, []);

    const handleChangeSelect = event => {
        setCurrent(event.target.selectedIndex - 1)
        setUserName(event.target.value)
        if (event.target.value !== '') {
            setPassword('')
            setShowPassword(false)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function handleOnClickCambio() {
        if (password !== '' && current > 0) {
            setOpen(true)
        }
    }

    const handleClose = (value) => {
        setOpen(false)
        if (value === true) {
            handleClickUpdatePassword()
        }
    }

    const handleClose_password = () => {
        setInformationPasswordOpen(false)
        setPassword('')
    }

    const handleClickUpdatePassword = () => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        let data = {
            username: userName,
            password: password
        };
        update_password(data).then((result) => {
            setInformationPasswordOpen(true)
            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
                setInformationPasswordOpen(false)
            });
    }

    return (
        <React.Fragment>
            <AdminTitle titleLabel='Cambiar Contraseñas' />
            <Container maxwidth="xs" className="admin_change_password">
                <Grid className="user_list">
                    <NativeSelect
                        value={userName}
                        className="native_select"
                        onChange={handleChangeSelect}
                        input={<BootstrapInput className="bootstrap_input" />}
                    >
                        <option value='' >Lista de usuarios</option>
                        {
                            (userList.length > 0) && userList.map((c, index) =>
                                <option key={index} value={c} >{c}</option>
                            )
                        }
                    </NativeSelect>
                </Grid>
                <Grid className="input_password">
                    <input name="DummyPassword" type="password" style={{ display: 'none' }} />
                    <CustomText
                        value={password}
                        icon={MdSettings}
                        type={showPassword ? 'text' : 'password'}
                        onInput={e => setPassword(e.target.value)}
                        fontSize={'1.1rem'}
                        width={300}
                    >
                    </CustomText>
                    <Button className="show_btn" onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility style={{ color: '#235559' }} /> : <VisibilityOff />}
                    </Button>
                </Grid>
                <Grid className="button">
                    <Fab className="btn_change" variant="extended" onClick={handleOnClickCambio} >
                        <span className="text">Cambiar</span>
                    </Fab>
                </Grid>
            </Container>
            <ConfirmDialog
                open={open}
                handleClose={handleClose}
                title={'Cambiar Contraseña?'}
                context={'Seguro quiere cambiar la contraseña de este usuario?'}
                icon={'help'}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
            >
            </ConfirmDialog>
            <InformationPasswordDialolg
                open={informationPasswordOpen}
                handleClose={handleClose_password}
                title={'Cambio exitoso'}
                context={'La contraseña a sido cambiada existosamente.'}
                icon={'ioIosCheckmarkCircleOutline'}
                // userName={'P001'}
                // password={'123456789'}
                userName={userName}
                password={password}
                iconSize={67}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'60px'}>
            </InformationPasswordDialolg>
        </React.Fragment>
    )
}

export default connect()(Password);
