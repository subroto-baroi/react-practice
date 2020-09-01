import React from 'react';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewStyle={
        borderBottom:'1px solid black',
        margin:'20px',
        padding:'5px',         
        color:'blue'
    };
    return (
        <div style={reviewStyle}>
            <h4>{name}</h4>
            <h6>Quantity:{quantity}</h6>
            <p><small>${price}</small></p>
            <br/> <br/>
            <button className='style'
            onClick={() => props.removeProduct(key)}
            >Remove Items</button>
        </div>
    );
};

export default ReviewItems;