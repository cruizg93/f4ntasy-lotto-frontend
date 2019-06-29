import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },


    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const ApuestaData = ({id, nombre, total, comision, riesgo, ...props}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} component={Link} to={''}>
            <Paper key={props.index} className={classes.paper} >


                            <Typography variant="h5" gutterBottom>
                                {nombre}
                            </Typography>


            </Paper>
        </Grid>

    )
};

export default ApuestaData;