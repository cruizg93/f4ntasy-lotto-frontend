import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { adminService } from "../../../../../service/api/admin/admin.service";
import NumeroGanadorEntry from "../../../components/NumeroGanadorEntry/index";
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../../../utils/__colors';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    headerContainer: {
        background: Colors.Main,
        marginBottom: "1rem",
    },
    setNumeroGanadorLabel: {
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },
}))

const NumeroGanador = (props) => {
    const [entry, setEntryData] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        adminService.get_numeros_ganadores().then((result) => {
            setEntryData(Array.from(result.data));
        })
    }, []);

    function reload() {
        adminService.get_numeros_ganadores().then((result) => {
            setEntryData([])
            setEntryData(Array.from(result.data));
        })
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
                className={classes.headerContainer}
            >
                <Grid item xs={9} className={classes.setNumeroGanadorLabel}>
                    <Typography variant="h6" className={"form__center-label"}>
                        Fijar numero ganador
                        </Typography>
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
            <Grid container spacing={3}
                direction="row"
                justify="center"
                alignItems="flex-start">
                {entry.length !== 0 ?
                    entry.map((apuesta, index) =>
                        <NumeroGanadorEntry key={index} {...apuesta} {...props} handler={reload} />
                    )

                    :
                    "No hay datos disponibles"
                }
            </Grid>
        </React.Fragment>
    )
};

export default NumeroGanador;