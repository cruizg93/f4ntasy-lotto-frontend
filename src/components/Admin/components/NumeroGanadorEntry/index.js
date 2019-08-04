import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import NumberFormat from 'react-number-format';
import {withStyles} from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import {adminService} from "../../../../service/api/admin/admin.service";
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
            backgroundColor: '#e5e5e5',
        },
    },
    btnHeight: {
        height: '40px',
        width: '150px',
        marginRight: '1rem',
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
    textRed: {
        fontWeight: 'bold',
        color: red[400]
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
    textLabel: {
        display: 'flex',
        margin: '.5rem'
    },
    textSorteoAbierto:{
        color: Colors.Green
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
    sorteoStatusContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',        
        margin: '1rem',        
        borderRight:"#afb6b8 1px solid",
    },
    editarLabel:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '1rem',
        color: Colors.Btn_Blue,
        '&:hover':{
            cursor: "pointer"
        }
    },
    fijarLabel:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '1rem',
        color: Colors.Btn_Red,
        '&:hover':{
            cursor: "pointer"
        }
    }


}));


const TotalButton = withStyles({
    root: {
        width: '150px',
        height: '40px',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        lineHeight: 1.5,
        backgroundColor: '#29992a',
        color: '#FFF',
        marginLeft: '1rem',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const NumeroGanadorEntry = ({match: {url}, sorteId, title, numero, status, type, ...props}) => {
    const classes = useStyles();
    const [idApuesta, setId] = useState(0);
    const [titleApuesta, setTitleApuesta] = useState('');
    const [numeroApuesta, setNumeroApuesta] = useState(-1);
    const [statusApuesta, setStatus] = useState("abierta");
    const [apuestaType, setApuestaType]=useState("Diaria");
    const [cambiar, setCambiar] = useState(false);
    const handler = props.handler;

    useEffect(() => {        
        setId(sorteId);
        setTitleApuesta(title);
        setNumeroApuesta(numero);
        setStatus(status);        
        setApuestaType(type === "DIARIA" ? "Diaria" : "Chica")
        console.log(status)
        if( status === 'bloqueada')
            setCambiar(true)
    }, [sorteId, title, numero, status, type])

    function onNumberChange(e) {       
        setNumeroApuesta(e.target.value);
    }

    function clickButton() {
        if (numeroApuesta !== '' && numeroApuesta !== -1 && numeroApuesta >= 0 && numeroApuesta < 100) {           
            adminService.fix_numero_ganador(numeroApuesta, idApuesta).then((result) => {
                handler();
            })
        }
    }

    const cambiarHandle = () =>{       
        setCambiar(!cambiar);
    }

    return (
        <Grid item xs={12}>
            <Paper key={props.index} className={classes.paper}>
                <Grid container>
                    <Grid item xs={2} className={classes.typeContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {apuestaType} 
                        </Typography>
                    </Grid> 
                    <Grid item xs={8} className={classes.titleContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {titleApuesta} 
                        </Typography>
                    </Grid>    
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    {status === 'abierta' ? 
                        <Grid item xs={12} className={`${classes.titleContainer} form__center-label`}>
                            <Typography variant="h6" gutterBottom className={classes.textSorteoAbierto}>
                                {"Sorteo Abierto"} 
                            </Typography>
                        </Grid>
                        : null
                    }
                    {status !== 'abierta' ?
                        <>
                        <Grid item xs={8}                             
                            className={classes.sorteoStatusContainer}
                        >
                            <Grid item 
                                container
                                justify="center"
                                xs={12}>
                                <Typography variant="body1" gutterBottom className={classes.textRed}>
                                        Sorteo Cerrado
                                </Typography>
                            </Grid>
                            <Grid item 
                                container
                                justify="center"
                                xs={12}>
                                { !cambiar  ?
                                    <NumberFormat
                                    id={`admin-numero-ganador-insert`}
                                    placeholder="Número"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.btnHeight}
                                    onChange={onNumberChange}
                                    />
                                :
                                    <Typography variant="body1" gutterBottom className={classes.text}>
                                       Número ganador {numeroApuesta}
                                    </Typography>
                                }
                            </Grid>                            
                        </Grid>
                        <Grid item xs={2} className={classes.titleContainer}>
                            { !cambiar ?
                                <Typography variant="body1" gutterBottom 
                                    className={ classes.editarLabel }
                                    onClick={clickButton}
                                >
                                {"Fijar"} 
                                </Typography>
                            :
                            <Typography variant="body1" gutterBottom 
                                className={ classes.fijarLabel }
                                onClick={cambiarHandle}
                            >
                                { "Cambiar" }
                            </Typography>
                            }
                        </Grid>  
                        </>
                    :null
                    }
                                     
                </Grid>               
            </Paper>
        </Grid>

    )
};

export default NumeroGanadorEntry;