import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {green} from "@material-ui/core/colors/index";

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        marginTop: '.5rem'
    },

}));

export default function Diaria({
                                   premio, costo, comision, premioLempiras,
                                   onChangePremioMil,
                                   onChangePremioLempirasMil,
                                   onChangeCostoMil,
                                   onChangeComisionMil,
                                   diariaType,
                                   onChangeDiariaType,
                               }) {


    const classes = useStyles();
    // const [selectedValue, setSelectedValue] = React.useState('dm');
    const [select, setSelectState] = React.useState(true);

    function handleChange(event) {
        // setSelectedValue(event.target.value);
        setSelectState(!select);
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="flex-start">
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                DIARIA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                apostador tipo "por miles"
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                value="d-miles"
                                control={
                                    <GreenRadio
                                        checked={diariaType === 'dm'}
                                        onChange={onChangeDiariaType}
                                        value="dm"
                                        name="radio-button-diaria"
                                        inputProps={{'aria-label': 'DM'}}
                                    />}
                            />
                        </Grid>
                        <TextField
                            id="diaria-miles-input-costo-miles"
                            label="Costo x mil"
                            placeholder="Costo x mil"
                            margin="normal"
                            value={diariaType!=='dm' ? '' : costo}
                            variant="outlined"
                            fullWidth
                            disabled={diariaType!=='dm'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangeCostoMil}
                        />
                        <TextField
                            id="diaria-miles-input-premio-miles"
                            label="Premio x mil"
                            placeholder="Premio x mil"
                            value={diariaType!=='dm' ? '' : premio}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={diariaType!=='dm'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={onChangePremioMil}
                        />
                    </Grid>
                </CardContent>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={1}
                          direction="row"
                          justify="center"
                          alignItems="flex-start">
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom className={"form__center-label"}>
                                DIARIA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                apostador tipo directo "L/ $"
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                value="d-riecto"
                                control={
                                    <GreenRadio
                                        checked={diariaType === 'dd'}
                                        onChange={onChangeDiariaType}
                                        value="dd"
                                        name="radio-button-diaria"
                                        inputProps={{'aria-label': 'DD'}}
                                    />}
                            />
                        </Grid>
                        <TextField
                            id="diaria-directo-input-comision-porciento"
                            label="Comisión %"
                            placeholder="Comisión %"
                            margin="normal"
                            variant="outlined"
                            value={diariaType!=='dd' ? '' : comision}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={diariaType!=='dd'}
                            onChange={onChangeComisionMil}
                        />
                        <TextField
                            id="diaria-directo-input-premio-miles"
                            label="Premio x mil"
                            placeholder="Premio x mil"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={diariaType!=='dd'}
                            value={diariaType!=='dd' ? '' : premioLempiras}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // value={select ? '': premioL}
                            onChange={onChangePremioLempirasMil}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}