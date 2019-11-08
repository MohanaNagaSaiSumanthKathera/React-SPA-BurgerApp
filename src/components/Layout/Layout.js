import React from 'react';
import auxi from '../../hoc/auxi';
import classes from './Layout.css';
const Layout = (props)=>(
    <auxi>
            <div>Toolbar,sidedrawer,backdrop</div>
            <main className={classes.Content}>{props.children}</main>
        </auxi>
)

export default Layout;