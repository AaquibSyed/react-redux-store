<<<<<<< HEAD

//feature-1 new git ranch to test

=======
import React from 'react';
import data from './data.json';
>>>>>>> 065cd4570322caeb8e57248dc755a246c16e645a
import './App.css';
import Products from './Components/Products';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      size : "",
      sort:""
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
