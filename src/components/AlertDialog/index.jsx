import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../utils/__colors';

const useStyles = makeStyles(theme => ({

    headerContainer: {
        background: Colors.Ligth_Red,
        marginBottom: "1rem"
    },
    editarJugadorLabel: {
        color: Colors.Btn_Red,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },


}));

const AlertDialog = ({ ...props }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-start"
            className={classes.headerContainer}
        >
            <Grid item xs={8} className={classes.editarJugadorLabel}>
                <Typography variant="body1" gutterBottom className={"form__center-label"}>
                    {props.msg}
                </Typography>
            </Grid>

        </Grid>
    );
}


export default AlertDialog;