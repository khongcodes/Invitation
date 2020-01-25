import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions/userActions';
import UserForm from './UserForm';

// controlled form for user creation
class CreateUserContainer extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    bio: '',
    img_url: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)
    this.props.createUser(this.state)
  }

  render() {
    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Create a user account.</h2>
        <UserForm 
          formData = {this.state}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: userParams => dispatch(createUser(userParams))
})

export default connect(null, mapDispatchToProps)(CreateUserContainer)