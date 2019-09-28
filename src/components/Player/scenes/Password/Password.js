import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/index";
import { withStyles } from "@material-ui/core/styles/index";
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { MdSettings } from "react-icons/md";
import { update_password_user } from "../../../../service/api/password/password";
import AdminTitle from '../../../Admin/components/AdminTitle_Center';
import CustomText from '../../../View/CustomText';
import ConfirmDialog from '../../../View/Dialog/ConfirmDialog';

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


export default function PlayerPassword(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
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
        update_password_user(values.password)
            .then((result) => {
                if (result.data.response.indexOf('Password update') === 0) {
                }
                props.history.push("/");
            })
    }

    const handleClickOpen = () => {
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