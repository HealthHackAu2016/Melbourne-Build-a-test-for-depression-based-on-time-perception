import React, { PropTypes } from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'
import IconButton from 'material-ui/IconButton'

import sty from './SocialShareButtons.scss'
const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')

export default function SocialShareButtons ({question}) {
  return (
    <div className={sty.socialButtons}>
      <FacebookShareButton
        url={window.location}
        title={question}
        className={sty.socialButtons}>
        <IconButton
          tooltip='Share with Facebook'
          touch
          tooltipPosition='top-center'>
          <FacebookIcon
            className={sty.button}
            size={32}
            round />
        </IconButton>
      </FacebookShareButton>
      <GooglePlusShareButton
        url={window.location}
        title={question}
        className={sty.socialButtons}
      >
        <IconButton
          tooltip='Share with Google'
          touch
          tooltipPosition='top-center'>
          <GooglePlusIcon
            className={sty.button}
            size={32}
            round />
        </IconButton>
      </GooglePlusShareButton>
      <TwitterShareButton
        url={window.location}
        title={question}
        className={sty.socialButtons}
      >
        <IconButton
          tooltip='Share with Twitter'
          touch
          tooltipPosition='top-center'>
          <TwitterIcon
            className={sty.button}
            size={32}
            round />
        </IconButton>
      </TwitterShareButton>
    </div>
  )
}

SocialShareButtons.propTypes = {
  question: PropTypes.string.isRequired
}
