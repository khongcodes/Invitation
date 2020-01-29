import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editUser, updateUser, clearUser } from '../../actions/userActions';
import UserForm from '../CreateUserPage/UserForm';

class EditUserContainer extends Component {
  state = {}

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.editUser(id, this.loadUserToState);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUser(
      this.props.match.params.id,
      this.state,
      this.pushHistory
    )
  }

  loadUserToState = (userData) => {
    this.setState({
      ...userData,
      password: ''
    })
  }

  pushHistory = userResource => {
    this.props.history.push(`/user/${userResource.id}`)
  }

  render() {
    const status = this.props.user.status;

    if (status === 'failure') {
      return (<h2>{ this.props.user.data.message }</h2>);
    } else {
      return (
        <div className = 'FormContainer'>
          <h2 className = 'Form header'>Edit user account.</h2>
          <>{
            this.props.user.status === 'form error' ? <h4>Authorization failed - try entering the password again.</h4> : <></>
          }</>
          <h4></h4>
          <UserForm 
            formData = {this.state}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            submitText = {'Update user'}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  editUser: (id, callback) => dispatch(editUser(id, callback)),
  updateUser: (id, state, callback) => dispatch(updateUser(id, state, callback)),
  clearUser: () => dispatch(clearUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer)