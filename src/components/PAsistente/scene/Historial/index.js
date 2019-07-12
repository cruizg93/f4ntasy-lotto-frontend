import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {playerService} from "../../../../service/api/player/player.service";
import HistorialDataPAsistente from '../../components/Historial/index';

const HistorialAsistente = (props) => {
    const [entry, setEntryData] = useState([]);

    useEffect(() => {
        playerService.list_historial_apuestas().then((result) => {
            setEntryData(result.data)
        })
    }, []);
    return (
        <React.Fragment>
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                {entry.map((apuesta, index)=>
                    <HistorialDataPAsistente key={index} {...apuesta} index={index} {...props}/>
                )}
            </Grid>
        </React.Fragment>
    )
};

export default HistorialAsistente;