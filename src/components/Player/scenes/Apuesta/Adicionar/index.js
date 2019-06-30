import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {playerService} from "../../../../../service/api/player/player.service";
import ApuestaData from '../../../components/Apuesta/index';

const AdicionarApuesta = (props) => {
    const [entry, setEntryData] = useState([]);

    useEffect(() => {
        playerService.list_apuestas_hoy().then((result) => {
            console.log(result.data);
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
                    <ApuestaData key={index} {...apuesta} index={index} {...props}/>
                )}
            </Grid>
        </React.Fragment>
    )
};

export default AdicionarApuesta;