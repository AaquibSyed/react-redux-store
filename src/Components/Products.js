import React, { Component } from 'react'
import './Products.css'
import formatCurrency from './../utils';

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product=>(
                        <li key={product.id}>
                            <div className="product">
                                <a href={"#"+product._id}>
                                    <img alt={product.title}
                                     src={product.image}/>
                                     <p>{product.title}</p>
                                </a>   
                                <div className="product_price">
                                  <div>
                                      {formatCurrency(product.price)}
                                  </div>     
                                   <button className='btn primary' onClick={()=>this.props.addToCart(product)}>
                                              Add to cart
                                   </button>
                                </div>                            
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
