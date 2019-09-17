import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ApuestaActivaEntry from '../../../../../Player/components/ApuestaActiva/index';
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Clear from '@material-ui/icons/Clear';
import { adminService } from "../../../../../../service/api/admin/admin.service";
import { printDocument6 } from "../../../../../../_helpers/print";
import { Colors } from "../../../../../../utils/__colors";

import AdminTitle from '../../../../../Admin/components/AdminTitle';


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
        border: '1px #000 solid',
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
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
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
    }
}));


const ImprimirButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Red,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            border: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const DetallesButton = withStyles({
    root: {
        width: '100px',
        height: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: Colors.Btn_Blue,
        marginBottom: '1.5rem',
        marginRight: '.5rem',
        marginLeft: '.5rem',
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.Btn_Hover,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
const ApuestaActivaJugadorDetalles = ({ ...props }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [comision, setComision] = useState(0.0);
    const [riesgo, setRiesgo] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [list, setList] = useState([]);
    const [disable, setDisable] = useState(true);
    const [moneda, setMoneda] = useState("");
    const [type, setType] = useState("DIARIA");

    console.log("props_1", props)
    function handleOnPrint() {
        const input = document.getElementById("user-apuesta-activa-entries");
        printDocument6(input, title + '-detalles-apuestas-activas-user');
    }

    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            list[id]['valor'] = parseFloat(e.target.value);
        }
    }

    useEffect(() => {
        adminService.list_apuestas_activas_details_by_user_id(props.location.state.username,
            props.location.state.id).then((result) => {
                setTitle(result.data.title);
                setComision(result.data.comision);
                setRiesgo(result.data.riesgo);
                setTotal(result.data.total);
                setList(Array.from(result.data.list));
                setMoneda(props.location.state.moneda)
                setType(props.location.state.type)
            })
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="xs" style={{ padding: 0 }}>
                <ToastContainer autoClose={8000} />
                <AdminTitle titleLabel='Detalle Venta Individual' />
            </Container>
            <Container maxWidth="xs" className="container_individual">
                <Grid item xs={12} className="userInfo" >

                </Grid>
                <Grid container className="body">

                </Grid>
            </Container>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start">
                <Typography variant="h5" gutterBottom>
                    {type}{" - "}{title}
                </Typography>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container
                id="user-apuesta-activa-entries"
                className={classes.apuestasContainer}
            >
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    {list.map((apuesta, index) =>
                        <ApuestaActivaEntry key={index} {...apuesta} index={index} {...props}
                            disable={disable}
                            onEdit={updateFunction}
                        />
                    )}
                </Grid>
                <Grid container>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={''}>
                            {"Apuestas "}{moneda === "LEMPIRAS" ? " L " : " $ "}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                    >
                        <Typography variant="body1" gutterBottom
                            className={total < 0 ? classes.textBalanceNegativo :
                                (total !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                        >
                            {" "}{total.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={''}>
                            {"Comisiones "}{moneda === "LEMPIRAS" ? " L " : " $ "}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                        className={''}
                    >
                        <Typography variant="body1" gutterBottom
                            className={comision < 0 ? classes.textBalanceNegativo :
                                (comision !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                        >
                            {" "}{comision.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-end"
                    >
                        <Typography variant="body1" gutterBottom className={''}>
                            {"Riesgo "} {moneda === "LEMPIRAS" ? " L " : " $ "}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justify="flex-start"
                    >
                        <Typography variant="body1" gutterBottom
                            className={riesgo < 0 ? classes.textBalanceNegativo :
                                (riesgo !== 0 ? classes.textBalancePositivo : classes.textBalance)}
                        >
                            {" "}{riesgo.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.fixedElement}
            >
                <Typography variant="body1" gutterBottom className={classes.textApuestaDescription}>
                    {title}
                </Typography>


                <ImprimirButton variant="outlined" color="primary" onClick={handleOnPrint}>
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Imprimir
                    </Typography>
                </ImprimirButton>


                <DetallesButton variant="outlined" color="primary"
                    component={Link}
                    to={{
                        pathname: `/jugador/apuestas/detalles/${props.location.state.id}/desglose`,
                        state: {
                            title: title,
                            username: props.location.state.username,
                            id: props.location.state.id,
                            type: type
                        }
                    }}
                >
                    <Typography variant="body1" gutterBottom className={classes.root}>
                        Detalles
                    </Typography>
                    <Clear className={classes.rightIcon} />
                </DetallesButton>
            </Grid>
        </React.Fragment>
    )
};


export default ApuestaActivaJugadorDetalles;
