import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const Spinner = ({ getStyles, cx }) => (
  <div className={cx('spinner', css(getStyles('spinner')))}>
    <svg viewBox='25 25 50 50'>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#262626" />
          <stop offset="100%" stopColor="#E6E6E6" />
        </linearGradient>
      </defs>
      <circle
        cx='50'
        cy='50'
        r='20'
        fill='none'
        strokeWidth='5'
        stroke="url(#gradient)"
        strokeMiterlimit='10'
      />
    </svg>
  </div>
)

Spinner.propTypes = {
  getStyles: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired
}

export default Spinner
