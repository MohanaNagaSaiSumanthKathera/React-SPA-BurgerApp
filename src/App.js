import React,{ Component} from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import logout from '../src/containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import {Route,Switch, withRouter, Redirect } from 'react-router-dom';
import * as actions from '../src/store/actions/index';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout= asyncComponent(()=>{
  return import('../src/containers/Checkout/Checkout');
})

const asyncOrder= asyncComponent(()=>{
  return import('../src/containers/Orders/Orders');
})

const asyncAuth= asyncComponent(()=>{
  return import('../src/containers/Auth/Auth');
})

class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignIn();
  }
  render(){
    let routes =(
      <Switch>
      <Route path='/auth' component={asyncAuth}/>
      <Route path="/" exact component={ BurgerBuilder }/>
      <Redirect to="/"/>
    </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path="/checkout" component={ asyncCheckout }/> 
        <Route path='/orders' component={ asyncOrder } />
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/logout' component={logout}/>
        <Route path="/" exact component={ BurgerBuilder }/>
        <Redirect to="/"/>
    </Switch>
      );
    }
    return(
      <div>
        <Layout>
          {routes}
        </Layout>  
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
      isAuthenticated : state.auth.token !==null
  }
}

const mapDispatchToProps= dispatch =>{
  return{
      onTryAutoSignIn: ()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
