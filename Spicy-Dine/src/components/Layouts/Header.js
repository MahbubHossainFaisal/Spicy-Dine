import React from 'react'
import restaurantImage from '../../assets/restautant-img.jpg'
import classes from './Header.module.css'


const Header = () =>{

    return <React.Fragment>
        <header className={classes.header}>
            <h1>SPICY DINE</h1>
            <button>Cart</button>
        </header>
        <div className={classes['main-image']}>
            <img src={restaurantImage} alt='Preview of the restaurant'/>
        </div>
    </React.Fragment>
}

export default Header