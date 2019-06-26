import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import {list} from "../../service/api/password/password";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Entry from './components/entry';

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

export default function Password() {
    const classes = useStyles();

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        list().then((result) => {
            setUserList(Array.from(result.data));
        })
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={1}
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <List dense className={classes.root}>
                        {userList.map((user, index) =>
                                    <Entry key={index} index={index} username={user}/>
                        )}

                    </List>
                </Grid>
            </Container>
        </React.Fragment>
    )
}
