import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import NumerosActivosUserEntry from './NumerosActivosUserEntry/index';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const NumerosGanadoresEntry = ({title, numero, pairJBS, ...props}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {

    }, [])
    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                            TransitionProps={{unmountOnExit: true}}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>{numero ? numero : "01"}</Typography>
                    <Typography className={classes.secondaryHeading}>{title ? title : "Default"}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {pairJBS.length !== 0 ?
                        <List className={classes.root}>
                            {pairJBS.map((player, index) =>
                                    <NumerosActivosUserEntry key={index} {...player} {...props}/>

                            )
                            }

                        </List>
                        :
                        <Typography>
                            Ningun usuario apostó al número ganador
                        </Typography>
                    }


                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );


};

export default NumerosGanadoresEntry;