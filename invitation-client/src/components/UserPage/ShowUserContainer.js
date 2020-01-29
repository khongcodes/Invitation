import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import proxy from '../../setupProxy';
import { getUser, clearUser } from '../../actions/userActions';
import '../../style/User.css'

class ShowUserContainer extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  renderEvents = events => {
    if (events) {
      return (
        <ul>
          {events.map(event => (
            <li key={event.id}><Link to={`/event/${event.id}`} >
              {event.title || 'untitled event'}
            </Link></li>
          ))}
        </ul>
      )
    }
  }

  render() {
    const status = this.props.user.status;
    const {message, id, username, name, bio, img_url, events} = this.props.user.data;

    if (status === 'failure') {
      return (<h2>{ message }</h2>);
    } else {
      return (
        <>
          <p>Username: {username}</p>
          <p>Name: {name}</p>
          <p><img className='user-image' src={img_url}/></p>
          <p>Bio: {bio}</p>
          {this.renderEvents(events)}
          {this.props.user.authorize ?
            <Link to={`/user/${id}/edit`} >
              <button>Edit User</button>
            </Link>
          : <></>}
        </>
      )
    }
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  getUser: id => dispatch(getUser(id)),
  clearUser: () => dispatch(clearUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserContainer)