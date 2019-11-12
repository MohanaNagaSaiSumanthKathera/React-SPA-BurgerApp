import React from 'react';
import Order from'../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends React.Component{
    state={
        loading:true,
        orders:[]
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                this.setState({loading:false,orders:fetchedOrders});
            }).catch(err=>{
                this.setState({loading:false});
            })
    }

    render(){
        let orderContent=<Spinner/>;
        if(this.state.loading ===false){
            orderContent=this.state.orders.map(order=>{
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

export default WithErrorHandler(Orders,axios);