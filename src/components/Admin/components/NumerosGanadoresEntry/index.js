import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import authenticationService from "../../../../service/api/authentication/authentication.service";
import { adminService } from "../../../../service/api/admin/admin.service";
import CircleNumber from "../../../Utils/CircleNumber/index";
import { FormatNumberSymbol } from '../../../../utils/__currency';
import { Add, Remove } from '@material-ui/icons';
import DiariaLogo from '../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../View/assets/Chica_PNG.png';

import ConfirmNumWinDialog from '../../../View/Dialog/ConfirmNumWinDialog';
import InputNumWinDialog from '../../../View/Dialog/InputNumWinDialog';
import InformationDialog from '../../../View/Dialog/InformationDialog';
import './styles.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
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

const NumerosGanadoresEntry = ({ numero, numeroGanadorId, sorteoId, sorteoType, hour, day, premio, jugadores, moneda, isMaster, ...props }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [currentRole, setCurrentRole] = useState('Player');
    const [open, setOpen] = useState(false);
    const [openAddition, setOpenAddition] = useState(false);
    const [errorPasswordOpen, setErrorPasswordOpen] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose(value) {
        setOpen(false);
        if (value === true) {
            setOpenAddition(true)
        }
    }

    function handleCloseAddition(numero, flag, password = '') {
        setOpen(false);
        setOpenAddition(false);
        if (flag === true) {
            adminService.admin_password_confirm('1', password).then((result) => {
                if (result.data === true) {
                    updateValue(numero)
                } else {
                    setErrorPasswordOpen(true)
                }
            })
        }
    }

    function handleClose_password_error() {
        setOpenAddition(false);
        setErrorPasswordOpen(false);
    }

    function updateValue(numero) {
        adminService.fix_numero_ganador(numero, sorteoId).then((result) => {
            props.handle()
        })
    }

    useEffect(() => {
        setCurrentRole(authenticationService.type_user())

    }, [])
    return (
        <div className={classes.root} >
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                TransitionProps={{ unmountOnExit: true }}
            >
                <ExpansionPanelSummary
                    expandIcon={expanded ? <Remove className="expansion_icon" /> : <Add className="expansion_icon" />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className="expansion_numeros_ganadores"
                >
                    <Grid className="circle_number"
                        style={{ display: 'flex', justifyContent: 'center' }}
                        onClick={() => isMaster ? handleClickOpen(): ''}
                    >
                        <CircleNumber numero={numero ? numero.toString().padStart(2, "0") : "-01"}
                            width={'45px'} fontSize={'25px'}
                            color={'#183721'}
                        >
                        </CircleNumber>
                    </Grid>
                    <Grid className="icon" >
                        {sorteoType.toLowerCase() === "diaria" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
                    </Grid>
                    <Grid className="time_day">
                        <div className="hour">{sorteoType.toLowerCase() === "diaria" ? hour : "12 pm"}</div>
                        <div className="day">{day}</div>
                    </Grid>
                    <Grid className="value">
                        {moneda}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(premio)}
                    </Grid>
                </ExpansionPanelSummary>
                {jugadores.length !== 0 ?
                    <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                        {jugadores.map((row, index) =>
                            <Grid container key={index} className="container_expansion_details">
                                <div className="username">
                                    {row.username}-{moneda}{'['}{row.name}{']'}
                                </div>
                                <div className="user_value">
                                    {moneda}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(row.premio)}
                                </div>
                            </Grid>
                        )
                        }
                    </ExpansionPanelDetails>
                    :
                    null
                }
            </ExpansionPanel>
            <ConfirmNumWinDialog
                open={open}
                handleClose={handleClose}
                title={'Va a cambiar el número ganador?'}
                icon={'help'}
                numero={numero ? numero.toString().padStart(2, "0") : "-01"}
                type={sorteoType.toUpperCase()}
                time={hour}
                day={day}
            >
            </ConfirmNumWinDialog>
            <InputNumWinDialog
                open={openAddition}
                handleClose={handleCloseAddition}
                title={`Adicionar número ganador`}
                context={sorteoType + ' - ' + (sorteoType.toLowerCase() === "diaria" ? hour : "12 pm") + ' - ' + day}
                titleFontSize={'19px'}
                contentFontSize={'16px'}
                contentHeight={'200px'}>
            </InputNumWinDialog>
            <InformationDialog
                open={errorPasswordOpen}
                handleClose={handleClose_password_error}
                title={'Contraseña incorrecta! intente otra vez...'}
                context={''}
                icon={'ioIosWarning'}
                iconSize={67}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'40px'}>
            </InformationDialog>

            {/* {currentRole === "Master" ?
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
                </div> : null
            } */}
        </div>
    );


};

export default NumerosGanadoresEntry;