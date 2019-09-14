import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from "../../utils/__colors";
const useStyles = makeStyles(theme => ({
    headerContainer: {
        background: Colors.Main,
        marginBottom: "1rem"
    },
    label: {
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
}));

const HeaderDescription = ({ ...props }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
                className={classes.headerContainer}
            >
                <Grid item sm={6} className={classes.label}>
                    <Typography variant="h6" gutterBottom className={"form__center-label"}>
                        {props.name}
                    </Typography>
                </Grid>
                <Grid item sm={6}>

                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default HeaderDescription;