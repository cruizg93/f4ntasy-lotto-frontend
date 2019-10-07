import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Grid from '@material-ui/core/Grid';
import { playerService } from "../../../../../service/api/player/player.service";
import ListaApuestas from "../../Apuesta/ListaApuestas";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Typography from '@material-ui/core/Typography';
import { Colors } from '../../../../../utils/__colors';
import TopBar from '../../../../View/jugador/TopBar';
import TextField from '@material-ui/core/TextField';
import { MdFileDownload } from "react-icons/md";
import { Currency } from '../../../../../utils/__currency';

import ConfirmDialog from '../../../../View/Dialog/ConfirmDialog';
import ConfirmDialogR from '../../../../View/Dialog/ConfirmDialog_R';
import InformationDialog from '../../../../View/Dialog/InformationDialog';
import ErrorInfoDialog from '../../../../View/Dialog/ErrorInfoDialog';

import RouteLeavingGuard from './RouteLeavingGuard'

import { userActions } from '../../../../../store/actions';
import './styles.css'


const useStyles = theme => ({
    root: {
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    },
    fixedElement: {
        position: 'fixed',
        width: '100%',
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
    },
    textApuestaDescription: {
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    },
    inputIcon: {
        color: "#afb6b8",
        "& svg": {
            paddingRight: "0.1rem",
            borderRight: "#3366cc 1px solid",
        }
    },
    buttonContainerApuestas: {
        backgroundColor: "#ffffff",
        position: "fixed",
        display: "flex",
        zIndex: "25",
        bottom: "4px",
        height: '76px',
        lineHeight: '76px',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: "0.5rem",
        paddingLeft: "1rem",
        "& div": {
            paddingRight: "1rem",
            justifyContent: "center",
            alignItems: "center",
        }
    },
});

