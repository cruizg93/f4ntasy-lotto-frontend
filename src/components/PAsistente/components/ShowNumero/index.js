import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles/index";
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

const ShowNumero = ({ numero, valor, ...props }) => {
    const classes = useStyles();
    const [numberLimit, setNumberLimit] = useState(0);
    useEffect(() => {
        setNumberLimit(valor)
    }, []);


    return (
        <ListItem key={props.index} className={''}>
            <ListItemText id={props.index} primary={`${numero}`} className={classes.root} />
            <NumberFormat
                id={`user-apuesta-show-${props.index}`}
                placeholder="Número"
                margin="normal"
                variant="outlined"
                disabled={true}
                style={{ marginRight: 50, width: 150 }}
                className={classes.root}
                value={numberLimit}
            />
        </ListItem>

    )
};

export default ShowNumero;