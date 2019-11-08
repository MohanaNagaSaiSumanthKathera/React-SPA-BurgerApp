import React from 'react';
import auxi from '../../hoc/auxi';

const Layout = (props)=>(
    <auxi>
            <div>Toolbar,sidedrawer,backdrop</div>
            <main>{props.children}</main>
        </auxi>
)

export default Layout;