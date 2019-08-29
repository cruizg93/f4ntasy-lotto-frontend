import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    headerLabel: {
        background: "#009439",
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
        '& h5':{
            color: "#f9f000",
            fontFamily : "cooper black"
        }
    }
}));

const DiariaTitle = (...props) =>{
        const classes = useStyles();
        return (
            <Grid item xs={3} className={classes.headerLabel}>
                <Typography variant="h5" gutterBottom className={"form__center-label"}>
                    Diaria
                </Typography>
            </Grid>   
        )
    
};

export default DiariaTitle;