import './Cart.css'
import Fade  from 'react-reveal/Fade'
import React, { Component } from 'react'
import formatCurrency from './../utils';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            showCheckout:false,
            name:'',
            email:'',
            address:''
        }
    }
    render() { 
        const {cartItems,removeFromCart,getTotal,createOrder} = this.props;      
        const inputEntered = (e)=>{
             this.setState({
                 [e.target.name]:e.target.value
             })
        }

        const ReadyOrder =(e)=>{
          e.preventDefault();
          const order ={
              name:this.state.name,
              email:this.state.email,
              address:this.state.address,
              orderItems:cartItems           
          }
          createOrder(order)
        }

        
        return (
            <div className='cart-main'>
                {cartItems.length===0?
                <div className="cart cart-header">Cart is empty...</div>:
                <div className="cart cart-header">You have <strong>{cartItems.length}</strong> items in the cart.</div>
                }                
               <div className="cart">                  
                      {
                          cartItems.map((item)=>( 
                              <Fade left>
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
                                </Fade>                 
                          ))
                      }                 
             </div>
             {
                 cartItems.length>0 && (
                    <div className="cart-total">
                       <p>Total : <strong>{formatCurrency(getTotal())}</strong></p>
                       <button 
                       onClick={()=>{this.setState({
                           showCheckout:true
                       })}}
                       className='btn primary'>Proceed to checkout</button>
                    </div>
                 )
             }
             {
                 this.state.showCheckout && cartItems.length>0 &&(
                     <Fade top cascade duration={500}>
                     <div className="cart-form">
                         <form onSubmit={ReadyOrder}>                            
                              <ul className="form-container">
                                  <li>
                                      <label>NAME: </label>
                                       <input type="text"
                                         required
                                         name='name'
                                         onChange={inputEntered}
                                        />
                                  </li>
                                  <li>
                                  <label>EMAIL: </label>
                                       <input type="email"
                                         name='email'
                                         required
                                         onChange={inputEntered}
                                       />
                                  </li>
                                  <li>
                                  <label>ADDRESS: </label>
                                       <input type="text"
                                              name='address'
                                              required
                                              onChange={inputEntered}
                                        />
                                  </li>
                                  <li>
                                   <button type="submit" className="btn primary checkout">Checkout</button>
                                  </li>
                              </ul>
                         </form>
                     </div>
                     </Fade>
                 )
             }             
            </div>
        )
    }
}
