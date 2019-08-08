import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from "@material-ui/core/styles/index";
import {red} from "@material-ui/core/colors/index";
import {Colors} from "../../../../../utils/__colors";
import CircleNumber from "../../../../Utils/CircleNumber/index"
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
    textNumber: {
        fontWeight: 'bold',
        width: '60px',
        padding: '0 .5rem',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    },
    textMoneda: {
        fontWeight: 'bold',
        marginTop: ".5rem",
        textAlign: 'center',
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
                <Grid item id={`text-${props.index}`} className={classes.textNumber }>
                    
                    <CircleNumber numero={numero}/>                  
                    
                    
                </Grid>
            </Grid>
            <Grid item xs={6}
                  container
                  justify="flex-start"
                  spacing={1}
            >
                <Typography variant="body1" gutterBottom className={classes.textMoneda}>
                    {props.moneda}
                </Typography>
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.negative}>
                    {" "}{valor.toFixed(2)}
                </Typography>
            </Grid>

        </React.Fragment>
    )
};

export default SingleApuestaDetails;