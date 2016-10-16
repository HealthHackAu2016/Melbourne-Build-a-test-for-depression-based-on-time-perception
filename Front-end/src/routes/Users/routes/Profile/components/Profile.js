import React, { PropTypes } from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import { small } from 'utils/windowsize.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {List, ListItem} from 'material-ui/List'
import {blue50, darkBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import sty from './Profile.scss'
import moment from 'moment'
import {Link} from 'react-router'

export const Profile = ({firstName, lastName, polls, width, loading, onPollDelete, isOwner}) => {
  const rightDeleteIcon = (value) => (
    <IconButton
      tooltip='Delete Poll '
      touch
      tooltipPosition='top-center'
      style={{top: '14px'}}
      value={value}
      onTouchTap={onPollDelete}
    >
      <DeleteIcon />
    </IconButton>
  )

  const pollListItems = polls.map((poll, index) => {
    const totalVotes = poll.voters.length
    return <Link to={`/poll/${poll._id}`} style={{textDecoration: 'none'}}>
      <ListItem
        key={index}
        // slight edge case when the delete button is shown to polls owner if they logout and press back button
        rightIconButton={isOwner ? rightDeleteIcon(poll._id) : ''}
        primaryText={poll.question}
        style={{borderBottom: `0.3px solid ${blue50}`}}
        secondaryText={
          <p>
            <span style={{color: darkBlack}}>{`Total votes: ${totalVotes}`}</span><br />
            {`Created ${moment(poll.createdAt).fromNow()}`}
          </p>
        }
        secondaryTextLines={2}
      />
    </Link>
  })

  const spinner = <div className={sty.loading}>
    <RefreshIndicator
      size={50}
      left={width < small ? 135 : 221}
      top={0}
      loadingColor={'#FF9800'}
      status='loading'
    />
  </div>

  return <div className={sty.container}>
    <Card className={sty.card}>
      <CardTitle
        title={polls.length === 0 ? `${firstName} ${lastName} currently doesn't have any polls` : `Polls created by: ${firstName} ${lastName}`}
        className={sty.question}
        subtitle={`Total Polls: ${polls.length}`}
      />
      <CardText
        className={sty.actionDiv}
        style={isOwner ? '' : {textAlign: 'center'}}
      >
        {loading.type === 'fetch' || loading.type === 'delete' && loading.status ? spinner : <List>{pollListItems}</List>}
      </CardText>
    </Card>
  </div>
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  polls: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  loading: PropTypes.object.isRequired,
  onPollDelete: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired
}

export default Profile
