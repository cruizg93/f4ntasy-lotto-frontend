import React, {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/index";
import {red, blue} from "@material-ui/core/colors/index";
import { adminService } from '../../../../service/api/admin/admin.service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontWeight: 'bold'
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));
const AsistButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#ffe634',
        borderColor: 'none',
        color: '#FFF',
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#0072cc',
            borderColor: '#007cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const TemporalEntry = ({match: {url}, total, title, premio, neta, id,
                        estado, comision, balance, ...props
            }) => {

    const classes = useStyles();
    const handle=props.handle;
    function handleClickEditar(){
        adminService.temporal_service(id).then((result)=>{
            console.log(result.data)
            handle();
        })
    }    
    return(
        <React.Fragment>
            <Grid item xs={12}>
                <Paper key={props.index} className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Divider/>
                    <Grid container>
                        <Grid item xs={12}
                            container
                            justify="center"
                            className={classes.text}
                        >
                            <Typography variant="h5" gutterBottom
                                        className={estado === 'ABIERTA' ? classes.open : classes.close}>
                                {estado}
                            </Typography>
                            <Grid item xs={7}
                              container
                              justify="center"
                            >
                                <AsistButton variant="outlined" color="primary" className={classes.button} onClick={handleClickEditar}>
                                    Cerrar
                                </AsistButton>
                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default TemporalEntry;