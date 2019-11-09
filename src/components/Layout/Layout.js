import React from 'react';
import Auxi from '../../hoc/auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props)=>(
    <Auxi>
            <Toolbar/>
            <div>sidedrawer,backdrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Auxi>
)

export default Layout;