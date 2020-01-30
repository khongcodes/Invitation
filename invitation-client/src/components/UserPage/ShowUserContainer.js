import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <>
          <h4 className='events-list-title'>Events</h4>
          <ul>
            {events.map(event => (
              <li key={event.id}><Link to={`/event/${event.id}`} >
                {event.title || 'untitled event'}
              </Link></li>
            ))}
          </ul>
        </>
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
        <div className='User'>
          <p><img className='image' src={img_url} alt={username} /></p>
          <h2 className='name'>{name}</h2>
          <p className='username'>Username: {username}</p>
          
          <p className='bio-title'>Bio:</p>
          <p className='bio-content'>{bio}</p>

          {this.renderEvents(events)}
          {this.props.user.authorize ?
            <Link to={`/user/${id}/edit`} >
              <button className='edit-user'>Edit User</button>
            </Link>
          : <></>}
        </div>
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