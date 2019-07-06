import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from "@material-ui/core/styles/index";
import SingleApuestaDetails from '../../components/Detalles/SingleApuestaDetails/index';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    component: {
        textDecoration: 'none',
    },
    text: {
        fontWeight: 'bold',
        padding: '5px',
        textAlign: 'center'
    },
    negative: {
        padding: theme.spacing(1, 1),
    },
    numbers: {
        paddingLeft: '.5rem'
    }

}));
const ShowDetallesApuesta = ({title, apuestas, total, ...props}) => {
    const classes = useStyles();
    const [titleData, setTitleData] = useState('');
    const [apuestasData, setApuestasData] = useState([]);
    const [totalData, setTotalData] = useState(0.0);

    useEffect(() => {
        setTitleData(title);
        setApuestasData(Array.from(apuestas));
        setTotalData(total);
        console.log(title);
        console.log(apuestas);
        console.log(total);

    }, [])
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}
                      container
                      justify="center"
                >
                    <Typography variant="body1" gutterBottom className={classes.text}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}
                      container
                      justify="center"
                >
                    {apuestasData.map((apuesta, index)=>
                        <SingleApuestaDetails key={index} {...apuesta} {...props}/>
                    )}
                </Grid>
            </Grid>

        </React.Fragment>

    )

};

export default ShowDetallesApuesta;
