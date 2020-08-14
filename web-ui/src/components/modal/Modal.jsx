// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config';

// Stylesheets
import "./Modal.css";

// Assets
import close_icon from '../../assets/cancel-24px.svg';

const Modal = ({
  productId,
  closeModal,
  products,
}) => {
  // only show details of selected product
  const details = products.filter(product => product.id === productId);

  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) { // keyCode 27 is Esc char
      closeModal();
    }
  }, []);

  useEffect(() => {
    // add listener for Esc to close modal
    document.addEventListener("keydown", escFunction);

    return () => {
      // upon closing modal, remove listener
      document.removeEventListener("keydown", escFunction);
    };
  }, []);

  const handleModalOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const { id, name, price, discountedPrice, longDescription } = details[0];
  let { imageLargeUrl } = details[0];

  // if using mock data, reference the image in the public folder
  if (config.USE_MOCK_DATA) {
    imageLargeUrl = `${process.env.PUBLIC_URL}/${imageLargeUrl}`;
  }

  const buyNowPrice = discountedPrice || price;

  return (
    <div className="modal pos-absolute" onClick={handleModalOnClick}>
    <div className="modal__overlay" onClick={closeModal}></div>
      <div className="modal__el pd-0">
        <div className="modal-product-image br-all-sm"><img src={imageLargeUrl} alt={id} /></div>
        <div className="pd-3">
          <div className="modal-product-name mg-b-1">{name}</div>
          <div className="modal-product-description mg-b-25">{longDescription}</div>
          <div className="modal-product-actions">
            <button className="modal-product-buy-now btn btn--primary full-width">
              <span className="modal-product-buy-now__price mg-r-05">{`$${buyNowPrice}`}</span>
              <span>Buy Now</span>
            </button>
          </div>
        </div>
        <div className="modal-close pos-absolute"><img src={close_icon} onClick={closeModal} alt="close" /></div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  productId: PropTypes.string,
  closeModal: PropTypes.func,
  products: PropTypes.array,
};

export default Modal;
