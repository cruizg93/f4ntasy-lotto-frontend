import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { red, blue } from "@material-ui/core/colors/index";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Add, Remove } from '@material-ui/icons'
import { FormatCurrencySymbol } from '../../../../utils/__currency';
import RowList from '../../../View/RowList'
import ExpanionPanelDay from './ExpansionPanelDay';
import './styles.css'


const useStyles = makeStyles(theme => ({
    disabled: {
        background: '#f4f4f4',
        opacity: '1 !important'
    },
}));


const HistorialData = ({ match: { url }, ...props }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChangeExpand = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const color = props.apuesta.valor > 0 ? '#009144' :
        props.apuesta.valor < 0 ? '#ED1C24' : '#4E84C8';
    const sign = props.apuesta.valor > 0 ? '+' :
        props.apuesta.valor < 0 ? '-' : '\u00A0';
    const disable = props.apuesta.valor === 0 ? true : false;


    return (
        <Grid container maxwidth='xs' className="day_text_valor">
            <Grid item xs={12} >
                <ExpansionPanel onChange={handleChangeExpand('panel1')}
                    disabled={disable}
                    TransitionProps={{ unmountOnExit: true }} className="expansionPanel">
                    <ExpansionPanelSummary
                        expandIcon={expanded ? <Remove className="expansion_icon_remove" /> : <Add className="expansion_icon" />}
                        aria-controls="panel1bh-content"
                        classes={{ disabled: classes.disabled }}
                    >
                        <Grid item className="numeroText">
                            {props.apuesta.numeroText}
                        </Grid>
                        <Grid item className="valorText" style={{ color: color }}>
                            <div className="right">
                                <span>{sign}{props.money}</span>
                            </div>
                            <div className="left">
                                <span>
                                    {'\u00A0'}{'\u00A0'}{FormatCurrencySymbol(props.money, Math.abs(props.apuesta.valor).toFixed(2))}
                                </span>
                            </div>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="expansionPanelBody">
                        {
                            props.apuesta.details ?
                                <>
                                    {
                                        props.apuesta.details.listWin.map((row, index) =>
                                            <Grid item xs={12} key={index}>
                                                <ExpanionPanelDay winner={row}></ExpanionPanelDay>
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12} style={{ height: 126, justifyContent: 'center', display: 'flex' }}>
                                        <Grid item xs={6} className="summary">
                                            <RowList col_1={['Costo:', 'Comisión:', 'Total:']} symbol={props.money}
                                                col_2={[props.apuesta.details.costo, props.apuesta.details.comision, props.apuesta.details.total]}
                                                style={{ height: 90 }}></RowList>
                                            <Grid item className="premio">
                                                <div className="sign">
                                                    <span>Premio</span>
                                                </div>
                                                <div className="value">
                                                    <span>
                                                        {props.money}{'\u00A0'}{'\u00A0'}{'\u00A0'}{props.apuesta.details.premio.toFixed(2)}
                                                    </span>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                                : null
                        }

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Grid>

    )
};

export default HistorialData;

