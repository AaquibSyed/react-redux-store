import React from 'react';
import data from './data.json';

import './App.css';
import Products from './Components/Products';
import Filter from './Components/Filter';
import Cart from './Components/Cart';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      size : "",
      sort:"",
      cartItems : localStorage.getItem("cartItemsLocal")?JSON.parse(localStorage.getItem("cartItemsLocal")) : []
    }
  }
  addToCart=(product)=>{
      const _cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
       _cartItems.forEach((item)=>{
         if(item._id===product._id){          
           item.count++;
           alreadyInCart = true;    
         }    
       })
       if(!alreadyInCart){
         _cartItems.push({
           ...product,count:1
         })
       }
       this.setState({
         cartItems:_cartItems
       })
       localStorage.setItem("cartItemsLocal",JSON.stringify(_cartItems))
  }

  sortProducts=(event)=>{
   console.log(event.target.value)
   const sortValue= event.target.value;
   this.setState({
     sort:sortValue,
     products:this.state.products.slice().sort((a,b)=>(
       sortValue==='lowest'?(a.price > b.price?1:-1):
       sortValue==='highest'?(a.price < b.price?1:-1):
       (a._id<b._id?1:-1)
     ))
   })
  }

  filterProducts =(event)=>{
    if((event.target.value==="")||(event.target.value==="ALL")){
      this.setState({
      size:event.target.value,
      products:data.products,
      })
    }else{
      this.setState({
        size:event.target.value,
        products:data.products.filter(product=>product.availableSizes.indexOf(event.target.value)>=0)
      })
    }
  }
  removeFromCart = (product)=>{
    let newCartItems=this.state.cartItems.slice().filter((item)=>item._id!==product._id)    
    this.setState({
      cartItems:newCartItems
    })
    localStorage.clear();
    localStorage.setItem("cartItemsLocal",JSON.stringify(newCartItems))    
  }

  getTotal = ()=>(
    this.state.cartItems.reduce((a,c)=>(a+(c.count*c.price)),0)
  )
  createOrder = (order)=>{
    
   alert(`order placed for ${order.name}`)
  }

  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                 size={this.state.size}
                 sort={this.state.sort}
                 filterProducts= {this.filterProducts}
                 sortProducts={this.sortProducts}/>
              <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} 
              removeFromCart={this.removeFromCart}
              getTotal={this.getTotal}
              createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          All rights reserved
        </footer>
      </div>
     );
  } 
}

export default App;
