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

    function components() {
        if(admin){
            return <Jugadores {...props} />;
        }else if(asistente){
            return <AdicionarApuestaAsistente {...props}/>;
        }else {
            return <AdicionarApuesta {...props}/>;            
        }
    }
    return (
        <React.Fragment>     
           {components()}
        </React.Fragment>
    )

    /* return <Main components={components}/> */
}

function Main(props){
    return (
        <React.Fragment>     
           {props.components}
        </React.Fragment>
    )
}

export default Index;