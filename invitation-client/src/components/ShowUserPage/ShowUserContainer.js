import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../actions/userActions';

class ShowUserContainer extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillUnmount() {
    // clear redux store!!
  }

  render() {
    const status = this.props.user.status;
    const {message, id, username, name, bio, img_url} = this.props.user.data;

    return (
      status === 'failure' ?
        <h2>{message}</h2>
      :
        <div>
          show user {id}
          <p>Username: {username}</p>
          <p>Name: {name}</p>
          <p>Image: {img_url}</p>
          <p>Bio: {bio}</p>
        </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(getUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserContainer)