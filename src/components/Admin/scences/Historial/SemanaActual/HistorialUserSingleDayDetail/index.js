import React, {useState, useEffect} from 'react';
import {adminService} from "../../../../../../service/api/admin/admin.service";
import Grid from '@material-ui/core/Grid';
import HUSDDetailEntry from '../../../../components/HistorialUsuarioDetalles/HUSDDetail/index';

const HistorialUserSingleDayDetail = (props) => {
    const [apuestasActivas, setApuestasActivasList] = useState([]);

    useEffect(() => {
        adminService.get_historial_current_week_by_id_and_type_details(props.location.state.id,
            props.location.state.moneda,
            props.location.state.date)
            .then((result) => {
                setApuestasActivasList(Array.from(result.data));
            })

    }, [])
    return (
        <React.Fragment>
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                {apuestasActivas.map((apuesta, index) =>
                    <HUSDDetailEntry key={index} {...apuesta} index={index} {...props}/>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default HistorialUserSingleDayDetail;