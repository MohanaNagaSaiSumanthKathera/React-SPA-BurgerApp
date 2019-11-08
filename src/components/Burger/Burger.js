import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
const Burger =()=>{
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            <BurgerIngredient type='bacon'/>
            <BurgerIngredient type='cheese'/>
            <BurgerIngredient type='salad'/>
            <BurgerIngredient type='meat'/>
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default Burger;