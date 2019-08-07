import React, {useState, useEffect} from 'react';
import {adminService} from "../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ApuestasActivasAdminData from '../../components/ApuestasActiva/index'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Colors}  from "../../../../utils/__colors";
import Button from "@material-ui/core/Button/index";


const Dolar = withStyles({
    root: {
        width: '100px',
        height: '70px',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Green,
        border: 'none',
        '&:hover': {
            backgroundColor: Colors.Btn_Hover,
            border: 'none',
        },
        '&:active': {
            boxShadow: 'none',           
            border: 'none',
            backgroundColor: Colors.Btn_Hover,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const Lempira = withStyles({
    root: {
        width: '100px',
        height: '70px',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Lempira,
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

const useStyles = makeStyles(theme => ({   
    headerContainer: {
        background : Colors.Main,
        marginBottom: "1rem"
    },
    label:{
        borderBottom: `${Colors.Btn_Red} 2px solid`,
        paddingBottom: "1rem !important",
        marginTop: ".5rem",
    },    
}));

const ApuestasActivasAdmin = (props) => {
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    const [moneda, setMoneda] = useState("dolar");
    const classes=useStyles();
    useEffect(() => {
        adminService.get_apuestas_activas("dolar").then((result) => {
            console.log(result.data)
            setApuestasActivasList(Array.from(result.data));
        })
    }, [])

    const changeMonedaType = () =>{
        if(moneda === 'dolar')
            setMoneda("lempira")
        else
            setMoneda("dolar")
        updateApuestasActivas();    
    }

    const updateApuestasActivas = () => {
        adminService.get_apuestas_activas(moneda).then((result) => {
            setApuestasActivasList([]);
            setApuestasActivasList(Array.from(result.data));
        })
    }
    return (
        <React.Fragment>
             <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.headerContainer}
                    >
                    <Grid item xs={6}  className={classes.label}>
                        <Typography variant="h6" gutterBottom className={"form__center-label"}>
                            {"Apuestas Activas"}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Dolar variant="outlined" color="primary" onClick={changeMonedaType}>
                            <Typography variant="body1" gutterBottom className={classes.root}>
                                P
                            </Typography>
                        </Dolar>
                         <Lempira variant="outlined" color="primary" onClick={changeMonedaType}>
                             <Typography variant="body1" gutterBottom >
                                 L
                             </Typography>                    
                        </Lempira>
                    </Grid>
                </Grid> 
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                {apuestasActivas.map((apuesta, index)=>
                    <ApuestasActivasAdminData key={index} {...apuesta} index={index} {...props} moneda={moneda}/>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default ApuestasActivasAdmin;