import React, {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import TextField from '@material-ui/core/TextField';
import {Circle} from 'react-shapes';
const EntrarNumero = ({numero, tope, max, ...props}) => {

    const [color, setColorValue]=useState('#2FFF21')


    useEffect(()=>{
        console.log(props);
       if(tope !==0 && tope ===max){
           setColorValue("#BA2220")
       }

    },[]);
    return (
        <ListItem key={props.index} className={''}>
            <Circle r={10} fill={{color:`${color}`}}  strokeWidth={0} />
            <ListItemText id={props.index} primary={`${numero}`}/>
            <TextField
                id={`user-apuesta-insert-${props.index}`}
                placeholder="Número"
                margin="normal"
                variant="outlined"
                disabled={tope!==0 && tope === max}
                style={{marginRight: 50, width: 150}}
                InputLabelProps={{
                    shrink: true,
                }}
                // onChange={handleOnChangeInput}
            />

        </ListItem>

    )
};




export default EntrarNumero;