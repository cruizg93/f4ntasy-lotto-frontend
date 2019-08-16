import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {playerService} from "../../../../../service/api/player/player.service";
import ApuestaData from '../../../components/Apuesta/index';

const AdicionarApuestaAsistente = (props) => {
    const [entry, setEntryData] = useState([]);
  
    useEffect(() => {
        playerService.list_apuestas_hoy_by_username().then((result) => {    
          
            setEntryData(result.data)
        })
    }, []);
    return (
        <React.Fragment>
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                {entry.map((apuesta, index) =>
                    <ApuestaData key={index} {...apuesta} index={index} {...props}/>
                )}
            </Grid>
        </React.Fragment>
    )
};

export default AdicionarApuestaAsistente;