import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component{
    state={
        orderForm:{
            name : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Country'
                },
                value: ''
            },
            email : {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                   options:[
                       {value:'fastest',displayValue:'fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const order={
            ingredients : this.props.ingredients,
            price : this.props.totalPrice
            
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

    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement ={
                    ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        this.setState({orderForm:updatedOrderForm});
    }
    render(){
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
                    <form>
                        {formElementArray.map(element=>{
                           return  <Input key={element.id} elementType={element.config.elementType}
                                    elementConfig={element.config.elementConfig}
                                    value={element.config.value}
                                    changed={(event)=>this.inputChangedHandler(event,element.id)}/>
                        })}
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