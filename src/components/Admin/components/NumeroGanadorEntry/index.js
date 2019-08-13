import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {red, blue} from "@material-ui/core/colors/index";
import NumberFormat from 'react-number-format';
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
        marginBottom: '1rem',
        fontSize: "14pt",
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
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue
    },
    titleContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainerShort:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRight:"#afb6b8 1px solid",
        color: Colors.Btn_Blue
    },
    hourContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        color: Colors.Btn_Blue
    },
    fijarContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center', 
        marginLeft: '.8rem'       
    },
    sorteoStatusContainer:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRight:"#afb6b8 1px solid",
    },
    editarLabel:{
        textDecoration: "none",             
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px 10px 5px 10px',
        margin: '1rem',
        color: Colors.Green,
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

const NumeroGanadorEntry = ({match: {url}, sorteId, title, numero, status, type, ...props}) => {
    const classes = useStyles();
    const [idApuesta, setId] = useState(0);
    const [titleApuesta, setTitleApuesta] = useState(title.split('-')[0]);
    const apuestaHour = useState(title.split('-')[1]); 
    
    const [numeroApuesta, setNumeroApuesta] = useState(-1);
    const [statusApuesta, setStatus] = useState("abierta");
    const [apuestaType, setApuestaType]=useState("Diaria");
    const [cambiar, setCambiar] = useState(false);
    const handler = props.handler;

    useEffect(() => {        
        setId(sorteId);       
        setNumeroApuesta(numero);
        setStatus(status);        
        setApuestaType(type === "DIARIA" ? "Diaria" : "Chica")
        if( status === 'bloqueada')
            setCambiar(true)
    }, [sorteId, numero, status, type])

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
                    <Grid item xs={3} className={classes.typeContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {apuestaType} 
                        </Typography>
                    </Grid> 
                    <Grid item xs={6} className={classes.titleContainerShort}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {titleApuesta} 
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={3} className={classes.hourContainer}>
                        <Typography variant="body1" gutterBottom className={classes.textLabel}>
                            {apuestaHour} 
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
                        <Grid item xs={9}                             
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
                        <Grid item xs={2} className={`${classes.fijarContainer} form__center-label`}>
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