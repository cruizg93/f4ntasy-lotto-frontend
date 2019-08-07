import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import {Colors} from "../../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",
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
    },
    textLabel: {
        display: 'flex',
        margin: '.5rem'
    },
    textSorteoAbierto:{
        color: Colors.Green,        
    },
    typeContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '1rem',
        borderRight:"#afb6b8 1px solid",
    },
    titleContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '1rem',        
    },
    textSorteoAbierto:{
        color: Colors.Green
    },
    sorteoTextContainer:{
        borderRight:"#afb6b8 1px solid",
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        paddingRight: ".5rem"
    }

}));

const ApuestasActivasAdminData = ({
                                      match: {url}, total, title, premio, neta, id,
                                      estado, comision, balance, type, ...props
                                  }) => {
    const classes = useStyles();
    const [moneda, setMoneda] =  React.useState(" $ ");

    React.useEffect(()=>{
        setMoneda(props.moneda === "lempira" ? " L " : " $ " )
    })
    return (
        <Grid item xs={12} component={Link}
              to={
                  {
                      pathname: `${url}/${id}`,
                      state: {
                          title: {title},
                          total: total,
                          comision: comision,
                          neta: neta,
                      }
                  }
              }
              className={estado === 'ABIERTA' ? classes.component : classes.componentDisable}>
            <Paper key={props.index} className={classes.paper}>
                <Grid container>
                <Grid item xs={2} className={classes.typeContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {type} 
                        </Typography>
                    </Grid> 
                    <Grid item xs={8} className={classes.titleContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {title} 
                        </Typography>
                    </Grid>    
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </Grid>               
                <Grid container>
                    <Grid item xs={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Apuestas | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {total}
                        </Typography>

                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Comisiones | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {comision}
                        </Typography>

                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Entrada neta | {moneda}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {neta}
                        </Typography>

                    </Grid>
                    {estado !== 'ABIERTA' && <>
                        <Grid item xs={6}
                              container
                              justify="flex-end"
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                Premios | {moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}
                              container
                              justify="flex-start"
                              className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                {premio}
                            </Typography>

                        </Grid>
                        <Grid item xs={6}
                              container
                              justify="flex-end"
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                Ganancia/Perdida | {moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}
                              container
                              justify="flex-start"
                              className={classes.text}
                        >
                            <Typography variant="body1" gutterBottom className={classes.text}>
                                {balance}
                            </Typography>

                        </Grid>


                    </>}
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    
                    <Grid item xs={6}
                          container
                          justify="center"
                          className={classes.text}
                    >
                        <Typography variant="h5" gutterBottom
                                    className={`${estado === 'ABIERTA' ? classes.textSorteoAbierto : classes.close} ${classes.sorteoTextContainer}`}>
                            {estado === 'ABIERTA' ? "Sorteo Abierto" : "Sorteo Cerrado"}
                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ApuestasActivasAdminData;