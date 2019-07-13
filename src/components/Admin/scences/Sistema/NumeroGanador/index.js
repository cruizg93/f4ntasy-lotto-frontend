import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {adminService} from "../../../../../service/api/admin/admin.service";
import NumeroGanadorEntry from "../../../components/NumeroGanadorEntry/index";


const NumeroGanador = (props) => {
    const [entry, setEntryData] = useState([]);


    useEffect(() => {
        adminService.get_numeros_ganadores().then((result) => {
            setEntryData(Array.from(result.data));
        })
    }, []);

    function reload() {
        adminService.get_numeros_ganadores().then((result) => {
            setEntryData([])
            setEntryData(Array.from(result.data));
        })
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="flex-start">
                {entry.length !== 0 ?
                    entry.map((apuesta, index) =>
                        <NumeroGanadorEntry key={index} {...apuesta} {...props} handler={reload}/>
                    )

                    :
                    "No hay datos disponibles"
                }
            </Grid>
        </React.Fragment>
    )
};

export default NumeroGanador;