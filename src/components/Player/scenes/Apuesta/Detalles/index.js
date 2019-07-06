import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {red, blue} from "@material-ui/core/colors/index";
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import {playerService} from "../../../../../service/api/player/player.service";
import ShowDetallesApuesta from '../../../components/Detalles/index';

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
    }

}));
const DetallesApuesta = ({...props}) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [id, setIdValue] = useState(0);
    const [list, setList] = useState([]);
    useEffect(() => {
        playerService.detalles_by_apuesta_id(props.location.state.id).then((result) => {
            setList(Array.from(result.data));
        })
        setTitle(props.location.state.title.title);
        setIdValue(props.location.state.id)
    }, []);
    return (
        <React.Fragment>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>


            </Grid>
            <Divider/>
            <Grid
                container spacing={1}
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {list.map((apuestaDetail, index) =>
                    <ShowDetallesApuesta key={index} {...apuestaDetail} index={index} {...props}
                    />
                )}
            </Grid>
        </React.Fragment>
    )

};

export default DetallesApuesta;