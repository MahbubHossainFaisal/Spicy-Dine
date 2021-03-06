
import React, { useContext,useState } from 'react'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout  from './Checkout'
import classes from './Cart.module.css'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `${cartCtx.totalAmount} BDT.`
    const hasItem = cartCtx.items.length > 0

    const addCartItemHandler =(item) =>{
        cartCtx.addItem({...item,amount:1})
    }
    const removeCartItemHandler = (id) =>{
        cartCtx.removeItem(id)
    }

    const submitOrderHandler = (userData) =>{
        fetch('https://meals-4e5a1-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => (
        <CartItem key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={addCartItemHandler.bind(null,item)}
        onRemove={removeCartItemHandler.bind(null,item.id)}
        />
    ))}</ul>

    const onOrder = () =>{
        setIsCheckout(true)
    }
    const modalActions = (

        <div className={classes.actions}>
            <button className={classes['btn--alt']} onClick={props.onClose}>Close</button>
            {hasItem && <button className={classes.button} onClick={onOrder}>Order</button>}

        </div>
    )
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel={props.onClose} />}
           {!isCheckout && modalActions}
        </Modal>
    )
}

export default Cart
