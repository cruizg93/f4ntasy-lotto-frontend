import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";

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

//balance: 87.615
// comision: 2.385
// estado: "CERRADA"
// id: 3
// neta: 87.615
// premio: 0
// title: "Julio 8, 2019 - 9 pm"
// total: 90
const ApuestasActivasAdminData = ({
                                      match: {url}, total, title, premio, neta, id,
                                      estado, comision, balance, ...props
                                  }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} component={Link}
              to={
                  {
                      pathname: `${url}/${id}`,
                      state: {
                          title: {title},
                      }
                  }
              }
              className={estado === 'ABIERTA' ? classes.component : classes.componentDisable}>
            <Paper key={props.index} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total Apuestas |
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
                            Total Comisiones |
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
                            Entrada neta |
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
                                Premios |
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
                                Ganancia/Perdida |
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

                    <Grid item xs={12}
                          container
                          justify="center"
                          className={classes.text}
                    >
                        <Typography variant="h5" gutterBottom
                                    className={estado === 'ABIERTA' ? classes.open : classes.close}>
                            {estado}
                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ApuestasActivasAdminData;