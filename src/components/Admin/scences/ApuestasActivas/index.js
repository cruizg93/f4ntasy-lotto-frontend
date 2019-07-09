import React, {useState, useEffect} from 'react';
import {adminService} from "../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import ApuestasActivasAdminData from '../../components/ApuestasActiva/index'

const ApuestasActivasAdmin = (props) => {
    const [apuestasActivas, setApuestasActivasList] = useState([]);
    useEffect(() => {
        adminService.get_apuestas_activas().then((result) => {
            console.log(result.data);
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
                    <ApuestasActivasAdminData key={index} {...apuesta} index={index} {...props}/>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default ApuestasActivasAdmin;