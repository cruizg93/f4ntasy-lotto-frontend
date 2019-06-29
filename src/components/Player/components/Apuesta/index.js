import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

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
    text: {
        fontWeight: 'bold'
    }

}));

const ApuestaData = ({match: {url}, id, nombre, total, comision, riesgo, ...props}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} component={Link} to={`${url}/${id}`} className={classes.component}>
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
                </Grid>
            </Paper>
        </Grid>

    )
};

export default ApuestaData;