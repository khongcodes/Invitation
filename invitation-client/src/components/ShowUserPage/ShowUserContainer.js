import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowUserContainer extends Component {
  render() {
    return (
      <div>
        show user {this.props.match.params.id}
        <p></p>
      </div>
    )
  }
}

export default ShowUserContainer