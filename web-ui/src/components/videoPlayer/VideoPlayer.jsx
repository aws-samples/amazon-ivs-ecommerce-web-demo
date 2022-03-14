// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as config from '../../config';

// Styles
import './VideoPlayer.css';

const VideoPlayer = (props) => {
  const [hover, setHover] = useState(false)
  const maxMetaData = 10;
  const [metaData, setMetaData] = useState([]);

  const mediaPlayerScriptLoaded = () => {
    // This shows how to include the Amazon IVS Player with a script tag from our CDN
    // If self hosting, you may not be able to use the create() method since it requires
    // that file names do not change and are all hosted from the same directory.

    const MediaPlayerPackage = window.IVSPlayer;

    // First, check if the browser supports the Amazon IVS player.
    if (!MediaPlayerPackage.isPlayerSupported) {
        console.warn("The current browser does not support the Amazon IVS player.");
        return;
    }

    const PlayerState = MediaPlayerPackage.PlayerState;
    const PlayerEventType = MediaPlayerPackage.PlayerEventType;

    // Initialize player
    const player = MediaPlayerPackage.create();
    player.attachHTMLVideoElement(document.getElementById("video-player"));

    // Attach event listeners
    player.addEventListener(PlayerState.PLAYING, () => {
        console.log("Player State - PLAYING");
    });
    player.addEventListener(PlayerState.ENDED, () => {
        console.log("Player State - ENDED");
    });
    player.addEventListener(PlayerState.READY, () => {
        console.log("Player State - READY");
    });
    player.addEventListener(PlayerEventType.ERROR, (err) => {
        console.warn("Player Event - ERROR:", err);
    });
    player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
        console.log('Timed metadata: ', cue.text);
        const metadataText = JSON.parse(cue.text);
        const productId = metadataText['productId'];
        props.setMetadataId(productId);
        const metadataTime = player.getPosition().toFixed(2);

        let metaD = metaData;
        // only keep max 5 metadata records
        if (metaD.length > maxMetaData) {
          metaD.length = maxMetaData;
        }
        // insert new metadata
        metaD.unshift(`productId: ${productId} (${metadataTime}s)`);
        setMetaData(metaD)
    });

    // Setup stream and play
    player.setAutoplay(true);
    player.load(config.DEFAULT_VIDEO_STREAM);
    player.setVolume(0.5);
  }
  
  useEffect(() => {
    const mediaPlayerScript = document.createElement("script");
    mediaPlayerScript.src = "https://player.live-video.net/1.8.0/amazon-ivs-player.min.js";
    mediaPlayerScript.async = true;
    mediaPlayerScript.onload = () => mediaPlayerScriptLoaded();
    document.body.appendChild(mediaPlayerScript);
  }, [])


  const renderMetaData = () => {
    const metaDataItems = metaData.map(element => (
      <div className="video-metadata-item" key={element}>{element}</div>
    ));
    return (
      <div className="video-metadata-container pd-x-1 pd-y-05 pos-absolute bg-inverted br-all-sm color-inverted">
        {metaDataItems}
      </div>
    )
  }

  return (
    <div
      className="video-container pos-relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && renderMetaData()}
      <div className="aspect-169 pos-relative full-width full-height">
        <video id="video-player" className="video-elem br-all pos-absolute full-width" playsInline muted></video>
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  setMetadataId: PropTypes.func,
  videoStream: PropTypes.string,
};

export default VideoPlayer;
