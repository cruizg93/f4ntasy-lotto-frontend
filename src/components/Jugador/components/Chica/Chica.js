import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles/index";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {red} from "@material-ui/core/colors/index";
import NumberFormat from 'react-number-format';

const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
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

export default function Chica({
                                  premioMil,
                                  premioDirecto,
                                  premioPedazos,
                                  costoMil,
                                  comision,
                                  costoPedazos,
                                  comisionPedazos,
                                  onChangePremioMil,
                                  onChangePremioDirectoMil,
                                  onChangePremioPedazos,
                                  onChangeCostoMil,
                                  onChangeComisionMil,
                                  onChangeCostoPedazos,
                                  onChangeComisionPedazos,
                                  chicaType,
                                  onChangeChicaType,
                              }) {
    const classes = useStyles();


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
                                CHICA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                apostador tipo "por miles"
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                value="miles"
                                control={
                                    <RedRadio
                                        checked={chicaType === 'cm'}
                                        onChange={onChangeChicaType}
                                        value="cm"
                                        name="radio-button-chica"
                                        inputProps={{'aria-label': 'CM'}}
                                    />}
                            />
                        </Grid>
                        <NumberFormat
                            id="chica-miles-input-costo-miles"
                            // hintText="Costo x mil"
                            label="Costo x mil"
                            placeholder="Costo x mil"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={chicaType !== 'cm' ? '' : costoMil}
                            disabled={chicaType !== 'cm'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            customInput={TextField}
                            onChange={onChangeCostoMil}
                        />
                        <NumberFormat
                            id="chica-miles-input-premio-miles"
                            label="Premio x mil"
                            placeholder="Premio x mil"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={chicaType !== 'cm'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            customInput={TextField}
                            value={chicaType !== 'cm' ? '' : premioMil}
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
                                CHICA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                apostador tipo directo "L/ $"
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                value="directo"
                                control={
                                    <RedRadio
                                        checked={chicaType === 'cd'}
                                        onChange={onChangeChicaType}
                                        value="cd"
                                        name="radio-button-chica"
                                        inputProps={{'aria-label': 'CD'}}
                                    />}
                            />
                        </Grid>
                        <NumberFormat
                            id="chica-directo-input-comision-porciento"
                            label="Comisión %"
                            placeholder="Comisión %"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={chicaType !== 'cd'}
                            customInput={TextField}
                            value={chicaType !== 'cd' ? '' : comision}
                            onChange={onChangeComisionMil}
                        />
                        <NumberFormat
                            id="chica-directo-input-premio-miles"
                            label="Premio x mil"
                            placeholder="Premio x mil"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={chicaType !== 'cd'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            customInput={TextField}
                            value={chicaType !== 'cd' ? '' : premioDirecto}
                            onChange={onChangePremioDirectoMil}
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
                                CHICA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" gutterBottom>
                                apostador tipo directo "por pedazos"
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControlLabel
                                value="pedazo"
                                control={
                                    <RedRadio
                                        checked={chicaType === 'cp'}
                                        onChange={onChangeChicaType}
                                        value="cp"
                                        name="radio-button-chica"
                                        inputProps={{'aria-label': 'CP'}}
                                    />}
                            />
                        </Grid>
                        <NumberFormat
                            id="chica-pedazos-input-comision-porciento"
                            label="Comisión %"
                            placeholder="Comisión %"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={chicaType !== 'cp'}
                            customInput={TextField}
                            value={chicaType !== 'cp' ? '' : comisionPedazos}
                            onChange={onChangeComisionPedazos}
                        />
                        <NumberFormat
                            id="chica-pedazos-input-costo"
                            label="Costo pedazos"
                            placeholder="Costo pedazos"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={chicaType !== 'cp'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            customInput={TextField}
                            value={chicaType !== 'cp' ? '' : costoPedazos}
                            onChange={onChangeCostoPedazos}
                        />
                        <NumberFormat
                            id="chica-pedazos-input-premio-miles"
                            label="Premio x mil"
                            placeholder="Premio x mil"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={chicaType !== 'cp'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            customInput={TextField}
                            value={chicaType !== 'cp' ? '' : premioPedazos}
                            onChange={onChangePremioPedazos}
                        />
                    </Grid>
                </CardContent>
            </Card>

        </>
    )
}