import React from 'react'
import {makeStyles} from "@material-ui/core/styles/index";
import {Colors} from "../../../utils/__colors";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({ 
    circle:{
        padding: 10,
        margin: 5,
        display: "flex",
        background: Colors.Yellow,
        borderRadius: "50%",
        border: `${Colors.Green} 2px solid`,
        width: 35,
        height: 35,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center', 
    }    

}));
const CircleNumber = ({...props}) =>{
    const classes= useStyles();
    return (
        <React.Fragment >   
            <div className={classes.circle}>
                {props.numero} 
            </div>         
                                        
        </React.Fragment>
    )
}


export default CircleNumber;