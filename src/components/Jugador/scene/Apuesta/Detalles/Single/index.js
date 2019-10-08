import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListaApuestas from '../../../../../Player/scenes/Apuesta/ListaApuestas';
import ResumenApuestas from '../../../../../Player/scenes/Apuesta/Resumen/ResumenApuestas';
import { Currency } from '../../../../../../utils/__currency'
import { makeStyles } from "@material-ui/core/styles/index";
import { adminService } from "../../../../../../service/api/admin/admin.service";
import { Colors } from "../../../../../../utils/__colors";

import AdminTitle from '../../../../../Admin/components/AdminTitle';
import DiariaLogo from '../../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../../View/assets/Chica_PNG.png';
import ConfirmDialog from '../../../../../View/Dialog/ConfirmDialog';
import ErrorInfoDialog from '../../../../../View/Dialog/ErrorInfoDialog';
import { userActions } from '../../../../../../store/actions';
import './styles.css'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  component: {
    textDecoration: 'none',
  },
  text: {
    fontWeight: 'bold',
    width: '60px',
    border: '1px #d2d2d2 solid',
    padding: '5px',
    textAlign: 'center'
  },
  negative: {
    padding: theme.spacing(1, 1),
  },
  numbers: {
    paddingLeft: '.5rem'
  },
  apuestasContainer: {
    marginBottom: '5rem'
  },
  fixedElement: {
    position: 'fixed',
    width: '100%',
    height: '67px',
    lineHeight: '67px',
    bottom: '6px',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderLeft: 'solid 1px #9A9A9A',
    borderRight: 'solid 1px #9A9A9A',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  textBalancePositivo: {
    color: Colors.Green,
    marginLeft: ".5rem"
  },
  textBalanceNegativo: {
    color: Colors.Btn_Red,
    marginLeft: ".5rem"
  },
  textBalance: {
    color: Colors.Black,
    marginLeft: ".5rem"
  },
  textApuestaDescription: {
    height: '76px',
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  buttonContainerApuestas: {
    backgroundColor: "#ffffff",
    maxWidth: 444,
    position: "fixed",
    zIndex: "25",
    bottom: 8,
    height: '63px',
    lineHeight: '63px',
    justifyContent: "center",
    textAlign: "center",
    borderTop: 'solid 1px #9A9A9A',
    borderLeft: 'solid 1px #9A9A9A',
    borderRight: 'solid 1px #9A9A9A',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  buttonDetalles: {
    borderRadius: "15px",
    textTransform: "none",
    height: "37px",
    width: '153px',
    color: "#000000",
    backgroundColor: '#f5d657',
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: '#f5d657',
    }
  },
  buttonLimpiar: {
    borderRadius: "15px",
    textTransform: "none",
    height: "37px",
    width: '153px',
    color: "#ffffff",
    backgroundColor: '#cc3333',
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: '#cc3333',
    }
  },
}));

