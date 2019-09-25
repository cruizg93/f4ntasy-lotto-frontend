import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import es from 'date-fns/locale/es';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,

} from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import { adminService } from "../../../../../service/api/admin/admin.service";


const localeMap = {
    es: es,

};
const useStyles = makeStyles({
    grid: {
        width: '60%',
    },
});


const ImprimirButton = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        backgroundColor: '#2b85c2',
        color: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BalanceAdmin = (props) => {
    const [locale, setLocale] = useState('es');
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDate1, setSelectedDate1] = React.useState(new Date());
    const [disable, setDisable] = useState(false);
    const [value, setValue] = useState(0.0);


    const classes = useStyles();

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    function handleDateChange1(date) {
        setSelectedDate1(date);
    }

    function handleOnClick() {
        setDisable(true)
        adminService.get_ganancias_perdidas(selectedDate, selectedDate1).then((result) => {
            setValue((result.data).toFixed(2));
        })
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}
                direction="row"
                justify="center"
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                    <Grid container className={classes.grid} justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date-1"
                            label="Desde"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                    <Grid container className={classes.grid} justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="mui-pickers-date-2"
                            label="Hasta"
                            value={selectedDate1}
                            onChange={handleDateChange1}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center"
            >

                <Grid item xs={6}>
                    <ImprimirButton variant="outlined" color="primary"
                        disabled={(selectedDate1 - selectedDate) < 0}
                        onClick={handleOnClick}
                    >
                        <Typography variant="body1"  >
                            Buscar
                        </Typography>
                    </ImprimirButton>
                </Grid>

            </Grid>
            {disable ?
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                >
                    <Grid container
                        direction="row"
                        justify="center">

                        <Typography variant="h4"  >
                            Perdidas/Ganancias
                        </Typography>

                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center">

                        <Typography variant="h5"  >
                            {value}
                        </Typography>

                    </Grid>
                </Grid>

                :
                null}

        </React.Fragment>
    );
}

export default BalanceAdmin;