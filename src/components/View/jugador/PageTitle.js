import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../utils/__colors';

const PageTitleStyles = makeStyles(theme => ({
    titleStyleDiv: {
        backgroundColor: Colors.Sky_Blue,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "3rem",
        minHeight: "48px",
        "& h6": {
            padding: "4px"
        }
    }
}));

function PageTitle(props) {
    const classes = PageTitleStyles();
    return (
        <Grid item xs={12} className={classes.titleStyleDiv}>
            <Typography variant="h6">
                {props.titleLabel}
            </Typography>
        </Grid>
    )
}

PageTitle.propTypes = {
    titleLabel: PropTypes.string.isRequired
}


export default PageTitle;