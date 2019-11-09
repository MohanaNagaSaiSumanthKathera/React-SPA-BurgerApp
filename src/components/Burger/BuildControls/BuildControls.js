import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'} 
];

const BuildControls =(props)=>{
   return <div className={classes.BuildControls}>
        {controls.map((ctrl)=>{
           return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
           />;
        })}
    </div>
}

export default BuildControls;