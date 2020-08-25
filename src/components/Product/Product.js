import React from 'react';
import './Product.css';
const Product = (props) => {
    //console.log(props);
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4>                
                <p><small>By : {seller}</small></p>
                <h4><small>${price}</small></h4>
                <p><small>stock in : {stock}</small></p>

                <button className='style'
                onClick={() =>props.handleAddProduct(props.product)}                
                >Add to cart
                </button>
            </div>
            
        </div>
    );
};

export default Product;