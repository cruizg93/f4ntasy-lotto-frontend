import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import { adminService } from "../../../../../service/api/admin/admin.service";
import { playerService } from "../../../../../service/api/player/player.service";
import authenticationService from '../../../../../service/api/authentication/authentication.service';
import ShowDetallesApuesta from '../../../components/Detalles/index';
import { LocalPrintshop } from "@material-ui/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Fab from '@material-ui/core/Fab';
import InformationDialog from '../../../../View/Dialog/InformationDialog';
import DetailTitle from '../../../../Admin/components/DetailTitle'
import TopBar from '../../../../View/jugador/TopBarDetails';
import { userActions } from '../../../../../store/actions';
import PrintPdfDetailUserP from './PrintPdfDetailUserP'

import DiariaLogo from '../../../../View/assets/Diaria_PNG.png';
import ChicaLogo from '../../../../View/assets/Chica_PNG.png';

import './styles.css'

const DetallesApuesta = ({ ...props }) => {
    const [list, setList] = useState([]);
    const [apuestaType, setApuestaType] = useState("Diaria");
    const [moneda, setMoneda] = useState(" $ ");
    const [errorOpen, setErrorOpen] = useState(false);
    const [show, setShow] = React.useState(false);

    const image = props.location.state.type === 'DIARIA' ? DiariaLogo : ChicaLogo
    const hour = props.location.state.hour ? props.location.state.hour : '12 pm'
    const username = props.location.state.username ? props.location.state.username : JSON.parse(localStorage.getItem('currentUser'))['username']
    const fileName = username + '_' + props.location.state.day + '_' + hour + '.pdf'

    useEffect(() => {
        update()
        setApuestaType(props.location.state.type);
        setMoneda(props.location.state.moneda);
        window.scrollTo(0, 0)
    }, []);

    function handleOnPrint() {
        setErrorOpen(true)
    }
    function handleClose() {
        setErrorOpen(false)
    }

    const update = () => {
        if (props.location.state.admin && props.location.state.admin === true) {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            adminService.details_apuesta_activa_by_apuesta_id(props.location.state.username, props.location.state.id).then((result) => {
                if (result.status === 401) {
                    authenticationService.logout()
                } else {
                    setList([]);
                    setList(Array.from(result.data));
                    setShow(true)
                }
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });

        } else {
            const { dispatch } = props;
            dispatch(userActions.loading_start())
            playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
                if (result.status === 401) {
                    authenticationService.logout()
                } else {
                    setList([]);
                    setList(Array.from(result.data));
                    setShow(true)
                }
                dispatch(userActions.loading_end())
            })
                .catch(function (error) {
                    dispatch(userActions.loading_end())
                });
        }
    }
    return (
        <div className="ventas_activas_detalles" >
            <DetailTitle titleLabel="Detalle" />
            <TopBar
                apuestaType={apuestaType}
                hour={props.location.state.hour}
                day={props.location.state.day}
                top={152}
            />
            <Grid container
                direction="row"
                justify="center"
            >
                <Grid item xs={12} id="apuesta-activa-numeros-detalles">
                    {list.map((apuestaDetail, index) =>
                        <ShowDetallesApuesta key={index} {...apuestaDetail} index={index} moneda={moneda}
                            // update={update} userid={userid === '' ? apuestaDetail.userId : userid}
                            update={update} userid={apuestaDetail.userId}
                            {...props}
                        />
                    )}
                </Grid>
                <div className="fixedFooter">
                    {show && (
                        <PDFDownloadLink
                            document={
                                <PrintPdfDetailUserP
                                    image={image}
                                    hour={hour}
                                    day={props.location.state.day}
                                    moneda={moneda}
                                    list={list}
                                />
                            }
                            fileName={fileName}
                            style={{
                                textDecoration: "none",
                                padding: "3px 25px 6px 25px",
                                color: "#ffffff",
                                backgroundColor: "#663399",
                                border: "1px solid #4a4a4a",
                                borderRadius: '15px'
                            }}
                        >
                            {({ blob, url, loading, error }) => //'New'
                                <>
                                    <LocalPrintshop className="iconP" />
                                    <span className="textP">Imprimir</span>
                                </>
                            }
                        </PDFDownloadLink>
                    )}
                    {/* <Fab className="localPrintshop" onClick={handleOnPrint} >
                        <LocalPrintshop className="iconP" />
                        <span className="textP">Imprimir</span>
                    </Fab> */}
                </div>
            </Grid>
            <InformationDialog
                open={errorOpen}
                handleClose={handleClose}
                title={'Opcion no disponible'}
                context={'La opcion de imprimir no esta disponible en este momento, se esta trabajando en su implementacion'}
                icon={'ioIosWarning'}
                iconSize={67}
                titleFontSize={'22px'}
                contentFontSize={'16px'}
                contentHeight={'80px'}>
            </InformationDialog>
        </div>
    )

};

export default connect(null, null)(DetallesApuesta);