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
        setAdmin(authenticationService.type_user() === 'Admin' || authenticationService.type_user() === 'Master');
        setAsistente(authenticationService.type_user() === 'Asistente')    
        setPlayer(authenticationService.type_user() === 'Player')        
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