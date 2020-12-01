import React from 'react';
import data from './data.json';

import './App.css';
import Products from './Components/Products';
import Filter from './Components/Filter';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      size : "",
      sort:""
    }
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
              <Products products={this.state.products}/>
            </div>
            <div className="sidebar">
              cart items
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
