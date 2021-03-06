import React from 'react';
import { withStyles } from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DiariaLogo from '../../../View/assets/Diaria_PNG.png';
import { Container } from '@material-ui/core';
import CustomText from '../../../View/CustomText';
// import { MdSettings } from "react-icons/md";
import { TiPencil } from "react-icons/ti";

import '../../../../common.css'
import './styles.css'

const GreenRadio = withStyles({
    root: {
        color: '#4F84C8',
        '&$checked': {
            color: '#4F84C8',
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

export default function Diaria({
    premio, costo, comision, premioLempiras,
    onChangePremioMil,
    onChangePremioLempirasMil,
    onChangeCostoMil,
    onChangeComisionMil,
    diariaType,
    onChangeDiariaType, ...props
}) {

    const activate = props.activate ? props.activate : false;

    return (
        <Container maxwidth="xs" className="pl-0 pr-0 container_diaria">
            <Grid container direction="row" className="select_title">
                <Grid item xs={3} className="title_image">
                    <img src={DiariaLogo} alt="ABIERTA" />
                </Grid>
                <Grid item xs={6} className="title_text">
                    <span>Venta x miles</span>
                </Grid>
                <Grid item xs={1} className="title_radio">
                    <FormControlLabel
                        value="d-miles"
                        control={
                            <GreenRadio
                                checked={diariaType === 'dm'}
                                onChange={onChangeDiariaType}
                                value="dm"
                                name="radio-button-diaria"
                                inputProps={{ 'aria-label': 'DM' }}
                                disabled={activate}
                            />}
                    />
                </Grid>
            </Grid>
            <Container maxwidth="xs" className="container_input_area">
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            number
                            onChange={onChangeCostoMil}
                            value={diariaType !== 'dm' ? '' : costo}
                            disabled={diariaType !== 'dm' || activate}
                            icon={TiPencil}></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>Costo x mil</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15 pb-15">
                    <Grid item className="input">
                        <CustomText
                            number
                            value={1000}
                            disabled={diariaType !== 'dm' || activate}
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
                    <img src={DiariaLogo} alt="ABIERTA" />
                </Grid>
                <Grid item xs={6} className="title_text">
                    <span>Venta directo $-L</span>
                </Grid>
                <Grid item xs={1} className="title_radio">
                    <FormControlLabel
                        value="d-riecto"
                        control={
                            <GreenRadio
                                checked={diariaType === 'dd'}
                                onChange={onChangeDiariaType}
                                value="dd"
                                name="radio-button-diaria"
                                inputProps={{ 'aria-label': 'DD' }}
                                disabled={activate}

                            />}
                    />
                </Grid>
            </Grid>
            <Container maxwidth="xs" className="container_input_area">
                <Grid container direction="row" className="row_input pl-45 pt-15">
                    <Grid item className="input">
                        <CustomText
                            number
                            onChange={onChangeComisionMil}
                            value={diariaType !== 'dd' ? '' : comision}
                            disabled={diariaType !== 'dd' || activate}
                            icon={TiPencil}></CustomText>
                    </Grid>
                    <Grid item className="text">
                        <span>comisión %</span>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="row_input pl-45 pt-15 pb-15">
                    <Grid item className="input">
                        <CustomText
                            number
                            disabled={diariaType !== 'dd' || activate}
                            value={diariaType !== 'dd' ? '' : premioLempiras}
                            onChange={onChangePremioLempirasMil}
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