import React, { Component } from 'react'
import './Products.css'
import formatCurrency from './../utils';
import Fade  from 'react-reveal/Fade'
import Modal from 'react-modal'

export default class Products extends Component {
    constructor(props){
        super(props);      
        this.state={
            clickedProduct:null
        }
    }
      productClicked = (product)=>{
          console.log(product)
          this.setState({
              clickedProduct:product,
          })
      }

      closeModal=()=>{
        this.setState({
            clickedProduct:null,
        })
      }
    render() {
        const {clickedProduct} = this.state
        return (
            <div>
                <Fade bottom cascade duration={1000}>
                <ul className="products">
                    {this.props.products.map(product=>(
                        <li key={product.id}>
                            <div className="product">
                                <a href={"#"+product._id} onClick={()=>{this.productClicked(product)}}>
                                    <img
                                     className="product_image"
                                     alt={product.title}
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
                </Fade>
                {
                    this.state.clickedProduct && (
                      
                            <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
                                <button
                                 className='btn-closemodal' onClick={this.closeModal}>X</button>
                                 <div className="modal_content">
                                     <div className="modal_logo">
                                         <img  className="modal_image" src={clickedProduct.image} alt={clickedProduct.title}/>
                                     </div>
                                     <div className="modal_details">
                                           <h2 className="modal_title">{clickedProduct.title}</h2>                                           
                                            <p><strong>Description : </strong> {clickedProduct.description}</p>
                                           <p><strong>Price : </strong>{formatCurrency(clickedProduct.price)}</p>
                                           <div className="modal_sizes">
                                             <p> <strong>Available Sizes : </strong>
                                             {
                                                 clickedProduct.availableSizes?.map((size)=>(
                                                 <button className="button-sizes" key={size}>{size}</button>
                                                 ))
                                             }
                                             </p>
                                           </div>
                                           <button className="btn primary"
                                           onClick={()=>this.props.addToCart(clickedProduct)}
                                           >Add to cart</button>
                                     </div>
                                 </div>
                               
                           </Modal>
                       
                        

                    )
                }
            </div>
        )
    }
}
