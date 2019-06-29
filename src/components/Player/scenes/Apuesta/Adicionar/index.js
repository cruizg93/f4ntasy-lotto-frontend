import React, {useState, useEffect} from 'react';
import {playerService} from "../../../../../service/api/player/player.service";

const AdicionarApuesta=()=>{
    const [entry, setEntryData]=useState([]);

    useEffect(() =>{
        playerService.list_apuestas_hoy().then((result)=>{
            console.log(result.data);
            setEntryData(Array.from(result.data))
        })
    },[]);
    return(
        <React.Fragment>

        </React.Fragment>
    )
};

export default AdicionarApuesta;