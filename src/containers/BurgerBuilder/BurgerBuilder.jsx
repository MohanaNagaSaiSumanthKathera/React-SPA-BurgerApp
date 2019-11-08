import React,{Component} from 'react';
import auxi from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component{
    render(){
        return(
            <auxi>
                <div><Burger/></div>
                <div>Burger Controls</div>
            </auxi>
        );
    }
}

export default BurgerBuilder;