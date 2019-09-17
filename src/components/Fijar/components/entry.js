import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import TextField from '@material-ui/core/TextField';
import {update_number} from '../../../service/api/fijar/fijar';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        display: 'flex',
    },
    item: {
        marginTop: '.5rem',
        marginBottom: '.5rem',
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
    const [buttonColor, setButtonColor] = useState('#ff190a');
    const [stateInput, setInputState] = useState(true);
    const [puntosInput, setPuntosInput] = useState(props.tope);

    function handleOnClickEditarButton() {
        if (buttonText === 'Editar') {
            setButtonText('Fijar');
            setInputState(false)
        } else if (buttonText === 'Fijar') {
            setButtonText('Editar');
            setInputState(true);
            let data = {
                numero: props.numero,
                puntos: puntosInput
            };

            update_number(data).then((result)=>{

            })
        }
        if (buttonColor === '#ff190a') {
            setButtonColor('#2fff21')
        } else if (buttonColor === '#2fff21') {
            setButtonColor('#ff190a')
        }

    }

    const handleOnChangeInput = event => setPuntosInput(event.target.value);


    return (

        <ListItem key={props.index} className={classes.item}>
            <ListItemText id={props.index} primary={`${props.numero}`}/>
            <TextField
                id={`user-pass-change-${props.index}`}
                placeholder="Número"
                margin="normal"
                variant="outlined"
                disabled={stateInput}
                 style={{marginRight: 50, width: 150}}
                InputLabelProps={{
                    shrink: true,
                }}
                value={puntosInput}
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