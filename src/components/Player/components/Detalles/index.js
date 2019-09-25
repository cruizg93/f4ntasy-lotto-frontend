import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles/index";
import SingleApuestaDetails from '../../components/Detalles/SingleApuestaDetails/index';
import { red, blue } from "@material-ui/core/colors/index";
import { Colors } from "../../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#e5e5e5',
        },
    },
    component: {
        textDecoration: 'none',
    },
    componentDisable: {
        textDecoration: 'none',
        pointerEvents: 'none'
    },
    text: {
        fontSize: 18,
        color: '#929292',
        marginTop: 20,
        marginBottom: 4,
    },
    close: {
        color: red[400]
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    },
    containerData: {
        // background: Colors.Main,
    },
    apuestaContainer: {
        borderRight: "#afb6b8 1px solid",
    }
}));


const ShowDetallesApuesta = ({ title, apuestas, total, ...props }) => {
    const classes = useStyles();
    const [titleData, setTitleData] = useState('');
    const [apuestasData, setApuestasData] = useState([]);
    const [totalData, setTotalData] = useState(0.0);
    const [moneda, setMoneda] = useState();
    const [sum, setSum] = useState(0);
    useEffect(() => {
        setTitleData(title);
        setApuestasData(Array.from(apuestas));
        setSum(apuestas.reduce((s, row) => s + row.valor, 0));
        setTotalData(total);
        if (props.moneda)
            setMoneda((props.moneda === "LEMPIRAS" || props.moneda === " L ") ? "L" : " $ ");
    }, [])

    return (
        <>
            <Grid container
                spacing={1}
                direction="row"
                justify="center"
                className={classes.containerData}
            >
                {/* {props.apuestaTitle &&
                    <Grid item xs={8} className="apuestaTitle">
                        <Typography variant="h5"   >
                            {props.apuestaTitle}{' - '}{}
                        </Typography>
                    </Grid>
                } */}
                <Grid item xs={12} container justify="center">
                    <Typography className={classes.text}>
                        {" "}{titleData}
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify="center">
                    {apuestasData.map((apuesta, index) =>
                        <SingleApuestaDetails key={index} {...apuesta} {...props} moneda={moneda} />
                    )}
                </Grid>
                <Grid item xs={12} style={{ marginTop: -15 }}>
                    <span style={{ fontSize: 20, color: '#929292', marginLeft: 100 }}>
                        {"total:"}
                    </span>
                    <span style={{ fontSize: 20, color: '#929292', marginLeft: 32 }}>
                        {sum}
                    </span>
                </Grid>
                <Grid item xs={12} style={{ marginTop: -10 }}>
                    <span style={{ fontSize: 20, color: '#929292', marginLeft: 94 }}>
                        {"costo:"}
                    </span>
                    <span style={{ fontSize: 20, color: '#4F83C8', marginLeft: 24 }}>
                        {moneda}{'\u00AD'}{'\u00AD'}{total.toFixed(2)}
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
        </>
    )

};

export default ShowDetallesApuesta;