const ApuestaActivaJugadorDetalles = ({ ...props }) => {
  const classes = useStyles();
  const [comision, setComision] = useState(0.0);
  const [riesgo, setRiesgo] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [list, setList] = useState([]);
  const [moneda, setMoneda] = useState("");
  const [type, setType] = useState("DIARIA");
  const [sumValor, setSumValor] = React.useState(0);
  const apuestaCurrency = (props.location.state.moneda === "LEMPIRA" || props.location.state.moneda === "L")
    ? Currency.Lempira
    : Currency.Dollar;

  const apuestaId = props.location.state.id;
  const jugadorId = props.location.state.userId;
  const [open, setOpen] = useState(false);
  const [openError500Info, setOpenError500Info] = useState(false);
  const [openError409Info, setOpenError409Info] = useState(false);

  useEffect(() => {
    submitUpdateData()
  }, []);

  function handleClose_409_error() {
    setOpenError409Info(false);
    this.props.history.push("/");
  }
  function handleClose_500_error() {
    setOpenError500Info(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(value) {
    setOpen(false);
    if (value === true) {
      deleteAllFunction()
    }
  }

  function submitUpdateData() {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    adminService.list_apuestas_activas_details_by_user_id(props.location.state.username, props.location.state.id).then((result) => {
      setComision(result.data.comision);
      setRiesgo(result.data.riesgo);
      setTotal(result.data.total);
      setList(Array.from(result.data.list));
      setSumValor(result.data.list.reduce((sum, row) => sum + row.valor, 0))
      setMoneda(props.location.state.moneda)
      setType(props.location.state.type)
      dispatch(userActions.loading_end())
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  function deleteOneFunction(numero) {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    adminService.delete_apuestas_activas_sorteoAndNumeroAndJugador(apuestaId, jugadorId, numero).then((result) => {
      if (result.status === 409) {
        setOpenError409Info(true);
      } else if (result.status === 500) {
        setOpenError500Info(true);
      }
      dispatch(userActions.loading_end())
      if (result.status === 200)
        submitUpdateData();
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  function deleteAllFunction() {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    adminService.delete_apuestas_activas_sorteoAndJugador(apuestaId, jugadorId).then((result) => {
      if (result.status === 409) {
        setOpenError409Info(true);
      } else if (result.status === 500) {
        setOpenError500Info(true);
      }
      dispatch(userActions.loading_end())
      if (result.status === 200)
        submitUpdateData();
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  return (
    <div className='admmin_detalle_ventas_individual'>
      <Container maxwidth="xs" style={{ padding: 0 }} className="container_detalle_individual_title">
        <ToastContainer autoClose={8000} />
        <AdminTitle titleLabel='Detalle Venta Individual' iconName='IoIosContact' />
        <Grid item xs={12}><Divider /></Grid>
        <div style={{ background: '#f4f4f4', width: '100%', zIndex: 50 }}>
          <Grid container item xs={12} className="userInfo" >
            <Grid item xs={4} className="icon">
              {
                type === 'DIARIA' ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />
              }
            </Grid>
            <Grid container item xs={8} direction="column" className="right_text">
              <Typography variant="h5" className="date_time">
                {props.location.state.hour}{" - "}{props.location.state.day}
              </Typography>
              <Typography variant="h5" className="user_name">
                {props.location.state.username}{" - "}{moneda}{' ['}{props.location.state.name}{']'}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Grid container spacing={0}
        direction="row"
        justify="center"
        alignItems="center" className="list_apuestas" >
        <ListaApuestas entryList={list} removerApuesta={(apuestaIndex) => {
          deleteOneFunction(list[apuestaIndex].numero);
        }}
          apuestaId={props.match.params.apuestaId}
          displayApuestaListIndex={false} fromApuestaActiva={true} />
        <Grid item xs={12} className="total" style={{ paddingBottom: 10 }}>
          <span className="text">
            Total:
                    </span>
          <span className="value">
            <NumberFormat value={sumValor} displayType={'text'} thousandSeparator={true} />
          </span>
        </Grid>
      </Grid>

      <ResumenApuestas apuestaCurrency={apuestaCurrency}
        costoTotal={total} comisionTotal={comision} total={riesgo}
        style={{ height: 85 }} />

      <Grid container spacing={0}
        direction="row"
        justify="center"
        alignItems="center" className={classes.buttonContainerApuestas} >
        <Grid item xs={6}>
          <Fab variant="extended" aria-label="removeAll" className={classes.buttonLimpiar} onClick={handleClickOpen}>
            Limpiar
                        </Fab>
        </Grid>
        <Grid item xs={6}>
          <Fab variant="extended" aria-label="buyAll" className={classes.buttonDetalles}
            component={Link}
            to={{
              pathname: `/jugador/apuestas/detalles/${props.location.state.id}/imprimir`,
              state: {
                id: props.location.state.id,
                type: props.location.state.type,
                moneda: props.location.state.moneda,
                userId: props.location.state.userId,
                name: props.location.state.name,
                username: props.location.state.username,
                hour: props.location.state.hour,
                day: props.location.state.day,
                total: sumValor,
                admin: true,
              }
            }}
          >
            Detalles X
                    </Fab>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={open}
        handleClose={handleClose}
        title="Limpiar pantalla?"
        context="Toda la información digitada se perderá"
        icon='help'>
      </ConfirmDialog>
      <ErrorInfoDialog
        open={openError500Info}
        handleClose={handleClose_500_error}
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
        open={openError409Info}
        handleClose={handleClose_409_error}
        title={'Sorteo cerrado'}
        context={'Una vez el sorteo cerro no se pueden eliminar o modificar las compras.'}
        icon={'ioIosWarning'}
        iconSize={70}
        iconColor={'#ff3333'}
        titleFontSize={'22px'}
        contentFontSize={'17px'}
        lineHeight={'23px'}
        contentHeight={'109px'}>
      </ErrorInfoDialog>
    </div>
  )
};


export default connect()(ApuestaActivaJugadorDetalles);
