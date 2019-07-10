import React, {useState, useEffect} from 'react';
import NumerosGanadoresEntry from '../../../components/NumerosGanadoresEntry/index';
import {adminService} from "../../../../../service/api/admin/admin.service";
import {makeStyles} from "@material-ui/core/styles/index";
import {blue} from "@material-ui/core/colors/index";
import Typography from '@material-ui/core/Typography';


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
    textWithBorder: {
        fontWeight: 'bold',
        border: '1px solid #747474',
        margin: '1rem',
    },
    textWithBorderTop: {
        fontWeight: 'bold',
        borderTop: '1px solid #747474',
        margin: '1rem',
    },
    textBlock: {
        fontWeight: 'bold',
        display: 'block !important'
    },
    textNoDisponible: {
        fontWeight: 'bold',
        margin: '2rem',
    },
    open: {
        color: blue[300]
    },
    disableLink: {
        pointerEvents: 'none'
    }

}));
const NumerosGanadores = (props) => {
    const classes = useStyles();
    const [numerosGanadoresList, setNumerosGanadoresList] = useState([]);
    useEffect(() => {

        adminService.get_historial_numeros_ganadores().then((result) => {
            setNumerosGanadoresList(Array.from(result.data));
        })
    }, [])

    function handleUpdate() {
        setTimeout(() => {
            adminService.get_historial_numeros_ganadores().then((result) => {
                setNumerosGanadoresList([]);
                setNumerosGanadoresList(Array.from(result.data));
            })
        }, 3000)

    }

    return (
        <React.Fragment>

            {numerosGanadoresList.length > 0 ?
                numerosGanadoresList.map((numero, index) =>
                    <NumerosGanadoresEntry key={index} {...numero} handle={handleUpdate} {...props}/>
                ) :
                <Typography variant="body1" gutterBottom className={classes.textNoDisponible}>
                    No hay resultados disponibles para esta semana
                </Typography>
            }

        </React.Fragment>
    )
};

export default NumerosGanadores;