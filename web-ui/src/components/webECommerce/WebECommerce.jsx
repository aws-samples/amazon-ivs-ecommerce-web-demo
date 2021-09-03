// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import * as config from '../../config';

// Components
import Navigation from '../navigation/Navigation';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import ProductList from '../productList/ProductList';
import LiveExperts from '../liveExperts/LiveExperts';

// Styles
import './WebECommerce.css';

const WebECommerce = () => {

  const [currentProductId, setCurrentProductId] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleECommerceOnClick = () => {
    if (showModal) {
      setShowModal(false);
    }
  }

  const details = showModal ? 'details' : '';
  return (
    <div className={`web-ecommerce-container full-width full-height ${details}`} onClick={handleECommerceOnClick}>
      <Navigation />
      <div className="web-ecommerce-content pd-2 grid fl fl-j-center">
        <div className="video-product-content">
          <VideoPlayer setMetadataId={setCurrentProductId} videoStream={config.DEFAULT_VIDEO_STREAM} />
          <ProductList
            currentProductId={currentProductId}
            setModal={setShowModal}
            showModal={showModal}
          />
          <LiveExperts />
        </div>
      </div>
    </div>
  )
}

export default WebECommerce;
