import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const order={
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            customer :{
                name : 'Sushmalu',
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
                this.setState({loading:false});
                this.props.history.push('/');
            }).catch(error=>{
                this.setState({loading:false});
                console.log(error);
            });
    }
    render(){
        let form=(<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
        </form>);

        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>    

        );
    }
}

export default ContactData;