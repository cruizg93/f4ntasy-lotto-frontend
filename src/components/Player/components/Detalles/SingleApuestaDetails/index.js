import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from "@material-ui/core/styles/index";
import {red} from "@material-ui/core/colors/index";

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
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    }    

}));
const SingleApuestaDetails=({numero, valor, ...props})=>{
    const classes = useStyles();
    return (
        <React.Fragment>
             <Grid item xs={6}
                  container
                  justify="flex-end"
                   spacing={1}
            >
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.text }>
                    {numero}{" "}{props.moneda}
                </Typography>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  spacing={1}
            >
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.negative}>
                    {" "}{valor.toFixed(2)}
                </Typography>
            </Grid>

        </React.Fragment>
    )
};

export default SingleApuestaDetails;