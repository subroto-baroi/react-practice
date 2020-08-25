import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart =props.cart
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }
     let shipping = 0;
     if (total>35) {
         shipping = 0;   
     }else if(total>15){
         shipping = 4.99;
     }else if (total>0){
         shipping = 12.99;
     }

     const Tax = total / 10;
     const grandTotal = (total + shipping + Tax);
     const formatNumber=num =>{
         const precision =num.toFixed(2);
         return Number(precision);
     }


    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <h4>Items Order : {cart.length}</h4>
            <p>Product Price :${formatNumber(total)} </p>
            <p>Shipping Cost :${shipping} </p>
            <p>Tax + Vat : ${formatNumber(Tax)} </p>
            <p>Total Price : ${formatNumber(grandTotal)} </p>
        </div>
    );
};

export default Cart;