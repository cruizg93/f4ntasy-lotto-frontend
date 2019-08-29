import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import NumerosActivosUserEntry from './NumerosActivosUserEntry/index';
import {authenticationService} from "../../../../service/api/authentication/authentication.service";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import {adminService} from "../../../../service/api/admin/admin.service";

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
        marginLeft: '2rem',
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

const NumerosGanadoresEntry = ({id, title, numero, pairJBS, ...props}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [currentRole, setCurrentRole] = useState('Player');
    const [newNumber, setNewNumber] = useState(-1);
    const [oldNumber, setOldNumber] = useState(-1);

    const handle = props.handle;
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function onNumberChange(e) {
        setNewNumber(e.target.value);
    }

    function updateValue() {

        if (newNumber !== '' && newNumber !== 1
            && newNumber >= 0 && newNumber < 100
        ) {
          /*   adminService.update_numero_ganador(newNumber,oldNumber, id).then((result) => {
            }) */
            
            adminService.fix_numero_ganador(newNumber, id).then((result) => {
            })
        }
        setNewNumber(-1)
    }

    useEffect(() => {
        setOldNumber(numero)
        setCurrentRole(authenticationService.type_user())

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
                    {currentRole === "Master" ?
                        <>
                            <Typography onClick={handleClickOpen}
                                        className={classes.heading}>{numero ? numero : "-01"}</Typography>

                            <div>
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Cambiar número ganador</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            {numero} {" "} Este número fue editado por error?.
                                        </DialogContentText>
                                        <NumberFormat
                                            id={`admin-numero-ganador-insert`}
                                            placeholder="Número"
                                            margin="normal"
                                            variant="outlined"
                                            value={newNumber === -1 ? '' : newNumber}
                                            onChange={onNumberChange}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => {
                                            handleClose();
                                            updateValue();
                                            handle()
                                        }}
                                                color="primary">
                                            Cambiar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </>
                        :
                        <Typography className={classes.heading}>{numero ? numero : "-01"}</Typography>
                    }

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