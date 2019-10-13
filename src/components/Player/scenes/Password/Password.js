import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/index";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { MdSettings } from "react-icons/md";
import { update_password_user } from "../../../../service/api/password/password";
import authenticationService from '../../../../service/api/authentication/authentication.service';
import AdminTitle from '../../../Admin/components/AdminTitle_Center';
import CustomText from '../../../View/CustomText';
import ConfirmDialog from '../../../View/Dialog/ConfirmDialog';
import { userActions } from '../../../../store/actions';

import './styles.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        background: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));


const PlayerPassword = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickUpdatePassword = () => {
        const { dispatch } = props;
        dispatch(userActions.loading_start())
        update_password_user(values.password)
            .then((result) => {
                if (result.data.response.indexOf('Password update') === 0) {
                    authenticationService.logout();
                    props.history.push("/");
                }
                dispatch(userActions.loading_end())
            })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
    }

    const handleClickOpen = () => {
        if (values.password !== '')
            setOpen(true)
    }

    const handleClose = (value) => {
        setOpen(false)
        if (value === true) {
            handleClickUpdatePassword()
        }
    }

    return (
        <React.Fragment>
            <AdminTitle titleLabel="Cambiar Contraseña" />
            <Grid container className="cambiar_contrasena">
                <Grid container className="password_grup">
                    <Grid item xs={10} className="password_input">
                        <input name="DummyPassword" type="password" style={{ display: 'none' }} />
                        <CustomText
                            value={values.password}
                            icon={MdSettings}
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange('password')}
                            fontSize={'1.1rem'}
                        >
                        </CustomText>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className="show_btn" onClick={handleClickShowPassword}>
                            {values.showPassword ? <Visibility style={{ color: '#235559' }} /> : <VisibilityOff />}
                        </Button>
                    </Grid>
                </Grid>
                <Grid >
                    <Button className="cambiar_btn" onClick={handleClickOpen}>
                        Cambiar
                    </Button>
                </Grid>
            </Grid>
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
        </React.Fragment>
    )
}

export default connect()(PlayerPassword);