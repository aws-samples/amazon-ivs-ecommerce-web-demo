// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config';

// Components
import Modal from '../modal/Modal';

// Mock data
import { mockProductList } from '../../__test__/mocks/products-mocks';

// Styles
import './ProductList.css';

class ProductList extends Component {
  constructor(props) {
    super();
    this.state = {
      productId: '',
      products: []
    }
  }

  componentDidMount() {
    if (config.USE_MOCK_DATA) {
      const { products } = mockProductList.data;
      this.setState({ products });
    } else {
      const url = config.GET_PRODUCTS_API;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      };

      fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const products = [];
        for (let i=0; i<data.Items.length; i++) {
          // parse product details based on their types (S=string, N=Number)
          const product = {
            "id": data.Items[i].id.S || data.Items[i].id.N || data.Items[i].id,
            "name": data.Items[i].name.S || data.Items[i].name.N || data.Items[i].name,
            "imageUrl": data.Items[i].imageUrl.S || data.Items[i].imageUrl.N || data.Items[i].imageUrl,
            "imageLargeUrl": data.Items[i].imageLargeUrl.S || data.Items[i].imageLargeUrl.N || data.Items[i].imageLargeUrl,
            "price": data.Items[i].price.S || data.Items[i].price.N || data.Items[i].price,
            "discountedPrice": data.Items[i].discountedPrice.S || data.Items[i].discountedPrice.N || data.Items[i].discountedPrice,
            "longDescription": data.Items[i].longDescription.S || data.Items[i].longDescription.N || data.Items[i].longDescription,
          }
          products.push(product);
        }

        // sort by ID in ascending order
        products.sort((a, b) => {
          return (a.id - b.id)
        })

        // save the products in local store
        this.setState({ products });
      })
      .catch(() => {
        console.log('Error');
      });
    }
  }

  componentDidUpdate = () => {
    this.scrollToCurrentProduct();
  }

  handleProductClick = (productId) => {
    this.setState({ productId });
    this.props.setModal(true);
  }

  renderProductList = () => {
    const { products } = this.state;
    const { currentProductId } = this.props;
    return (
      products.map(product => {
        const { id, name, price, discountedPrice } = product;
        let { imageUrl } = product;

        // if using mock data, refernce the images in the public folder
        if (config.USE_MOCK_DATA) {
          imageUrl = `${process.env.PUBLIC_URL}/${imageUrl}`;
          console.log(imageUrl);
        }

        const current = (currentProductId && currentProductId === id) ? 'product-current' : '';
        const onSale = (price !== discountedPrice) ? 'product-onsale' : '';

        return (
          <div className={`product fl-shrink-0 pd-05 fl fl-nowrap br-all-sm ${current}`} key={id} onClick={() => this.handleProductClick(id)}>
            <div className="product-img no-overflow br-all-sm fl-shrink-0">
              <img src={imageUrl} alt={id} />
            </div>
            <div className="product-name pd-r-1 mg-l-1 fl fl-column fl-wrap fl-j-between fl-shrink-1">
              <div className="line-clamp-2">{name}</div>
              <div className={`product-price-wrapper ${onSale}`}>
                <span className="product-price">{`$${price}`}</span>
                {onSale && (
                  <span className="product-discounted-price">{`$${discountedPrice}`}</span>
                )}
              </div>
            </div>
          </div>
        )
      })
    )
  }

  scrollToCurrentProduct = () => {
    const element = document.getElementsByClassName("product-current");
    if (element.length) {
      element[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }

  closeModal = () => {
    this.props.setModal(false);
  }

  render() {
    const { productId, products } = this.state;
    const { showModal } = this.props;
    return (
      <div className="products-container bg-alt br-all pd-1">
        <div className="product-list fl fl-nowrap bg-alt br-all">
          {this.renderProductList()}
        </div>
        {showModal && (
          <Modal productId={productId} closeModal={this.closeModal} products={products} />
        )}
      </div>
    );
  }
}

ProductList.propTypes = {
  currentProductId: PropTypes.string,
  setModal: PropTypes.func,
  showModal: PropTypes.bool,
};

export default ProductList;
