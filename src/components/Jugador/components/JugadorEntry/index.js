import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Currency } from '../../../../utils/__currency';
import { FormatNumberSymbol } from '../../../../utils/__currency';

import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AsistenteDataShow from '../AsistenteEntry/index';
import { adminService } from "../../../../service/api/admin/admin.service";
import authenticationService from '../../../../service/api/authentication/authentication.service';
import { Colors } from '../../../../utils/__colors';
// import { FaUserTimes } from 'react-icons/fa';
// import { FaAddressCard } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { TiPen } from "react-icons/ti";
import { GoTrashcan } from "react-icons/go";
import { userActions } from '../../../../store/actions';
import { Add, Remove } from '@material-ui/icons'
import './jugadorEntry.css';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1),
    border: 'none',
    '&:hover': {
      background: "#E3E4E9",
      border: 'none',
    },
  },

  card: {
    display: 'flex',
    marginTop: '.5rem'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  valuesContainer: {
    textDecoration: "none",
    paddingTop: ".5rem",
    "& div p": {
      paddingBottom: ".5rem",
    }
  },
  text: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: '#4E84C8',
  },
  textPositive: {
    display: 'flex',
    color: Colors.Green
  },
  textNegative: {
    display: 'flex',
    color: Colors.Btn_Red
  },
  textLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: "right",
    marginRight: '.5rem',
    color: '#000000'
  },
  svgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconDelete: {
    margin: "auto",
    color: Colors.Btn_Red,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  iconEdit: {
    margin: "auto",
    color: Colors.Green,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  iconWarning: {
    margin: "auto",
    color: Colors.Orange,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  iconEditDialog: {
    marginLeft: "0",
    marginTop: "0",
    marginBottom: "0",
    marginRight: "0.5rem",
    color: Colors.Green,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  iconWarningDialog: {
    marginLeft: "0",
    marginTop: "0",
    marginBottom: "0",
    marginRight: "0.5rem",
    color: Colors.Orange,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  iconDeletegDialog: {
    marginLeft: "0",
    marginTop: "0",
    marginBottom: "0",
    marginRight: "0.5rem",
    color: Colors.Btn_Red,
    fontSize: "1.75rem",
    '&:hover': {
      cursor: "pointer"
    }
  },
  paper: {
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    background: Colors.Main,
    borderRadius: "0",
    border: "#afb6b8 1px solid",
  },
  paperDisable: {
    pointerEvents: 'none',
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paperUser: {
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 10px 5px 10px',
    margin: '3rem',
  },
  paperUserDisable: {
    pointerEvents: 'none',
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 10px 5px 10px',
    margin: '3rem',
  },
  paperBalance: {
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 10px 5px 10px',

  },
  paperBalanceDisable: {
    pointerEvents: 'none',
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 10px 5px 10px',
  },
  expansionPanel: {
    boxShadow: 'none',
    background: Colors.Main,
  },
  expansionPanelBody: {
    display: 'block',
    padding: "0 !important"
  },
  labelUser: {
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRight: "#afb6b8 1px solid",
    color: Colors.Btn_Blue,
  },
  labelUserDisable: {
    pointerEvents: 'none',
    textDecoration: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRight: "#afb6b8 1px solid",
    color: Colors.Btn_Blue,
  },
  editarLink: {
    textDecoration: "none",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRight: "#afb6b8 1px solid",
    color: Colors.Btn_Blue,
    '&:hover': {
      cursor: "pointer"
    }
  },
  balanceLink: {
    textDecoration: "none",
    pointerEvents: 'none',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '.5rem',
    marginLeft: '.5rem',
    marginRigth: '.5rem',
    color: Colors.Btn_Blue,
    textAlign: "center",
    display: "flex",
    '&:hover': {
      cursor: "pointer"
    }
  },
  jugadorInfoValor: {
    fontWeight: "bold"
  }

}));

const StyleExpansionPanelSummary = withStyles(() => ({
  root: {
    minHeight: "38px !important"
  },
  expanded: {
    margin: "0px !important",
    '& div': {
      margin: "0px !important",
      padding: "0px !important",
    }
  }
}))(ExpansionPanelSummary);

const JugadorDataShow = ({ match, balance, comision, id, monedaType, riesgo, total, username, name, asistentes, ...props }) => {
  const classes = useStyles();
  const [monedaSymbol, setMonedaSymbol] = useState('$');

  const [open, setOpen] = React.useState(false);
  const [openNoEliminar, setOpenNoEliminar] = React.useState(false);
  const [openinfo, setOpenInfo] = React.useState(false);
  const [openNoEditar, setOpenNoEditar] = React.useState(false);


  const [expanded, setExpanded] = React.useState(false);
  const [asignedAsistentes, setAsignedAsistentes] = React.useState([]);

  //JugadorEnable decide si el jugador puede ser eliminado o editado

  const jugadorEnable = true;//balance === 0 && total === 0;
  const symbol = balance < 0 ? " - " : (balance > 0 ? " + " : "")
  const apuestaCurrency = monedaType.toLowerCase() === "lempira" ? Currency.Lempira : Currency.Dollar;

  const handler = props.handler;
  const toast = props.toast;
  const isSupervisor = props.isSupervisor;

  /* USER INFO FOR jugador data popup*/
  const [userInfoloading, setUserInfoloading] = React.useState(false);
  const [diariaTipo, setDiariaTipo] = React.useState('dm');
  const [diariaTipoText, setDiariaTipoText] = React.useState('');
  const [diariaCostoComisionTexto, setDiariaCostoComisionTexto] = React.useState('');
  const [diariaCostoComisionValor, setDiariaCostoComisionValor] = React.useState(0);
  const [diariaPremioTexto, setDiariaPremioTexto] = React.useState('');
  const [diariaPremioValor, setDiariaPremioValor] = React.useState(0);

  const [chicaTipo, setChicaTipo] = React.useState('cm');
  const [chicaTipoText, setChicaTipoText] = React.useState('');
  const [chicaCostoTexto, setChicaCostoTexto] = React.useState('');
  const [chicaCostoValor, setChicaCostoValor] = React.useState(0);
  const [chicaComisionPercentageTexto, setChicaComisionPercentageTexto] = React.useState(0);
  const [chicaComisionPercentageValor, setChicaComisionPercentageValor] = React.useState(0);
  const [chicaPremioTexto, setChicaPremioTexto] = React.useState(0);
  const [chicaPremioValor, setChicaPremioValor] = React.useState(0);


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickInfoOpen(jugadorId) {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    adminService.get_player_by_id(jugadorId).then((result) => {
      if (result.status === 401) {
        authenticationService.logout()
      } else {
        /* DIARIA */
        setUserInfoloading(true);

        if (result.data.diariaType == "dm"){
          setDiariaTipo("dm");
          setDiariaTipoText("X Miles");
          setDiariaCostoComisionTexto("Costo x mil");
          setDiariaCostoComisionValor(result.data.costoMil);
          setDiariaPremioTexto("Premio");
          setDiariaPremioValor(result.data.premioMil);
        }else if (result.data.diariaType == "dd"){
          setDiariaTipo("dd");
          setDiariaTipoText("Directo L/$");
          setDiariaCostoComisionTexto("Comision %");
          setDiariaCostoComisionValor(result.data.comisionDirecto);
          setDiariaPremioTexto("Premio");
          setDiariaPremioValor(result.data.premioDirecto);
        }
        /* DIARIA FIN*/
        /*CHICA */
        if (result.data.chicaType == "cp"){
          setChicaTipo('cp')
          setChicaTipoText('X Pedazos')
          setChicaComisionPercentageTexto("Comision %");
          setChicaComisionPercentageValor(result.data.comisionChicaPedazos);
          setChicaCostoTexto("Pedazos");
          setChicaCostoValor(result.data.costoChicaPedazos.toFixed(2));
          setChicaPremioTexto("Premio")
          setChicaPremioValor(result.data.premioChicaPedazos)
        }else if (result.data.chicaType == "cd"){
          setChicaTipo("cd");
          setChicaTipoText("Directo L/$");
          setChicaComisionPercentageTexto("Comision %");
          setChicaComisionPercentageValor(result.data.comisionChicaDirecto);
          setChicaPremioTexto("Premio");
          setChicaPremioValor(result.data.premioChicaDirecto);
        }else if (result.data.chicaType == "cm"){
          setChicaTipo("cm");
          setChicaTipoText("X Miles");
          setChicaCostoTexto("Costo x mil");
          setChicaCostoValor(result.data.costoChicaMiles);
          setChicaPremioTexto("Premio");
          setChicaPremioValor(result.data.premioChicaMiles);
        }
        setOpenInfo(true);
        /*CHICA FIN*/
        setUserInfoloading(false);
      }
      dispatch(userActions.loading_end())
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  function handleClickOpenNoEliminar() {
    setOpenNoEliminar(true);
  }

  function handleClickOpenNoEditar() {
    setOpenNoEditar(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleInfoClose() {
    setOpenInfo(false);
  }

  function handleCloseNoEliminar() {
    setOpenNoEliminar(false);
  }

  function handleCloseNoEditar() {
    setOpenNoEditar(false);
  }

  function deletePlayer() {
    adminService.delete_player_by_id(id).then((result) => {
      if (result.status === 401) {
        authenticationService.logout()
      } else {
        if (result.data === "Apuestas") {
          toast("fail");
        } else {
          handler();
        }
      }
    })
  }

  const handleChangeExpand = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  useEffect(() => {
    setMonedaSymbol(apuestaCurrency.symbol);
    if (asistentes)
      setAsignedAsistentes(Array.from(asistentes))
  }, [asistentes, monedaType])
  return (
    <Grid container direction="row" className="container_entry">
      <Grid container style={{ lineHeight: '39px' }}>
        <Grid className="labelUser">
          <Typography className="form_center-label">
            {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name.length > 15 ? name.substring(0, 9) : name}{"]"}
          </Typography>
        </Grid>
        <Grid className="grid_lolosStar">
          <IoIosStar style={{ color: "#AEAEAE" }} onClick={() => { handleClickInfoOpen(id) }} />
        </Grid>
        {!isSupervisor 
        && <Grid className="grid_tiPen"
          component={jugadorEnable ? Link : "div"} to={
            {
              pathname: `/jugador/editar/${id}`,
              state: {
                id: id,
              }
            }
          }
        >
          <TiPen style={{ color: "#AEAEAE" }} onClick={handleClickOpenNoEditar} />
        </Grid>
        }
        {!isSupervisor 
        &&
        <Grid className="grid_goTranhcan" >
          <GoTrashcan style={{ color: "#AEAEAE" }} onClick={jugadorEnable ? handleClickOpen : handleClickOpenNoEliminar} />
        </Grid>
        }
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container className="totalContainer" >
        <Grid item container alignItems="flex-start" className="valuesContainer"
          component={(total !== 0 || comision !== 0) ? Link : "div"} to={
            // component={(total !== 0 || comision !== 0) ? "div" : Link} to={
            {
              pathname: `/jugador/apuestas/detalles`,
              state: {
                userid: id,
                username: username
              }
            }
          }
        >
          <Grid container className="text_container" >
            <Grid item xs={5} className="text_label">
              <div>Ventas:</div>
              <div>Comisión:</div>
              <div>Total:</div>
            </Grid>
            <Grid item xs={1} className="text_symbol">
              <span>{monedaSymbol}<br /></span>
              <span>{monedaSymbol}<br /></span>
              <span>{monedaSymbol}<br /></span>
            </Grid>
            <Grid item xs={6} className="text_value">
              <div className="left">
                <span>{FormatNumberSymbol(total)}<br /></span>
                <span>{FormatNumberSymbol(comision)}<br /></span>
                <span>{FormatNumberSymbol(riesgo)}</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="balanceLink"
          component={(balance === 0) ? "div" : Link} to={
            {
              pathname: `/historial/semana/anterior`,
              state: {
                id: id,
                username: username
              },
            }
          }
        >
          <Grid>
            <span style={{ color: "#999999", padding: 11 }}>
              Balance
                        </span>
          </Grid>
          <Grid style={{ whiteSpace: 'nowrap' }}>
            <span className={balance < 0 ? classes.textNegative : (balance > 0 ? classes.textPositive : classes.text)}
              style={{ padding: 3 }}>
              {symbol}{monedaSymbol}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(Math.abs(balance))}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        {/* NO SE PUEDE EDITAR DIALOG END*/}

        {/* NO SE PUEDE EDITAR DIALOG END*/}
        {/* DELETE DIALOG START*/}
        <Grid item xs={12}>
          <Dialog
            disableBackdropClick
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-eliminar-usuario"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className="dialog_delete_seller">
              <Grid item xs={12} className="title">
                <div className="icon">
                  <GoTrashcan size={26} />
                </div>
                <div className="text">
                  {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}
                </div>
              </Grid>
              <Grid item xs={12} className="textH">
                Eliminar Vendedor
              </Grid>
              <Grid item xs={12} className="textL">
                Esta seguro que quiere eliminar este vendedor?
              </Grid>
            </DialogContent>
            <DialogActions className="dialog_delete_seller_action">
              <Button onClick={handleClose} className="cancle">
                CANCELAR
              </Button>
              <Button className="accept" onClick={() => {
                handleClose();
                deletePlayer();

              }} color="primary">
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* DELETE DIALOG END*/}
        {/* NO SE PUEDE ELIMINAR DIALOG START*/}
        <Grid item xs={12}>
          <Dialog
            disableBackdropClick
            open={openNoEliminar}
            onClose={handleCloseNoEliminar}
            aria-labelledby="alert-dialog-no-eliminar-usuario"
            aria-describedby="alert-dialog-no-eliminar-description"
          >
            <DialogContent className="dialog_imposible_eliminar">
              <Grid item xs={12} className="title">
                <div className="icon">
                  <GoTrashcan size={26} />
                </div>
                <div className="text">
                  {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}
                </div>
              </Grid>
              <Grid item xs={12} className="textH">
                Imposible Eliminar.
              </Grid>
              <Grid item xs={12} className="textL">
                Este usuario no se puede eliminar en este momento ya que tiene compras activas y/o balance.
              </Grid>
            </DialogContent>
            <DialogActions className="dialog_imposible_eliminar_action">
              <Button onClick={handleCloseNoEliminar} className='ok'>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* NO SE PUEDE ELIMINAR DIALOG END*/}
        {/* JUGADOR INFO DIALOG START*/}
        <Grid item>
          <Dialog
            disableBackdropClick
            open={openinfo}
            fullWidth={false}
            maxWidth={'xs'}
            onClose={handleInfoClose}
            aria-labelledby="alert-dialog-info-usuario"
            aria-describedby="alert-dialog-info-description"
          >
            <DialogContent className="dialog_info_description">
              <Grid item xs={12} className="title">
                <div className="icon">
                  <IoIosStar size={26} />
                </div>
                <div className="text">
                  {username}{"-"}{apuestaCurrency.symbol}{'\u00A0'}{"["}{name}{"]"}
                </div>
              </Grid>
              <Grid container className='content'>
                <Grid item xs={12} className='diaria_title'>
                  Diaria{" - "}{diariaTipoText}
                </Grid>
                <Grid item xs={12} className='diaria_content'>
                  <div className='left'>
                    <div>{" - "} {diariaCostoComisionTexto}</div>
                    <div>{" - "} {diariaPremioTexto}</div>
                  </div>
                  <div className='right'>
                    <div>{"="}{'\u00A0'}{'\u00A0'}{diariaCostoComisionValor}</div>
                    <div>{"="}{'\u00A0'}{'\u00A0'}{diariaPremioValor}</div>
                  </div>
                </Grid>

                <Grid item xs={12} className='diaria_title'>
                  Chica{" - "}{chicaTipoText}
                </Grid>
                <Grid container item xs={12} className='diaria_content'>
                  <div className='left'>
                    <div style={chicaCostoValor > 0 ? { display: "flex" } : { display: "none" }}>
                      {" - "} {chicaCostoTexto}
                    </div>
                    <div style={chicaTipo != 'cm' ? { display: "flex" } : { display: "none" }}>
                      {" - "} {chicaComisionPercentageTexto}
                    </div>
                    <div> {" - "}{chicaPremioTexto}</div>
                  </div>
                  <div className='right'>
                    <div style={chicaCostoValor > 0 ? { display: "flex" } : { display: "none" }}>
                      {"="}{'\u00A0'}{'\u00A0'}{chicaCostoValor}
                    </div>
                    <div style={chicaTipo != 'cm' ? { display: "flex" } : { display: "none" }}>
                      {"="}{'\u00A0'}{'\u00A0'}{chicaComisionPercentageValor}
                    </div>
                    <div>{"="}{'\u00A0'}{'\u00A0'}{chicaPremioValor}</div>
                  </div>
                </Grid>
              </Grid>
              <DialogActions>
                <Divider />
                <Button onClick={handleInfoClose} color="primary" style={{ color: Colors.Btn_Blue_Dark }}>OK</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {/* JUGADOR INFO DIALOG END*/}
        </Grid>
      </Grid>
      {
        asistentes &&
        <>
          <Grid item ><Divider /></Grid>
          <Grid item style={{ flex: 1 }} >
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}
              TransitionProps={{ unmountOnExit: true }} className={classes.expansionPanel}>
              <StyleExpansionPanelSummary style={{ height: 20 }}
                expandIcon={expanded ? <Remove className="expansion_icon" /> : <Add className="expansion_icon" />}
                aria-controls="panel1bh-content"
              >
                <Typography variant="body1" className="expansionPanelTextHeader" >
                  {asignedAsistentes.length}{" Vendedores X"}
                </Typography>
              </StyleExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionPanelBody}>
                {asignedAsistentes.map((asistente, index) =>
                  <AsistenteDataShow key={index} {...asistente} {...props} />
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </>
      }
      {expanded && <div style={{ width: '100%', height: 2 }} />}
    </Grid>
  )
}

export default connect()(JugadorDataShow);