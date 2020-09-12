import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItem/ReviewItems';
import Cart from '../Cart/Cart';
import happyImages from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
     const [cart, setCart]= useState([]);
     const [orderPlace, setOrderPlace] = useState(false)
     const history = useHistory()
     const handleProceedCheckout = () =>{
       history.push('/shipment'); 
     }
     const removeProduct =(productKey) => {         
         const newCart =cart.filter(pd => pd.key !== productKey);
         setCart(newCart);
         removeFromDatabaseCart(productKey);
     }
     useEffect(() => {
         const saveCart = getDatabaseCart();
         const productKeys = Object.keys(saveCart)
         const cartProducts = productKeys.map(key =>{
          const product=fakeData.find(pd => pd.key===key)
          product.quantity =saveCart[key]
            return product;
         })
         setCart(cartProducts);
     }, []);

     let thankyou;
     if(orderPlace){
        thankyou= <img src={happyImages} alt=""/>
     }
    return (
        <div className="twin-container">
           <div className="product-container">
                {
                    cart.map(pd => <ReviewItems 
                        key = {pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItems>)
                }
                {thankyou}
           </div>
           <div className='cart-container'>
               <Cart cart={cart}>
                   <button onClick={handleProceedCheckout} className='style'>Proceed Checkout</button>
               </Cart>

           </div>
        </div>
    );
};

export default Review;