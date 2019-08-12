import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import {Colors} from "../../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    paper: {        
        textDecoration: 'none',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        background: Colors.Main,
        borderRadius: "0",
        '&:hover': {
            backgroundColor: Colors.Gray_Ligth,
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
        fontWeight: 'bold'
    },
    textLabel: {
        display: 'flex',
        margin: '.5rem'
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
    typeContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '1rem',
        borderRight:"#afb6b8 1px solid",
    },
    titleContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '1rem',        
    },
    textValueLabel: {
        display: 'flex',
        marginLeft: '.5rem',
        fontWeight: 'bold',
    },
    sorteoTextContainer:{      
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        paddingRight: ".5rem",
        fontWeight: 'bold'
    },
    textSorteoAbierto:{
        color: Colors.Green,        
    },

}));

const ApuestaData = ({match: {url}, id, nombre, total, comision, riesgo, estado, moneda, ...props}) => {
    const classes = useStyles();
    const [pathnameUrl, setPathnameURL]=React.useState(`${url}/${id}`)
    const [monedaType, setMonedaType]=React.useState(moneda === "LEMPIRAS" ? " L " : " $ ")
    React.useLayoutEffect(()=>{       
        if(props.main){
            setPathnameURL(`${url}usuario/apuestas/${id}`)
        }
        console.log(url)
        /* setMonedaType(moneda === "LEMPIRAS" ? " L " : " $ ");  */             
    },[])
    return (
        <React.Fragment>
            <Grid item xs={12} component={Link}
                    to={
                        {
                            pathname: pathnameUrl,
                            state: {
                                title: {nombre},
                                moneda: monedaType,
                            }
                        }
                    }
                    className={estado === 'ABIERTA' ? classes.component : classes.componentDisable}>
                    
                    
                    <Paper key={props.index} className={classes.paper}>
                        <Grid container>
                            <Grid item xs={2} className={classes.typeContainer}>
                                <Typography variant="body1" gutterBottom className={classes.textLabel}>
                                    {props.type} 
                                </Typography>
                            </Grid> 
                            <Grid item xs={6} className={classes.titleContainer}>
                                <Typography variant="body1" gutterBottom className={classes.textLabel}>
                                    {nombre} 
                                </Typography>
                            </Grid>                      
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid> 
                        <Grid container>
                            <Grid item xs={6}
                            container
                            justify="flex-end"
                            >
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    Apuestas | 
                                </Typography>
                            </Grid>
                            <Grid item xs={6}
                            container
                            justify="flex-start"
                            className={classes.text}
                            >
                                <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                                    {monedaType}{" "}{total.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}
                                container
                                justify="flex-end"
                            >
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    Comisiones | 
                                </Typography>
                            </Grid>
                            <Grid item xs={6}
                                container
                                justify="flex-start"
                                className={classes.text}
                            >
                                <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                                    {monedaType}{" "}{comision.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}
                                container
                                justify="flex-end"
                            >
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    Riesgo | 
                                </Typography>
                            </Grid>
                            <Grid item xs={6}
                                container
                                justify="flex-start"
                                className={classes.text}
                            >
                                <Typography variant="body1" gutterBottom className={classes.textValueLabel}>
                                    {monedaType}{" "}{riesgo.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}
                                container
                                justify="center"
                                className={classes.text}
                            >
                                <Typography variant="h5" gutterBottom
                                    className={`${estado === 'ABIERTA' ? classes.textSorteoAbierto : classes.close} ${classes.sorteoTextContainer}`}>
                                    {estado === 'ABIERTA' ? "Sorteo Abierto" : "Sorteo Cerrado"}
                                </Typography>
                            </Grid>
                        </Grid>                     
                    </Paper>
            </Grid>


        </React.Fragment>
       

    )
};

export default ApuestaData;