class AdicionarNumeroApuestaAsistente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entryNumero: null,
            entryUnidades: null,
            entryList: [],
            entry: [],
            apuestaType: '',
            total: 0.00,
            totalCurrent: 0.00,
            totalUnidades: 0.00,
            mounted: true,
            day: '',
            hour: '',
            name: '',
            isAgregarApuestaButtonEnable: true,
            displayApuestaListIndex: true,
            openFinalizarCompraDialog: false,
            openRemoveAll: false,
            openComprar: false,
            openComprarInfo: false,
            openError500Info: false,
            openError409Info: false,
            isAgregar: false,
            showAddBtn: false,
            numVal: '',
            isDirty: false
        }
        this.apuestaCurrency = (this.props.location.state.moneda && this.props.location.state.moneda === 'L') ? Currency.Lempira : Currency.Dollar;
        this.match = props.match;

        this.entryInputContainerRef = React.createRef();
        this.entryNumeroInputRef = React.createRef();
        this.entryUnidadesInputRef = React.createRef();

        this.isNumerofocus = false;
        this.isUnidadesfocus = false;
        this.isFirstMount = true;
    }

    componentDidMount() {
        let reg = /^\d+$/;
        if (!reg.test(this.match.params.apuestaId)) {
            this.props.history.push('/asistente/apuestas');
            return () => {
                this.state.mounted.current = false;
            }
        }
        const { dispatch } = this.props;
        dispatch(userActions.loading_start())
        playerService.list_of_numbers_by_apuesta_id(this.match.params.apuestaId).then((result) => {
            this.setState({ name: result.data.name });
            this.setState({ entry: Array.from(result.data.list) });
            this.setState({ hour: result.data.hour });
            this.setState({ day: result.data.day });
            this.setState({ apuestaType: result.data.type });

            dispatch(userActions.loading_end())
        })
            .catch(function (error) {
                dispatch(userActions.loading_end())
            });
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.isNumerofocus) {
            this.entryNumeroInputRef.current.focus();
        }
        if (this.isUnidadesfocus) {
            this.entryUnidadesInputRef.current.focus();
        }
    }

    handleNumeroInputFocus = (event) => {
        if (event.target.id === 'input-entry-numero' && this.isNumerofocus === false) {
            this.isNumerofocus = true
            this.isUnidadesfocus = false
        }
        if (event.target.id === 'input-entry-unidad' && this.isUnidadesfocus === false) {
            this.isNumerofocus = false;
            this.isUnidadesfocus = true;
        }
        setTimeout(() => {
            this.showAddButton()
        }, 50);
    }

    handleNumeroInputBlur = (event) => {
        if (event.target.id === 'input-entry-numero' && this.isNumerofocus === true) {
            this.isNumerofocus = false
        }
        if (event.target.id === 'input-entry-unidad' && this.isUnidadesfocus === true) {
            this.isUnidadesfocus = false
        }
        setTimeout(() => {
            this.hideAddButton()
        }, 50);
    }

    showAddButton() {
        if (!this.state.showAddBtn) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    showAddBtn: true,
                });
            }, 50);
        }
    }

    hideAddButton() {
        if (!(this.isNumerofocus || this.isUnidadesfocus)) {
            setTimeout(() => {
                this.setState((state) => {
                    return { showAddBtn: false };
                });
            }, 100);
        }
    }

    inpuntKeyPressedEvent = (event) => {
        if (event.key === "Enter") {
            let numero = this.entryNumeroInputRef.current.value;
            let unidades = this.entryUnidadesInputRef.current.value;
            if (unidades.length == 0 || numero.length == 0) {
                return;
            } else {
                this.agregarApuesta(null);
            }
        }
    }

    handleComprar = (event) => {
        if (this.state.entryList.length === 0) {
            return;
        }
    }

    agregarApuesta = (event) => {
        let numero = this.entryNumeroInputRef.current.value;
        let current = this.entryUnidadesInputRef.current.value;//costo
        if (current.length == 0 || numero.length == 0) {
            return;
        }
        let costoApuesta = parseFloat(current) * parseFloat(this.state.costoXMil);
        let costoTotal = parseInt(costoApuesta) + parseInt(this.state.costoTotal);
        let comisionApuesta = parseFloat(current) * parseFloat(this.state.comisionRate) / 100;
        let comisionTotal = parseFloat(comisionApuesta) + parseFloat(this.state.comisionTotal);

        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            let currentTotal = this.state.totalCurrent + parseInt(current)
            return { totalCurrent: currentTotal };
        });

        //Actualizar lista
        this.setState(state => {
            const apuestaNueva = { numero: numero, current: parseInt(current) };
            const entryList = [apuestaNueva].concat(state.entryList);
            return {
                entryList,
                value: '',
            };
        });

        // Set ApuestaTotal
        this.setState((prevState, props) => {
            let total = parseFloat(costoTotal) - parseFloat(comisionTotal);
            return { total: total, isAgregar: true };
        });

        //Agregar apuesta a fetchedList entry
        this.setState(state => {
            const entry = state.entry.map((item, j) => {
                if (j === parseInt(numero)) {
                    let newCurrent = parseInt(item.current) + parseInt(current);
                    return { numero: numero, tope: newCurrent }
                } else {
                    return item;
                }
            });
            return {
                entry,
            };
        });

        setTimeout(() => {
            this.setState((state) => {
                return { isAgregar: false, isDirty: true };
            });
        }, 100);
        this.entryNumeroInputRef.current.focus();
    }
    removerApuesta = (index, numero, current) => {
        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            let currentTotal = this.state.totalCurrent - parseInt(current)
            return { totalCurrent: currentTotal };
        });

        // quitar apuesta de lista
        this.setState(state => {
            const entryList = state.entryList.filter((apuesta, i, arr) => i !== index);
            return {
                entryList,
            };
        });

    }

    limpiarApuestas = (event) => {
        this.setState(state => {
            return { entryList: [] };
        });

        //Actualiza total de unidades/costo/current en apuesta actual
        this.setState((prevState, props) => {
            return { totalCurrent: 0 };
        });

        //asignar valor de cero a todos los numeros
        this.setState(state => {
            const entry = state.entry.map((item, j) => {
                return { numero: item.numero, tope: 0 }
            });
            return {
                entry,
                isDirty: false
            };
        });
    }

    handleClickOpenRemoveAll = () => {
        this.setState({
            ...this.state,
            openRemoveAll: true
        })
    }

    handleCloseRemoveAll(value) {
        this.setState({
            ...this.state,
            openRemoveAll: false
        })
        if (value === true) {
            this.limpiarApuestas()
        }
    }

    handleClickOpenComprar = () => {
        if (this.state.entryList.length === 0) {
            return;
        }
        this.setState({
            ...this.state,
            openComprar: true
        })
    }

    handleCloseComprar(value) {
        this.setState({
            ...this.state,
            openRemoveAll: false,
            openComprar: false
        })
        if (value === true) {
            let id = this.match.params.apuestaId;
            const { dispatch } = this.props;
            dispatch(userActions.loading_start())
            playerService.update_number(this.state.entryList, id).then((result) => {
                if (result.status === 409) {
                    this.setState({
                        ...this.state,
                        openError409Info: true
                    })
                } else if (result.status === 500) {
                    this.setState({
                        ...this.state,
                        openError500Info: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        openComprarInfo: true,
                        isDirty: false
                    })
                }
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        }
    }

    handleClickOpenComprarInfo = () => {
        this.setState({
            ...this.state,
            openComprarInfo: true
        })
    }

    handleCloseComprarInfo() {
        this.setState({
            ...this.state,
            openRemoveAll: false,
            openComprar: false,
            openComprarInfo: false
        })
        this.props.history.push("/");
    }

    handleClose_500_error = () => {
        this.setState({
            ...this.state,
            openRemoveAll: false,
            openComprar: false,
            openComprarInfo: false,
            openError500Info: false
        })
    }

    handleClose_409_error = () => {
        this.setState({
            ...this.state,
            openRemoveAll: false,
            openComprar: false,
            openComprarInfo: false,
            openError500Info: false
        })
        this.props.history.push("/");
    }

    render() {
        const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const rightPos = (width > 444) ? (width - 444) / 2 + 2 : 2;
        const transPos = rightPos + 100;
        this.classes = this.props.classes;
        const trans = this.state.showAddBtn ? 'translate(0px)' : `translate(${transPos}px)`

        const ApuestaInput = withStyles({
            root: {
                height: "100%",
                height: "2.25rem",
                borderRadius: "100px",
                border: "#afb6b8 1px solid",
                paddingRight: "0.75rem",
                paddingLeft: "0.75rem",
                caretColor: "#3366ff",
                '&:hover': {
                    borderColor: '#3366cc',
                },
                '&$focused': {
                    borderColor: '#3366cc',
                },
            },

        })(TextField);

        const { isDirty } = this.state
        const { history } = this.props

        return (
            <div className="usuario_apuestas_id">
                <RouteLeavingGuard
                    when={isDirty}
                    navigate={path => history.push(path)}
                    shouldBlockNavigation={location => {
                        if (isDirty) {
                            return true
                        }
                        return false
                    }}
                />
                <ToastContainer autoClose={8000} />
                <TopBar
                    apuestaType={this.state.apuestaType}
                    hour={this.state.hour}
                    day={this.state.day}
                    total={this.state.total}
                />
                <Container style={{ background: 'white', marginTop: 52 }}>
                    <Grid container spacing={0}
                        display="flex"
                        justify="center"
                        alignItems="center"
                        ref={this.entryInputContainerRef}
                        style={{ padding: "20px 1.5rem 0 1.5rem" }}
                    >
                        <Grid item xs={6} style={{ textAlign: "end" }}>
                            <ApuestaInput
                                inputRef={this.entryNumeroInputRef}
                                type="tel"
                                placeholder="Numero:"
                                id="input-entry-numero"
                                pattern="[0-9]*"
                                style={{ marginRight: "0.375rem", maxWidth: "9.5rem", fontSize: '1.25rem' }}
                                InputProps={{
                                    disableUnderline: true,
                                    maxLength: 9,
                                    style: {
                                        fontSize: "1.25rem"
                                    }
                                }}
                                onInput={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = onlyNums;
                                    e.target.value = e.target.value.toString().slice(0, 2);
                                    if (e.target.value.length === 2) {
                                        this.entryUnidadesInputRef.current.focus();
                                    }

                                }}
                                className="numbers"
                                onFocus={this.handleNumeroInputFocus}
                                onBlur={this.handleNumeroInputBlur}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "start" }}>
                            <ApuestaInput
                                inputRef={this.entryUnidadesInputRef}
                                type="tel"
                                placeholder="Cantidad:"
                                pattern="[1-9]*"
                                style={{ marginLeft: "0.375rem", maxWidth: "9.5rem" }}
                                id="input-entry-unidad"
                                InputProps={{
                                    disableUnderline: true,
                                    style: {
                                        fontSize: "1.25rem"
                                    }
                                }}
                                onInput={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = onlyNums;
                                    if (onlyNums.length > 7) {
                                        e.target.value = e.target.value.toString().slice(0, 7);
                                    }
                                    if (this.entryNumeroInputRef.current.value.toString().length < 2) {
                                        this.entryNumeroInputRef.current.focus();
                                        this.entryUnidadesInputRef.current.value = "";
                                    }
                                }}
                                onKeyPress={this.inpuntKeyPressedEvent}
                                className="numbers"
                                onFocus={this.handleNumeroInputFocus}
                                onBlur={this.handleNumeroInputBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center" style={{ width: "100%", marginLeft: -29 }}>
                        <ListaApuestas entryList={this.state.entryList} removerApuesta={this.removerApuesta} fromApuestaActiva={false}
                            displayApuestaListIndex={this.state.displayApuestaListIndex} isAgregar={this.state.isAgregar} />
                        <Grid item xs={12}>
                            <Typography variant="body1" className="sum_text">
                                Total &mdash; {this.state.totalCurrent}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxwidth="xs" >
                    <Grid container spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} className={this.classes.buttonContainerApuestas}>
                            <Grid item xs={6}>
                                <Button variant="contained" className="buttonLimpiar" onClick={() => this.handleClickOpenRemoveAll()}>
                                    Limpiar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" className="buttonComprar" onClick={() => this.handleClickOpenComprar()}>
                                    Comprar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <div className="slideAddBtn" style={{ transform: trans, right: rightPos }}>
                    <Button variant="contained" className="buttonAgregarApuesta" onClick={this.agregarApuesta}>
                        <MdFileDownload className="extendedIcon" />
                    </Button>
                </div>
                <ConfirmDialog
                    open={this.state.openRemoveAll}
                    handleClose={this.handleCloseRemoveAll.bind(this)}
                    title="Limpiar pantalla?"
                    context="Toda la información digitada se perderá"
                    icon='help'>
                </ConfirmDialog>
                <ConfirmDialogR
                    open={this.state.openComprar}
                    handleClose={this.handleCloseComprar.bind(this)}
                    title="Finalizar compra."
                    context="Su compra sera procesada en este momento."
                    icon='check'>
                </ConfirmDialogR>
                <InformationDialog
                    open={this.state.openComprarInfo}
                    handleClose={this.handleCloseComprarInfo.bind(this)}
                    title="Compra exitosa."
                    context="Su compra fue exitosa, puede ver los detalles en la pantalla de compras activas."
                    contentFontSize={'18px'}
                    icon='info'>
                </InformationDialog>
                <ErrorInfoDialog
                    open={this.state.openError500Info}
                    handleClose={this.handleClose_500_error.bind(this)}
                    title={'Error del sistema.'}
                    context={'Su compra no fue procesada. hubo algún error del sistema trate de nuevo y si el problema persiste contacte a su agente.'}
                    icon={'ioIosWarning'}
                    iconSize={70}
                    iconColor={'#fdfa01'}
                    titleFontSize={'22px'}
                    contentFontSize={'17px'}
                    contentHeight={'109px'}>
                </ErrorInfoDialog>
                <ErrorInfoDialog
                    open={this.state.openError409Info}
                    handleClose={this.handleClose_409_error.bind(this)}
                    title={'Sorteo no disponible'}
                    context={'Su compra no fue procesada. Sorteo fuera de tiempo o bloqueado... verifique el estado del sorteo o contacte a su agente.'}
                    icon={'ioIosWarning'}
                    iconSize={70}
                    iconColor={'#ff3333'}
                    titleFontSize={'22px'}
                    contentFontSize={'17px'}
                    lineHeight={'23px'}
                    contentHeight={'109px'}>
                </ErrorInfoDialog>
                <div className='clearfix'></div>
            </div>
        )
    }
}

export default withStyles(useStyles)(connect()(AdicionarNumeroApuestaAsistente));