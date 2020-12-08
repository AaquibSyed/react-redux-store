import { connect } from "react-redux";
import React, { Component } from "react";
import { filterProducts, sortProducts } from "../Actions/productActions";
import "./Filter.css";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading....</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          <strong> {this.props.filteredProducts?.length} </strong>Products
        </div>
        <div className="filter-sort">
          {" "}
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="ALL">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    sort: state.products.sort,
    size: state.products.size,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
