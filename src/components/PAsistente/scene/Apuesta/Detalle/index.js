import React, {useState, useEffect} from 'react';

const DetalleAsistente =({list, ...props})=>{
    const [elements, setElements]=useState([]);
    useEffect(()=>{
        console.log(list);
        console.log(props.location.state)

    },[]);
    return (
        <React.Fragment>
            Detalles
        </React.Fragment>

    )
};
export default DetalleAsistente;

