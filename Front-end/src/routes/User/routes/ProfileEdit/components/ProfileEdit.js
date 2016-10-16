import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import {grey400} from 'material-ui/styles/colors'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import sty from './ProfileEdit.scss'
import SubmitButton from 'components/SubmitButton'

export const ProfileEdit = ({ handleSubmit, firstName, lastName, email, gender, location, website, width, loading }) => {
  return (
    <form
      className={sty.container}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title='Profile Information'
          style={{backgroundColor: grey400}}
          titleStyle={{marginLeft: '16px', fontSize: '18px'}}
          textStyle={{fontWeight: '400'}}
        />
        <CardText expandable={false} className={sty.formBody}>
          <Textfield
            floatingLabelText='First Name'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={firstName.touched ? firstName.error : ''}
            {...firstName}
          />
          <Textfield
            floatingLabelText='Last Name'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={lastName.touched ? lastName.error : ''}
            {...lastName}
          />
          <Textfield
            floatingLabelText='Email'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={email.touched ? email.error : ''}
            {...email}
          />
          <CardText style={{padding: '10px 0px', color: grey400, fontSize: '16px', fontWeight: '300'}}>Gender</CardText>
          <RadioButtonGroup {...gender} name='gender'
            valueSelected={gender.value} defaultSelected='male'>
            <RadioButton
              defaultChecked
              value='male'
              label='Male'
            />
            <RadioButton
              value='female'
              label='Female'
            />
            <RadioButton
              value='other'
              label='Other'
            />
          </RadioButtonGroup>
          <Textfield
            floatingLabelText='Location'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={location.touched ? location.error : ''}
            {...location}
          />
          <Textfield
            floatingLabelText='Website'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={website.touched ? website.error : ''}
            {...website}
          />
        </CardText>
        <CardActions className={sty.cardActions}>
          {loading ? <div className={sty.loading}>
            <RefreshIndicator
              size={50}
              left={width <= 493 ? 135 : 221}
              top={0}
              loadingColor={'#FF9800'}
              status='loading'
            />
          </div>
           : <div className={sty.actionButtons}>
             <SubmitButton label='Save' type='primary' />
           </div>
          }
        </CardActions>
      </Card>
    </form>
  )
}

ProfileEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from redux-form
  loading: PropTypes.bool.isRequired, // from auth reducer
  width: PropTypes.number.isRequired, // from HOC DetectWidth,
  firstName: PropTypes.object.isRequired,
  lastName: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  gender: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  website: PropTypes.object.isRequired
}

export default ProfileEdit
