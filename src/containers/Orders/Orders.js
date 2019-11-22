import React from 'react';
import Order from'../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends React.Component{
    state={
        loading:true,
        orders:[]
    }
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orderContent=<Spinner/>;
        if(this.props.loading ===false){
            orderContent=this.props.orders.map(order=>{
                return <Order ingredients={order.ingredients}
                                price={order.price} 
                                key={order.id}/>
            });
        }
        return(
           <div>
                {orderContent}   
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToprops = dispatch =>{
    return{
        onFetchOrders: (token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(WithErrorHandler(Orders,axios));