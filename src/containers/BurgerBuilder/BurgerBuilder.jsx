import React,{Component} from 'react';
import { connect } from 'react-redux';
import Auxi from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state={
        purchasing : false
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString= queryParams.join('&');

        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?'+queryString
        // });
    }

    updatePurchaseState(updatedIngredients){
        const ingredients= updatedIngredients;
        const sum =Object.keys(ingredients)
                    .map((igKey)=>{
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum + el;
                    },0);
       return sum>0;    
    }

    // addIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount<=0){
    //         return
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceAddition;
    //     this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

   
    render(){
        const disabledInfo={
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        let burger= this.props.error?<p>Ingredients cannot be Loaded</p>:<Spinner/>

        if(this.props.ings){
        burger= <Auxi>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price ={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        />
                </Auxi>
        orderSummary=<OrderSummary ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)} />
        }
        
        return(
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        );
    }
}

const mapStateToProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded : (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients :  () =>dispatch(actions.initIngredients()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit())
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (WithErrorHandler(BurgerBuilder,axios));