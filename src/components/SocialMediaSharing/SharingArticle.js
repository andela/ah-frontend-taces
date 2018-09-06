import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

import classes from '../../CSS/SharingArticle.css';

class SharingArticleComponent extends Component {
  render() {
    const { title, url } = this.props;
    const shareUrl = url;

    const buttonContainer = ['Demo__some-network'];
    const individualButton = ['Demo__some-network__share-button'];
    return (
      <div className={classes.Demo__container}>
        <span>Share:</span>
        <div className={buttonContainer}>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className={individualButton}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className={buttonContainer}>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className={individualButton}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className={buttonContainer}>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={shareUrl}
            className={individualButton}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    );
  }
}


SharingArticleComponent.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

SharingArticleComponent.defaultProps = {
  title: '',
  url: '',
};

export default SharingArticleComponent;
