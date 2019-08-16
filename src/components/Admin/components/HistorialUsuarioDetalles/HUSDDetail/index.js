import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

const HUSDDetailEntry = ({id, title, total, comision, premio,
                             ...props
                         }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12}
        >
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
                            Premio |
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


                    <Grid item xs={12}
                          container
                          justify="center"
                          className={classes.text}
                    >
                        <Typography variant="h5" gutterBottom
                                    className={classes.close}>
                            Terminado
                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default HUSDDetailEntry;