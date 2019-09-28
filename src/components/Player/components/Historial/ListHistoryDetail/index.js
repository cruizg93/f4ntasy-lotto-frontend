import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FaTrashAlt } from "react-icons/fa";

import './styles.css'

class ListHistoryDetail extends React.Component {

    render() {
        let total = 0
        if (this.props.list) {
            total = this.props.list.reduce((sum, row) => sum + row.valor, 0)
        }
        const width = this.props.width ? this.props.width : '67%';
        const marginLeft = this.props.marginLeft ? this.props.marginLeft : 39;
        const paddingTop = this.props.paddingTop ? this.props.paddingTop : 5;
        return (
            <div style={{ width: width, marginLeft: marginLeft, paddingTop: paddingTop }}>
                {
                    this.props.list ?
                        <>
                            <List className="historyListDetail">
                                {this.props.list && this.props.list
                                    .map((element, index) =>
                                        <ListItem key={index} className="history_apuesta" alignItems="center">
                                            <ListItemText className="history_apuestaNumber"
                                                primary={<Grid container>
                                                    <Grid item style={{ textAlign: "center", width: '100%' }}>{element.numero.toString().padStart(2, "0")}</Grid>
                                                </Grid>
                                                } />
                                            <ListItemText className="history_apuestaValues"
                                                primary={<Grid container>
                                                    <Grid item style={{ textAlign: "left", width: '100%', paddingLeft: 15 }}>{element.valor}</Grid>
                                                </Grid>
                                                } />
                                        </ListItem>
                                    )}
                            </List>
                            <div className="history_total">
                                Total {'\u00A0'}&mdash;{'\u00A0'}{total}
                            </div>
                        </>
                        : null
                }
            </div>
        )
    }

}

export default ListHistoryDetail;