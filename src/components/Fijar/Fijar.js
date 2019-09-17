import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import Entry from './components/entry';
import { list_numeros } from "../../service/api/fijar/fijar";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        background: '#FFF',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
}));


export default function Fijar() {
    const classes = useStyles();

    const [numberList, setNumberList] = useState([]);

    useEffect(() => {
        list_numeros().then((result) => {
            setNumberList(Array.from(result));
        })
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="xs" className={classes.container}>
                <Grid container spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    <List dense className={classes.root}>
                        {numberList.map((element, index) =>
                            <Entry key={index} numero={element.numero} tope={element.tope} />
                        )}

                    </List>
                </Grid>
            </Container>
        </React.Fragment>

    )
}