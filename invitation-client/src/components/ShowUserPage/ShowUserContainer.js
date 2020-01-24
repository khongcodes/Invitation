import React, { Component } from 'react'

class ShowUserContainer extends Component {
  render() {
    return (
      <div>
        show user {this.props.match.params.id}
      </div>
    )
  }
}

export default ShowUserContainer