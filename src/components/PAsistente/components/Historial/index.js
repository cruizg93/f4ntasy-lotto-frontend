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


const HistorialDataPAsistente = ({match: {url}, id, title, total, numero, comision, premio, balance, ...props}) => {
    const classes = useStyles();

    return (
        <Grid item sm={12} component={Link}
              to={
                  {
                      pathname: `${url}/${id}`,
                      state: {
                          id: id,
                          title: title,
                          total: total,
                          numero: numero,
                      }
                  }
              }
              className={classes.component}
        >
            <Paper key={props.index} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {title} {" @ "} {numero}
                </Typography>
                <Divider/>
                <Grid container>
                    <Grid item sm={6}
                          container
                          justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            Total apuestas |
                        </Typography>
                    </Grid>
                    <Grid item sm={6}
                          container
                          justify="flex-start"
                          className={classes.text}
                    >
                        <Typography variant="body1" gutterBottom className={classes.text}>
                            {total}
                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
        </Grid>

    )
};

export default HistorialDataPAsistente;