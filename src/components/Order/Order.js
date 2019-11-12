import React from 'react';
import classes from './Order.css';

const Order=(props)=>{
    const ingredients=[];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    console.log(ingredients);
    const outputIngredients= ingredients.map(obj=>{
        return <span style={{
                                textTransform:'capitalize',
                                display:'inline-block',
                                margin:'0 8px',
                                border:'1px solid #ccc',
                                padding:'5px'
                            }}
                    key={obj.name}>{obj.name}({obj.amount})</span>
     
    });
    console.log(outputIngredients);
    return(
        <div className={classes.Order}>
            <p>Ingredients:{outputIngredients}</p>
            <p>Price: <strong>INR {Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
    );
}

export default Order;