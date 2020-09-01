import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
const Product = (props) => {
    console.log(props);
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4><Link to = {"/product/" + key} class>{name}</Link></h4>                
                <p><small>By : {seller}</small></p>
                <h4><small>${price}</small></h4>
                <p><small>stock in : {stock}</small></p>

                {props.showAddToCart && <button className='style'
                onClick={() =>props.handleAddProduct(props.product)}                
                >Add to cart
                </button>}
            </div>
            
        </div>
    );
};

export default Product;