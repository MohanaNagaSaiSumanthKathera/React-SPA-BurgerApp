import React,{Component} from 'react';
import Auxi from '../../hoc/auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES ={
    salad : 0.5,
    cheese : 0.4,
    meat :1.3,
    bacon :0.7
}
class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(res=>{
                this.setState({ingredients: res.data});
                console.log(res.data);
            }).catch(error=>{
                this.setState({error:true});
            })
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer :{
                name : 'Sushma',
                address:{
                    street: 'wastssfads',
                    zipCode: '523243',
                    country: 'us'
                },
                email : 'test@gmail.com'
            },
            deliveryMethod: 'Fast'
        }

        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false,purchasing:false});
            }).catch(error=>{
                this.setState({loading:false,purchasing:false});
                console.log(error);
            });
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
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceAddition;
        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

   
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        let burger= this.state.error?<p>Ingredients cannot be Loaded</p>:<Spinner/>
        if(this.state.ingredients){
        burger= <Auxi>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price ={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        />
                </Auxi>
        orderSummary=<OrderSummary ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)} />
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

export default WithErrorHandler(BurgerBuilder,axios);