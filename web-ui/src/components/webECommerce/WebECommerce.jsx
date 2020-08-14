// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { Component } from 'react';
import * as config from '../../config';

// Components
import Navigation from '../navigation/Navigation';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import ProductList from '../productList/ProductList';
import LiveExperts from '../liveExperts/LiveExperts';

// Styles
import './WebECommerce.css';

class WebECommerce extends Component {
  constructor(props) {
    super();
    this.state = {
      currentProductId: '',
      showModal: false
    };
  }

  setCurrentProductId = (currentProductId) => {
    this.setState({ currentProductId });
  }

  setModal = (val) => {
    this.setState({ showModal: val });
  }

  handleECommerceOnClick = () => {
    if (this.state.showModal) {
      this.setModal(false);
    }
  }

  render() {
    const details = this.state.showModal ? 'details' : '';
    return (
      <div className={`web-ecommerce-container full-width full-height ${details}`} onClick={this.handleECommerceOnClick}>
        <Navigation />
        <div className="web-ecommerce-content pd-2 grid fl fl-j-center">
          <div className="video-product-content">
            <VideoPlayer setMetadataId={this.setCurrentProductId} videoStream={config.DEFAULT_VIDEO_STREAM} />
            <ProductList
              currentProductId={this.state.currentProductId}
              setModal={this.setModal}
              showModal={this.state.showModal}
            />
            <LiveExperts />
          </div>
        </div>
      </div>
    )
  }
}

export default WebECommerce;
