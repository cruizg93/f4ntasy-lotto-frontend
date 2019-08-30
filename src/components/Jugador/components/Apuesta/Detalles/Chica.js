import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    headerLabel: {
        background: "#ebd700",
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
        '& h5':{
            color: "#009439",
            fontFamily : "cooper black"
        }
    }
}));

const ChicaTitle = (...props) =>{
        const classes = useStyles();
        return (
            <Grid item xs={4} className={classes.headerLabel}>
                <Typography variant="h5" gutterBottom className={"form__center-label"}>
                    Chica
                </Typography>
            </Grid>   
        )
    
};

export default ChicaTitle;