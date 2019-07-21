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

const NumeroGanadorEntry = ({match: {url}, apuestaId, title, numero, status, ...props}) => {
    const classes = useStyles();
    const [idApuesta, setId] = useState(0);
    const [titleApuesta, setTitleApuesta] = useState('');
    const [numeroApuesta, setNumeroApuesta] = useState(-1);
    const [statusApuesta, setStatus] = useState("abierta");
    const handler = props.handler;

    useEffect(() => {
        setId(apuestaId);
        setTitleApuesta(title);
        setNumeroApuesta(numero);
        setStatus(status);
    }, [])

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

    return (
        <Grid item xs={12}>
            <Paper key={props.index} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {titleApuesta}
                </Typography>
                <Divider/>
                <Grid container>
                    {numero !== -1 ?

                        <Grid item
                              container
                              justify="center"

                        >
                            <Grid item xs={9}
                                  container
                                  justify="center"

                            >
                                <Typography variant="body1" gutterBottom className={classes.text}>
                                    Sorteo ya terminó. El numero ganador fue el
                                </Typography>
                            </Grid>
                            <Grid item xs={3}
                                  container
                                  justify="center"

                            >
                                {numeroApuesta}
                            </Grid>

                        </Grid>
                        :
                        null

                    }
                    {status === "cerrada" ?
                        <>
                            <Grid item xs={12}
                                  container
                                  justify="center"
                            >
                                <Typography variant="body1" gutterBottom className={classes.textRed}>
                                    Sorteo ya esta bloqueado
                                </Typography>
                            </Grid>

                            <Grid item xs={6}
                                  container
                                  justify="flex-end"

                            >
                                <NumberFormat
                                    id={`admin-numero-ganador-insert`}
                                    placeholder="Número"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.btnHeight}
                                    onChange={onNumberChange}
                                />
                            </Grid>

                            <Grid item xs={6}
                                  container
                                  justify="flex-start"

                            >
                                <TotalButton variant="outlined" color="primary" onClick={clickButton}>
                                    <Typography variant="body1" gutterBottom>
                                        Fijar
                                    </Typography>
                                </TotalButton>
                            </Grid>
                        </>

                        :
                        null
                    }

                    {status === "abierta" ?
                        <Typography variant="body1" gutterBottom className={classes.root}>
                            Sorteo sigue activo
                        </Typography>
                        :
                        null
                    }


                </Grid>
            </Paper>
        </Grid>

    )
};

export default NumeroGanadorEntry;