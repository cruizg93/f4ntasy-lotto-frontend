import React from 'react';

import NestedList from '../NestedList/NestedList';
import './SideDrawer.css'


const sideDrawer = props => {
    let drawerClasses = ['side-drawer'];
    if (props.show) {
        drawerClasses = 'side-drawer open'
    }

    return (

            <nav className={drawerClasses}>
                <NestedList click={props.drawerClickHandler}
                            admin={props.admin}
                            asistente={props.asistente}/>
            </nav>



    );

};
export default sideDrawer;