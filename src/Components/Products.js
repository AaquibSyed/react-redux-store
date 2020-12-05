import "./Products.css";
import React, { Component } from "react";
import formatCurrency from "./../utils";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "./../Actions/productActions";

//export default - we are using connect function to connect to store, so ewmove export default because at the end we will export it the other way
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedProduct: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    console.log(product);
    this.setState({
      clickedProduct: product,
    });
  };

  closeModal = () => {
    this.setState({
      clickedProduct: null,
    });
  };

  render() {
    const { clickedProduct } = this.state;
    return (
      <div>
        <Fade bottom cascade duration={1000}>
          {!this.props.products ? (
            <div className="products_loading">Loading.....</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product.id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => {
                        this.openModal(product);
                      }}
                    >
                      <img
                        className="product_image"
                        alt={product.title}
                        src={product.image}
                      />
                      <p>{product.title}</p>
                    </a>
                    <div className="product_price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        className="btn primary"
                        onClick={() => this.props.addToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {this.state.clickedProduct && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <Zoom>
              <button className="btn-closemodal" onClick={this.closeModal}>
                X
              </button>
              <div className="modal_content">
                <div className="modal_logo">
                  <img
                    className="modal_image"
                    src={clickedProduct.image}
                    alt={clickedProduct.title}
                  />
                </div>
                <div className="modal_details">
                  <h2 className="modal_title">{clickedProduct.title}</h2>
                  <p>
                    <strong>Description : </strong> {clickedProduct.description}
                  </p>
                  <p>
                    <strong>Price : </strong>
                    {formatCurrency(clickedProduct.price)}
                  </p>
                  <div className="modal_sizes">
                    <p>
                      {" "}
                      <strong>Available Sizes : </strong>
                      {clickedProduct.availableSizes?.map((size) => (
                        <button className="button-sizes" key={size}>
                          {size}
                        </button>
                      ))}
                    </p>
                  </div>
                  <button
                    className="btn primary"
                    onClick={() => this.props.addToCart(clickedProduct)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

//using connect function-connect takes 2 params, first is functon that accepts state and returns an object that defines which part of redux state we will use in the connected component
//second paramater is the list of actions that component will call
//The connect function itself returns another function whuch accepts the parameter that is the name of componenct we are gong to connect the store to.
export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
