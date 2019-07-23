import React, {useState, useEffect} from 'react';
import {adminService} from "../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import ApuestasActivasAdminData from '../../components/TemporalEntry/index';

const TemporalView = ({...props}) =>{
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    function reload(){
        adminService.get_apuestas_activas().then((result) => {
            setApuestasActivasList([]);
            setApuestasActivasList(Array.from(result.data));
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
                {apuestasActivas.map((apuesta, index)=>
                    <ApuestasActivasAdminData key={index} {...apuesta} index={index} {...props} handle={reload}/>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default TemporalView;