import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChicaLogo from '../assets/Chica_PNG.png';

const ChicaTitle = (xsValue, ...props) => {
    return (
        <Grid item className="headerLabel">
            <img src={ChicaLogo} alt="ChicaLogo" /></Grid>
    )

};

export default ChicaTitle;