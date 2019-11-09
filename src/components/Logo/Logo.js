import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) =>{
    return <div className={classes.Logo} style={{height: props.height}}> 
                <img src={BurgerLogo} alt="MyBurger"/>
            </div>
}

export default Logo;