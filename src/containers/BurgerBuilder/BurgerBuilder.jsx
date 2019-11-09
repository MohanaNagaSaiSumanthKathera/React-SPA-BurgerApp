import React,{Component} from 'react';
import Auxi from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
    state={
        ingredients:{
            meat: 0,
            salad: 0,
            bacon:0,
            cheese:0        }
    }
    render(){
        return(
            <Auxi>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <div>Burger Controls</div>
            </Auxi>
        );
    }
}

export default BurgerBuilder;