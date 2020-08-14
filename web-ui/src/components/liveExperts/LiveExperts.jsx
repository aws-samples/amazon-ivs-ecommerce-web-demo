// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { Component } from 'react';

// Stylesheets
import './LiveExperts.css';

// Mock data
import { mockLiveExperts } from '../../__test__/mocks/experts-mocks';

class LiveExperts extends Component {
  constructor(props) {
    super();
    this.state = {
      experts: [],
    }
  }

  componentDidMount() {
    const { experts } = mockLiveExperts.data;
    this.setState({ experts });
  }

  handleExpertClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  generateExperts = () => {
    const { experts } = this.state;
    return (
      experts.map(expert => (
        <div className="live-expert full-width mg-r-1 br-all-sm no-overflow" key={expert.id} onClick={this.handleExpertClick}>
          <div className="aspect-169 pos-relative">
            <img className=" live-expert-image full-width full-height pos-absolute" src={`${process.env.PUBLIC_URL}/${expert.image}`} alt={expert.id} />
          </div>
        </div>
      ))
    )
  }

  render() {
    return (
      <div className="live-experts-container pos-relative">
        <div className="live-experts-title mg-b-1">
          <h3>LIVE with our Experts</h3>
        </div>
        <div className="live-experts-list grid grid--responsive grid--3">
          {this.generateExperts()}
        </div>
      </div>
    );
  }
}

export default LiveExperts;
