import React,{ Component} from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import Order from '../src/containers/Orders/Orders';
import {Route,Switch } from 'react-router-dom';

class App extends Component{
  render(){
    return(
      <div>
        <Layout>
          <Switch>
              <Route path="/checkout" component={ Checkout }/> 
              <Route path='/orders' component={Order}/>
              <Route path="/" exact component={ BurgerBuilder }/>
          </Switch>
        </Layout>  
      </div>
    )
  }
}

export default App;
