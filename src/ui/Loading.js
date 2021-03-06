import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Loading = ({
  text, containerClassName, textClassName, srcGif,
}) => (
  <div className={classNames('center', containerClassName)}>
    {srcGif && <img src={srcGif} alt="loading" />}
    <div className={classNames('center', textClassName)}>
      {text}
    </div>
  </div>
);

Loading.displayName = 'Loading';

Loading.defaultProps = {
  text: 'Loading...',
  containerClassName: '',
  textClassName: 'weight-700 fs17 py1',
  srcGif: null,
};

Loading.propTypes = {
  /** Text to be shown under image/gift */
  text: PropTypes.string,
  /** CSS class name of container */
  containerClassName: PropTypes.string,
  /** CSS class name of text */
  textClassName: PropTypes.string,
  /** Source to image/gift to be shown */
  srcGif: PropTypes.string,
};

export default Loading;
