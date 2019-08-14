import React, {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {red, blue} from "@material-ui/core/colors/index";
import ShowNumber from '../../../components/ShowNumero/index';
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import {playerService} from "../../../../../service/api/player/player.service";
import { FaShoppingCart } from 'react-icons/fa';
import {Colors} from "../../../../../utils/__colors";

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
    fixedElement:{
        position: 'fixed',
        width: '100%',        
        height: '76px',
        bottom: '0',
        left: '0',
        backgroundColor: Colors.Main      
    },
    textApuestaDescription:{
        height: '76px',
        fontWeight: 'bold',
        marginTop: '1rem'
    }

}));

const EditarButton = withStyles({
    root: {
        width: '120px',
        height: '100%',
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
        width: '120px',  
        height: '100%',      
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,        
        color: Colors.Btn_Blue,       
        marginBottom: '1.5rem',
        marginRight: '.5rem',        
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

const DetalleAsistente = ({list, ...props}) => {
    const classes = useStyles();
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState('');
    const [total, setTotal] = useState(0.0);
    const [id, setIdValue]=useState(0);
    const mounted = useState(true);

    useEffect(() => {
        setElements(props.location.state.list);
        setTitle(props.location.state.title);
        setIdValue(props.location.state.id);
        let totald = 0;
        props.location.state.list.forEach(function (item, index) {
            if (item.current !== 0) {
                totald = totald + item.current;
            }
        });
        setTotal(totald);
    }, []);
    function submitClickHandler() {
        playerService.update_number(elements, id).then((result) => {
            props.history.push("/asistente/apuestas");
            return () => {
                mounted.current = false;
            }
        })
    }
    function success_response() {
        toast.success("Cambio actualizado !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
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
                {elements.map((element, index) => {
                        return element.current > 0 ?
                            <ShowNumber key={index}
                                        numero={element.numero}
                                        valor={element.current}
                                        {...props}/> : null
                    }
                )}
            </Grid>
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
            >
                <Typography variant="body1" gutterBottom>
                    Apuesta | {total.toFixed(2)}
                </Typography>
            </Grid>          
            <Grid container spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.fixedElement}
                  >
                <Typography variant="body1" gutterBottom className={classes.textApuestaDescription}>
                        {title}
                </Typography>      
                <EditarButton variant="outlined" color="primary" onClick={props.history.goBack}>
                    <Typography variant="body1" gutterBottom>
                        Editar
                    </Typography>
                </EditarButton>
                <TotalButton variant="outlined" color="primary" onClick={submitClickHandler}>
                    <Typography variant="body1" gutterBottom >
                        Comprar <FaShoppingCart/>
                    </Typography>                    
                </TotalButton>
            </Grid>        
        </React.Fragment>

    )
};
export default DetalleAsistente;

