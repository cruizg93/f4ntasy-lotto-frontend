import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import EntrarApuest from '../../../components/EntrarApuesta/index';
import {playerService} from "../../../../../service/api/player/player.service";
import EntrarApuesta from "../../../components/EntrarApuesta/index";


const AdicionarApuesta = () => {

    const [entry, setEntryData]=useState([]);

    useEffect(() =>{
        playerService.list_number().then((result)=>{
            setEntryData(Array.from(result.data))
        })
    },[]);
    return (
       <React.Fragment>
            <Container maxWidth="sm" className={''}>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <List dense className={''}>
                        {entry.map((element,index)=>
                            <EntrarApuesta key={index}
                                           numero={element.numero}
                                           tope={element.tope}
                                           max={element.max}
                                           index={index}
                                />
                        )}

                    </List>
                </Grid>
            </Container>
        </React.Fragment>
    )
};


export default AdicionarApuesta;