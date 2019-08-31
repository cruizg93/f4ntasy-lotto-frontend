import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    title:{
        
        borderBottom: "2px solid red",
        borderRight:"#afb6b8 1px solid",
        borderLeft:"#afb6b8 1px solid",
        borderTop:"#afb6b8 1px solid",
        "& h6":{
            minHeight:"100%",
            marginTop:"0px !important",
        }
    },
}));

function PageTitle(props){
    const classes = useStyles();
    console.log(props.titleLabel);
    return (
        <Grid item xs={6} className={classes.title}>
            <Typography variant="h6" className={"form__center-label"}>
                {props.titleLabel === undefined?"NEED VALUE: ERROR":props.titleLabel}
            </Typography>
        </Grid>
    )   
}

PageTitle.propTypes = {
    titleLabel: PropTypes.string.isRequired
}

export default PageTitle;