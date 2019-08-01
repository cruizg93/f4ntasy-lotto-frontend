import React, {useState, useEffect} from 'react';
import {adminService} from "../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import ApuestasActivasAdminData from '../../components/TemporalEntry/index';
import Button from "@material-ui/core/Button/index";
import {withStyles} from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';


const CrearApuesta = withStyles({
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

const ReiniciarBalances = withStyles({
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
const TemporalView = ({...props}) =>{
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    function reload(){
        adminService.get_apuestas_activas().then((result) => {
            setApuestasActivasList([]);
            setApuestasActivasList(Array.from(result.data));
        })
    }

    function reset_balance(){
        adminService.temporal_reset_balance_service().then((result) => {
            reload();
        })
    }
    function insert_apuesta(){
        adminService.temporal_insert_service().then((result) => {
            reload();
        })
    }
    function insert_apuesta_chica(){
        adminService.temporal_insert_chica_service().then((result) => {
            reload();
        })
    }
    useEffect(() => {
        adminService.get_apuestas_activas().then((result) => {
            setApuestasActivasList(Array.from(result.data));
        })
    }, [])
    return (
        <React.Fragment>
            
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                    <Grid container >
                        <Grid item xs={6}
                            container
                            justify="flex-end"
                        >
                            <CrearApuesta variant="outlined" color="primary" onClick={insert_apuesta} >
                                    <Typography variant="body1" gutterBottom>
                                        Crear Apuestas
                                    </Typography>
                            </CrearApuesta>
                        </Grid>
                        <Grid item xs={6}
                            container
                            justify="flex-start"                         
                        >
                            <ReiniciarBalances variant="outlined" color="primary" onClick={reset_balance}>
                                    <Typography variant="body1" gutterBottom>
                                        Reiniciar Balances
                                    </Typography>
                            </ReiniciarBalances>

                        </Grid>
                        <Grid item xs={6}
                            container
                            justify="flex-end"
                        >
                            <CrearApuesta variant="outlined" color="primary" onClick={insert_apuesta_chica} >
                                    <Typography variant="body1" gutterBottom>
                                        Crear Apuesta Chica
                                    </Typography>
                            </CrearApuesta>
                        </Grid>

                    </Grid>
                {apuestasActivas.map((apuesta, index)=>
                    <ApuestasActivasAdminData key={index} {...apuesta} index={index} {...props} handle={reload}/>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default TemporalView;