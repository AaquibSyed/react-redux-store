import './Cart.css'

import React, { Component } from 'react'
import formatCurrency from './../utils';

export default class Cart extends Component {
    render() {
        const {cartItems,removeFromCart,getTotal} = this.props;
        return (
            <div className='cart-main'>
                {cartItems.length===0?
                <div className="cart cart-header">Cart is empty...</div>:
                <div className="cart cart-header">You have <strong>{cartItems.length}</strong> items in the cart.</div>
                }                
               <div className="cart">                  
                      {
                          cartItems.map((item)=>( 
                              <div className="cart-items" key={item._id}>
                                        <div>
                                           <a href={"#"+item._id}>
                                              <img className="cart-image" src={item.image} alt={item.title}/>
                                            </a> 
                                       </div>                                            
                                       <div className="cart-title">
                                          <strong>{item.title}</strong>
                                          <small className='cart-cost'> 
                                              <strong> {formatCurrency(item.price)}*{item.count}
                                              </strong> 
                                              <button
                                               onClick={()=>removeFromCart(item)}
                                               className='btn-remove'>Remove from cart</button>
                                           </small> 
                          
                                      </div>                                            
                                </div>                   
                          ))
                      }                 
             </div>
             {
                 cartItems.length>0 && (
                    <div className="cart-total">
                       <p>Total : <strong>{formatCurrency(getTotal())}</strong></p>
                       <button className='btn primary'>Proceed to checkout</button>
                    </div>
                 )
             }
             
            </div>
        )
    }
}
