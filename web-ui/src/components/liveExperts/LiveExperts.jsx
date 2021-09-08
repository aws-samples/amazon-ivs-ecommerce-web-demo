// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

// Stylesheets
import './LiveExperts.css';

// Mock data
import { mockLiveExperts } from '../../__test__/mocks/experts-mocks';

const LiveExperts = (props) => {
  const [expertsArr, setExperts] = useState([])

  useEffect(() => {
    const { experts } = mockLiveExperts.data;
    setExperts(experts)
  }, [])

  const handleExpertClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const generateExperts = () => {
    return (
      expertsArr.map(expert => (
        <div className="live-expert full-width mg-r-1 br-all-sm no-overflow" key={expert.id} onClick={handleExpertClick}>
          <div className="aspect-169 pos-relative">
            <img className=" live-expert-image full-width full-height pos-absolute" src={`${process.env.PUBLIC_URL}/${expert.image}`} alt={expert.id} />
          </div>
        </div>
      ))
    )
  }

  return (
    <div className="live-experts-container pos-relative">
      <div className="live-experts-title mg-b-1">
        <h3>LIVE with our Experts</h3>
      </div>
      <div className="live-experts-list grid grid--responsive grid--3">
        {generateExperts()}
      </div>
    </div>
  );
  
}

export default LiveExperts;
