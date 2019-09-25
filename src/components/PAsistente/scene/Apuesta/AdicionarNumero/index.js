import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { playerService } from "../../../../../service/api/player/player.service";
import EntrarNumero from "../../../components/EntrarNumero/index";
import { makeStyles, withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import Typography from '@material-ui/core/Typography';
import { Colors } from "../../../../../utils/__colors";
import { FaShoppingCart } from 'react-icons/fa';

const LimpiarButton = withStyles({
    root: {
        width: '100px',
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

const TotalButton = withStyles({
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

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold'
    },
    fixedElement: {
        position: 'fixed',
        width: '100%',
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main
    },
    textApuestaDescription: {
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    }

}));

const AdicionarNumeroApuestaAsistente = ({ match, ...props }) => {
    const classes = useStyles();
    const [apuestaEntry, setApuestaEntryData] = useState([]);
    const [title, setTitle] = useState("");
    const mounted = useState(true);

    useEffect(() => {
        let reg = /^\d+$/;
        if (!reg.test(match.params.apuestaId)) {
            props.history.push('/');
            return () => {
                mounted.current = false;
            }
        }
        playerService.list_number_by_apuesta_id(match.params.apuestaId).then((result) => {
            setTitle(result.data.name);
            setApuestaEntryData(Array.from(result.data.list))
        });
    }, []);

    function limpiarClickHandler() {
        playerService.list_number().then((result) => {
            setApuestaEntryData([]);
            setApuestaEntryData(Array.from(result.data.list))
        })
    }

    function updateFunction(e) {
        let id = e.target.id;
        id = id.split('-')[3];
        if (e.target.value !== '') {
            apuestaEntry[id]['current'] = parseFloat(e.target.value);
        } else if (apuestaEntry[id]['current'] !== 0) {
            apuestaEntry[id]['current'] = 0;
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start">
                <List dense className={''}>
                    {apuestaEntry.map((element, index) =>
                        <EntrarNumero key={index}
                            numero={element.numero}
                            tope={element.tope}
                            max={element.max}
                            current={element.current}
                            index={index}
                            {...props}
                            onEdit={updateFunction}
                        />
                    )}
                </List>
            </Grid>
            <Grid container spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.fixedElement}
            >
                <Typography variant="body1" className={classes.textApuestaDescription}>
                    {title}
                </Typography>
                <LimpiarButton variant="outlined" color="primary" onClick={limpiarClickHandler}>
                    <Typography variant="body1" className={classes.root}>
                        Limpiar
                    </Typography>
                </LimpiarButton>
                <TotalButton variant="outlined" color="primary"
                    component={Link}
                    to={{
                        pathname: '/asistente/apuesta/detalles',
                        state: {
                            list: apuestaEntry,
                            id: match.params.apuestaId,
                            title: title
                        }
                    }}
                    className={classes.root}
                >
                    <Typography variant="body1"   >
                        Total <FaShoppingCart />
                    </Typography>
                </TotalButton>
            </Grid>

        </React.Fragment>
    )
};


export default AdicionarNumeroApuestaAsistente;