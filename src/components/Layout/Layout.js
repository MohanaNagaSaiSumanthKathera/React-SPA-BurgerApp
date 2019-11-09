import React from 'react';
import Auxi from '../../hoc/auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component{
    state={
        showSideDrawer : false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
           return {showSideDrawer : !prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Auxi>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <div>backdrop</div>
            <main className={classes.Content}>{this.props.children}</main>
        </Auxi>
        );
    }
}

export default Layout;