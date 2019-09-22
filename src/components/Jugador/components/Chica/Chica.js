import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from "@material-ui/core/colors/index";
import NumberFormat from 'react-number-format';
import { Colors } from '../../../../utils/__colors';
import Divider from '@material-ui/core/Divider';
import ChicaLogo from '../../../View/assets/Chica_PNG.png';
import { Container } from '@material-ui/core';
import { MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import CustomText from '../../../View/CustomText';

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
        marginTop: '.5rem',
        background: Colors.Main,
        boxShadow: 'none',
        borderRadius: '0'
    },
    inputData: {
        background: Colors.Input_bkg,
    },
    labelChica: {
        marginTop: ".5rem"
    }

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
    onChangeChicaType, ...props
}) {
    const classes = useStyles();
    const activate = props.activate ? props.activate : false;


    return (
        <Container maxWidth="xs" className="pl-0 pr-0 container_diaria">
            <Grid container direction="row" className="select_title">
                <Grid item xs={3} className="title_image">
                    <img src={ChicaLogo} alt="ABIERTA" />
                </Grid>
                <Grid item xs={6} className="title_text">
                    <span>Venta x miles</span>
                </Grid>
                <Grid item xs={1} className="title_radio">
                    <FormControlLabel
                        value="miles"
                        control={
                            <RedRadio
                                checked={chicaType === 'cm'}
                                onChange={onChangeChicaType}
                                value="cm"
                                name="radio-button-chica"
                                inputProps={{ 'aria-label': 'CM' }}
                                disabled={activate}
                            />}
                    />
                </Grid>
            </Grid>
            <Container maxWidth="xs" className="container_input_area">
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            onChange={onChangeCostoMil}
                            value={chicaType !== 'cm' ? '' : costoMil}
                            disabled={chicaType !== 'cm' || activate}
                            icon={TiPencil}></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Costo x mil</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15 pb-15">
                    <Grid item className="input">
                        <CustomText
                            value={1000}
                            disabled={chicaType !== 'cm' || activate}
                            onChange={onChangePremioMil}
                        ></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Premio</span>
                    </Grid>
                </Grid>
            </Container>
            <Grid container direction="row" className="select_title">
                <Grid item xs={3} className="title_image">
                    <img src={ChicaLogo} alt="ABIERTA" />
                </Grid>
                <Grid item xs={6} className="title_text">
                    <span>Venta directo $-L</span>
                </Grid>
                <Grid item xs={1} className="title_radio">
                    <FormControlLabel
                        value="directo"
                        control={
                            <RedRadio
                                checked={chicaType === 'cd'}
                                onChange={onChangeChicaType}
                                value="cd"
                                name="radio-button-chica"
                                inputProps={{ 'aria-label': 'CD' }}
                                disabled={activate}

                            />}
                    />
                </Grid>
            </Grid>
            <Container maxWidth="xs" className="container_input_area">
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            onChange={onChangeComisionMil}
                            value={chicaType !== 'cd' ? '' : comision}
                            disabled={chicaType !== 'cd' || activate}
                            icon={TiPencil}></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>comisión %</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15 pb-15">
                    <Grid item className="input">
                        <CustomText
                            value={chicaType !== 'cd' ? '' : premioDirecto}
                            disabled={chicaType !== 'cd' || activate}
                            onChange={onChangePremioDirectoMil}
                            icon={TiPencil}
                        ></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Premio</span>
                    </Grid>
                </Grid>
            </Container>
            <Grid container direction="row" className="select_title">
                <Grid item xs={3} className="title_image">
                    <img src={ChicaLogo} alt="ABIERTA" />
                </Grid>
                <Grid item xs={6} className="title_text">
                    <span>Venta pedazos</span>
                </Grid>
                <Grid item xs={1} className="title_radio">
                    <FormControlLabel
                        value="pedazo"
                        control={
                            <RedRadio
                                checked={chicaType === 'cp'}
                                onChange={onChangeChicaType}
                                value="cp"
                                name="radio-button-chica"
                                inputProps={{ 'aria-label': 'CP' }}
                                disabled={activate}

                            />}
                    />
                </Grid>
            </Grid>
            <Container maxWidth="xs" className="container_input_area">
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            onChange={onChangeComisionPedazos}
                            value={chicaType !== 'cp' ? '' : comisionPedazos}
                            disabled={chicaType !== 'cp' || activate}
                            icon={TiPencil}></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Costo Pedazo</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            value={chicaType !== 'cp' ? '' : costoPedazos}
                            disabled={chicaType !== 'cp' || activate}
                            onChange={onChangeCostoPedazos}
                            icon={TiPencil}
                        ></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>comisión %</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15 pb-15">
                    <Grid item className="input">
                        <CustomText
                            value={chicaType !== 'cp' ? '' : premioPedazos}
                            disabled={chicaType !== 'cp' || activate}
                            onChange={onChangePremioPedazos}
                            icon={TiPencil}
                        ></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Premio</span>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}