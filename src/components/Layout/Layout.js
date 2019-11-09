import React from 'react';
import Auxi from '../../hoc/auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component{
    state={
        showSideDrawer : true
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    render(){
        return(
            <Auxi>
            <Toolbar/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <div>backdrop</div>
            <main className={classes.Content}>{this.props.children}</main>
        </Auxi>
        );
    }
}

export default Layout;