import React, {useState, useEffect} from 'react';
import Jugadores from '../Jugador/Jugador';
import AdicionarApuesta from '../Player/scenes/Apuesta/Adicionar/index';
import AdicionarApuestaAsistente from '../PAsistente/scene/Apuesta/Adicionar/index';
import {authenticationService} from '../../service/api/authentication/authentication.service';

const Index=({...props})=>{
    const [admin, setAdmin]=useState(false);
    const [asistente, setAsistente]=useState(false);
    const [player, setPlayer]=useState(false);
    useEffect(()=>{
        let role = authenticationService.type_user();
        setAdmin(role === 'Admin' || role === 'Master' || role === 'Supervisor');
        setAsistente(role === 'Asistente')
        setPlayer(role === 'Player')
    }, [props])

    return (
        <React.Fragment>     
           {admin && <Jugadores {...props} />}
           {asistente && <AdicionarApuestaAsistente {...props} main={true}/>}
           {(!asistente && !admin) ? <AdicionarApuesta {...props} main={true}/> : null}
        </React.Fragment>
    )

    /* return <Main components={components}/> */
}

export default Index;