import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core/styles/index";
import SingleApuestaDetails from '../../components/Detalles/SingleApuestaDetails/index';
import {red, blue} from "@material-ui/core/colors/index";
import {Colors} from "../../../../utils/__colors";

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
        fontWeight: 'bold'
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
    containerData:{
        background: Colors.Main,
    },
    apuestaContainer:{
        borderRight:"#afb6b8 1px solid",
    }
}));


const ShowDetallesApuesta = ({title, apuestas, total, ...props}) => {
    const classes = useStyles();
    const [titleData, setTitleData] = useState('');
    const [apuestasData, setApuestasData] = useState([]);
    const [totalData, setTotalData] = useState(0.0);
    const [moneda, setMoneda] = useState();
   

    useEffect(() => {
        setTitleData(title);
        setApuestasData(Array.from(apuestas));
        setTotalData(total);
        if(props.moneda)
            setMoneda((props.moneda === "LEMPIRAS" || props.moneda === " L ") ? "L" : " $ ");
       

    }, [])
    return (
        <React.Fragment>
            <Grid container
                 spacing={1}
                 direction="row"
                 justify="center"
                 className={classes.containerData}
            >
                {props.apuestaTitle &&
                <>
                    <Grid item sm={3}
                        className={classes.apuestaContainer}
                        >                     
                        <Typography variant="h5" gutterBottom>
                            
                        </Typography>
                    </Grid>
                    <Grid item sm={8}>
                        <Typography variant="h5" gutterBottom
                            style={{marginLeft: ".5rem"}}
                        >
                            {props.apuestaTitle}
                        </Typography>                     
                    </Grid>
                 </>
                }
                <Grid item sm={12}
                      container
                      justify="center"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {" "}{titleData}
                    </Typography>
                </Grid>
                <Grid item sm={12}
                      container
                      justify="center"
                >
                    {apuestasData.map((apuesta, index) =>
                            <SingleApuestaDetails key={index} {...apuesta} {...props} moneda={moneda}/>

                    )}
                </Grid>
                <Grid item sm={6}
                      container
                      justify="flex-end"
                      
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        Total | {moneda}
                    </Typography>
                </Grid>
                <Grid item sm={6}
                      container
                      justify="flex-start"
                      
                >
                    <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.negative}>
                        {"  "}{total.toFixed(2)}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Divider/>
                </Grid>
            </Grid>
            

        </React.Fragment>

    )

};

export default ShowDetallesApuesta;
