import React from 'react';
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

const ApuestaData = ({match: {url}, id, nombre, total, comision, riesgo, estado, ...props}) => {
    const classes = useStyles();
    const [pathnameUrl, setPathnameURL]=React.useState(`${url}/${id}`)
    React.useEffect(()=>{
        console.log(props.main)
        if(props.main){
            setPathnameURL(`${url}usuario/apuestas/${id}`)
        }
    })
    return (
        <Grid item xs={12} component={Link}
              to={
                  {
                      pathname: pathnameUrl,
                      state: {
                          title: {nombre},
                      }
                  }
              }
              className={estado === 'ABIERTA' ? classes.component : classes.componentDisable}>
            <Paper key={props.index} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {nombre}
                </Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={3}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            apuestas |
                        </Typography>
                    </Grid>
                    <Grid item xs={9}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {total}
                        </Typography>

                    </Grid>
                    <Grid item xs={3}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            comisiones |
                        </Typography>
                    </Grid>
                    <Grid item xs={9}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {comision}
                        </Typography>

                    </Grid>
                    <Grid item xs={3}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            riesgo |
                        </Typography>
                    </Grid>
                    <Grid item xs={9}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {riesgo}
                        </Typography>

                    </Grid>
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
};

export default ApuestaData;