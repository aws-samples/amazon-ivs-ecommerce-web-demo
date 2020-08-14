// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React,  {useState } from 'react';

// Stylesheets
import './Navigation.css';

// Assets
import logo from '../../assets/ACME-logo.svg';
import user_logo from '../../assets/profile-pic@2x.png';
import shopping_cart from '../../assets/shopping-icon.svg';

const Navigation = () => {
  const [search, updateSearch] = useState('');

  const handleSearch = e => {
    updateSearch(e.target.value);
  }

  return (
    <div className="navigation grid grid--3">
      <div className="pd-l-2 fl-a-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="fl fl-a-center fl-j-center">
        <input className="nav-search__input rounded full-width pd-x-1" type="search" onChange={handleSearch} placeholder="Search products" name="search" autoComplete="off" value={search} />
      </div>
      <div className="fl fl-a-center fl-j-end pd-r-2">
        <img className="mg-r-2 nav-cart-icon" src={shopping_cart} alt="shopping cart" />
        <img className="nav-avatar" src={user_logo} alt="user logo" />
      </div>
    </div>
  )
}

export default Navigation;
