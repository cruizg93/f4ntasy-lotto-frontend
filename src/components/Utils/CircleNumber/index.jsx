import React from 'react'
import { makeStyles } from "@material-ui/core/styles/index";
import { Colors } from "../../../utils/__colors";

const useStyles = makeStyles(theme => ({
    circle: {
        padding: 10,
        margin: 5,
        display: "flex",
        background: Colors.Yellow,
        borderRadius: "50%",
        border: `${Colors.Green} 2px solid`,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));
const CircleNumber = ({ ...props }) => {
    const classes = useStyles();
    const width = props.width ? props.width : '35px';
    const color = props.color ? props.color : 'black';
    const fontSize = props.fontSize ? props.fontSize : '20px';
    return (
        <React.Fragment >
            <div className={classes.circle} style={{ width: width, height: width, color: color, fontSize: fontSize }}>
                {props.numero}
            </div>
        </React.Fragment>
    )
}


export default CircleNumber;