import React from 'react';
import Auxi from '../../hoc/auxi';
import classes from './Layout.css';
const Layout = (props)=>(
    <Auxi>
            <div>Toolbar,sidedrawer,backdrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Auxi>
)

export default Layout;