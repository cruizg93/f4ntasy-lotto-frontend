import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DiariaLogo from '../assets/Diaria_PNG.png';

const DiariaTitle = (xsValue, ...props) => {
    return (
        <Grid item >
            <img src={DiariaLogo} alt="DiariaLogo" /></Grid>
    )

};

export default DiariaTitle;