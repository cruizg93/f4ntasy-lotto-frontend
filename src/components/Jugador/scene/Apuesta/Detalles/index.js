import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {adminService} from "../../../../../service/api/admin/admin.service";
import JugadorDetallesEntry from '../../../components/Apuesta/Detalles/index';

const JugadorDetalles = (props) => {
        const [apuestasList, setApuestasList] = useState([]);
        useEffect(() => {

            adminService.list_apuestas_details(props.location.state.username).then((result) => {
                setApuestasList(Array.from(result.data));
            })

        }, [])
        return (
            <React.Fragment>
                <Grid container spacing={3}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    {apuestasList.map((apuesta, index) =>
                        <JugadorDetallesEntry key={index} {...apuesta} index={index}
                                              username={props.location.state.username}
                                              {...props}/>
                    )}
                </Grid>
            </React.Fragment>
        )
    }
;
export default JugadorDetalles;