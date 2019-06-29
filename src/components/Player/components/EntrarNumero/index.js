import React, {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from "@material-ui/core/styles/index";
import {Circle} from 'react-shapes';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    }

}));


const EntrarNumero = ({numero, tope, max, ...props}) => {

    const classes=useStyles();
    const [color, setColorValue]=useState('#2FFF21');
    const [numberLimit, setNumberLimit]=useState('');
    useEffect(()=>{
       if(tope !==0 && tope ===max){
           setColorValue("#BA2220")
       }

    },[]);

    function handleOnChangeInput(e){
        setNumberLimit(e.target.value);
    }

    return (
        <ListItem key={props.index} className={''}>
            <Circle r={10} fill={{color:`${color}`}}  strokeWidth={0} className={classes.root}/>
            <ListItemText id={props.index} primary={`${numero}`} className={classes.root}/>
            <NumberFormat
                id={`user-apuesta-insert-${props.index}`}
                placeholder="Número"
                margin="normal"
                variant="outlined"
                disabled={tope!==0 && tope === max}
                style={{marginRight: 50, width: 150}}
                className={classes.root}
                onChange={handleOnChangeInput}
                value={numberLimit}
            />
        </ListItem>

    )
};




export default EntrarNumero;