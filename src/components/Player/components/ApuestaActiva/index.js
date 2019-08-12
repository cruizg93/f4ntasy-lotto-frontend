import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles/index";
import NumberFormat from 'react-number-format';
import {red} from "@material-ui/core/colors/index";
import {FaTrashAlt} from 'react-icons/fa';

import './ApuestaActiva.css';
import { Colors } from '../../../../utils/__colors';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    item: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        width: '60px',
        border: '1px #000 solid',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
        color: red[400]
    },
    deleteIcon:{
        background: Colors.Btn_Red,
        color: Colors.Input_bkg,
        width: "1.5rem",
        height: "1.5rem",
        padding: ".2rem",
        '&:hover':{
            cursor: "pointer"
        }
    }

}));
const ApuestaActivaEntry = ({numero, valor, disable, ...props}) => {
    const classes = useStyles();    
    return (
        <>
            <Grid item xs={4}
                  container
                  justify="flex-end"
            >
                <Typography id={`text-${props.index}`} variant="body1" gutterBottom className={classes.text}>
                    {numero}
                </Typography>
            </Grid>
            <Grid item xs={3}
                  container
                  justify="flex-start"
            >
                <NumberFormat
                    id={`user-apuesta-data-${props.index}`}
                    placeholder="Número"
                    margin="normal"
                    variant="outlined"
                    style={{marginRight: 50, width: 150}}
                    className={valor > 0 ? classes.root : classes.negative}
                    value={valor}
                    disabled={disable}
                    onBlur={props.onEdit}
                />
            </Grid>
            <Grid item xs={4}
                  container
                  justify="flex-start"
            >
                <FaTrashAlt id={`delete-apuesta-activa-valor-${props.index}`} className={`${classes.deleteIcon} form__center-label` }
                    onClick={props.delete}
                />
            </Grid>
        </>
    )
};


export default ApuestaActivaEntry;