import {Colors} from "../../utils/__colors";

export const MainStyles = {
    fullBorderBox:{border:"#afb6b8 1px solid"},
    fullBorderBoxNoLeft:{borderRight:"#afb6b8 1px solid",borderTop:"#afb6b8 1px solid",borderBottom:"#afb6b8 1px solid", borderLeft:"0px !important"},

    boxContainer:{
        background : Colors.Main,
        marginTop: "1rem",
        textDecoration: "none",
        color: Colors.Btn_Blue_Dark,
        border:"#afb6b8 1px solid",
        "&:hover":{
            cursor: "pointer",
            /*background: Colors.Gray_Ligth_2,
            color: Colors.Input_bkg,*/
        }   
    }
}