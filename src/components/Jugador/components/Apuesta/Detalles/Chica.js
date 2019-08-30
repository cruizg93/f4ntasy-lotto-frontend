import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChicaLogo from './assets/Chica Logo.png';

const useStyles = makeStyles(theme => ({
    headerLabel: {
        backgroundColor: "#e8d847",
        borderRight:"#afb6b8 1px solid",
        borderBottom:"#afb6b8 1px solid",
        textAlign: "center",
        "& img":{
            width:"100%",
            maxWidth:"7rem",
            height: "100%",
            objectFit: "contain"
        }      
    }
}));

const ChicaTitle = (xsValue, ...props) =>{
        const classes = useStyles();
    
        return (
            <Grid item xs={4} className={classes.headerLabel}>
                <img src={ChicaLogo} alt="ChicaLogo" /></Grid>   
        )
    
};

export default ChicaTitle;