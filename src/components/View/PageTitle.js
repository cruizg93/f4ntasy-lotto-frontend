import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    title: {
        borderBottom: "2px solid #cc0000",
        borderRight: "#afb6b8 1px solid",
        borderLeft: "#afb6b8 1px solid",
        borderTop: "#afb6b8 1px solid",
        "& h6": {
            minHeight: "100%",
            marginTop: "0px !important",
        }
    },
}));

function PageTitle(props) {
    const classes = useStyles();
    const xsValue = props.xsValue === undefined ? 6 : props.xsValue;
    return (
        <Grid item sm={xsValue} className={classes.title}>
            <Typography variant="h6" className={"form__center-label"}>
                {props.titleLabel === undefined ? "NEED VALUE: ERROR" : props.titleLabel}
            </Typography>
        </Grid>
    )
}

PageTitle.propTypes = {
    titleLabel: PropTypes.string.isRequired
}

export default PageTitle;