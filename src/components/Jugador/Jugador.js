import React, {useState, useEffect} from 'react';

import './Jugador.css';
import {adminService} from "../../service/api/admin/admin.service";

const Jugador = () => {

    const [jugadorList, setJugadorList]=useState([]);
    useEffect(() => {
        adminService.list_players_details().then((result)=>{
            console.log(result.data);
            setJugadorList(Array.from(result.data))
        })
    }, []);
    return (
        <React.Fragment>
            Pagina de Jugador en construccion
        </React.Fragment>
    );

}

export default Jugador;