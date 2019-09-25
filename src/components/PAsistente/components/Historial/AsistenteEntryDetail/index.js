import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles/index";
import NumberFormat from 'react-number-format';
import { red } from "@material-ui/core/colors/index";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        width: '60px',
        border: '1px #000 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    }

}));
const AsistenteEntryDetail = ({ numero, valor, disable, ...props }) => {
    const classes = useStyles();
    useEffect(() => {

    }, []);
    return (
        <>
            <Grid item xs={6}
                container
                justify="flex-end"
            >
                <Typography id={`text-${props.index}`} variant="body1" className={classes.text}>
                    {numero}
                </Typography>
            </Grid>
            <Grid item xs={6}
                container
                justify="flex-start"
            >
                <NumberFormat
                    id={`user-apuesta-data-${props.index}`}
                    placeholder="Número"
                    margin="normal"
                    variant="outlined"
                    style={{ marginRight: 50, width: 150 }}
                    className={valor > 0 ? classes.root : classes.negative}
                    value={valor}
                    disabled={disable}
                />
            </Grid>
        </>
    )
};


export default AsistenteEntryDetail;