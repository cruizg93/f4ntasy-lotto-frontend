import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import TextField from '@material-ui/core/TextField';
import {update_password} from '../../../service/api/password/password';



const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
    },
    item: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },

}));
const EditarButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#2fff21',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
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

export default function Entry(props) {
    const classes = useStyles();
    const [buttonText, setButtonText] = useState('Editar');
    const [buttonColor, setButtonColor] = useState('#2fff21');
    const [stateInput, setInputState] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');

    function handleOnClickEditarButton() {
        if (buttonText === 'Editar') {
            setButtonText('Fijar');
            setInputState(false)
        } else if (buttonText === 'Fijar') {
            setButtonText('Editar');
            setInputState(true);
            if (passwordInput !== '') {
                let data = {
                    username: props.username,
                    password: passwordInput
                };
                update_password(data).then((result) => {
                    setPasswordInput('')
                })
            }

        }
        if (buttonColor === '#2fff21') {
            setButtonColor('#fbd534')
        } else if (buttonColor === '#fbd534') {
            setButtonColor('#2fff21')
        }
    }

    const handleOnChangeInput = event => setPasswordInput(event.target.value);

    return (


            <ListItem key={props.index} className={classes.item}>
                <ListItemText id={props.index} primary={`${props.index + 1} - ${props.username}`}/>
                <TextField
                    id={`user-pass-change-${props.index}`}
                    placeholder="Contraseña"
                    margin="normal"
                    variant="outlined"
                    disabled={stateInput}
                    type="password"
                    style={{marginRight: 50, width: 150}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleOnChangeInput}
                />
                <ListItemSecondaryAction>
                    <EditarButton variant="outlined" style={{backgroundColor: buttonColor, width: '70px'}}
                                  onClick={handleOnClickEditarButton}>
                        {buttonText}
                    </EditarButton>
                </ListItemSecondaryAction>

            </ListItem>


    )
}