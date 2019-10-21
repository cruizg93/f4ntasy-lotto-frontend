import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles/index";
import SingleApuestaDetails from '../../components/Detalles/SingleApuestaDetails/index';
import { FormatNumberSymbol } from '../../../../utils/__currency';
import { red, blue } from "@material-ui/core/colors/index";

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
    },
    total: {
        maxWidth: '80%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        fontSize: 20,
        color: '#929292'
    },
    totalText: {
        flex: 1,
        textAlign: 'right'
    },
    totalVal: {
        flex: 1.6,
        paddingLeft: '1.2em'
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
            setMoneda((props.moneda === "LEMPIRA" || props.moneda === "L") ? "L" : "$");
    }, [])

    return (
        <Grid container
            direction="row"
            justify="center"
            className={classes.containerData}
        >
            <Grid item xs={12} container justify="center">
                <Typography className={classes.text}>
                    {" "}{titleData}
                </Typography>
            </Grid>
            <Grid item xs={12} container justify="center">
                {apuestasData.map((apuesta, index) =>
                    <SingleApuestaDetails key={index} {...apuesta} {...props} moneda={moneda}
                        userid={props.userid}
                    />
                )}
            </Grid>
            <Grid item xs={12} className={classes.total}>
                <span className={classes.totalText}>
                    {"total:"}
                </span>
                <span className={classes.totalVal}>
                    {sum}
                </span>
            </Grid>
            <Grid item xs={12} className={classes.total} style={{ paddingBottom: 10 }}>
                <span className={classes.totalText}>
                    {"costo:"}
                </span>
                <span className={classes.totalVal} style={{ color: '#4F83C8' }}>
                    {moneda}{'\u00A0'}{'\u00A0'}{FormatNumberSymbol(total)}
                </span>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    )

};

export default ShowDetallesApuesta;
