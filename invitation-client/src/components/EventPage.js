import React, { Component } from 'react'

export default class EventPage extends Component {

  logProps = () => {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        test event
        {this.props.match.params.id}
        {/* load event info here */}
      </div>
    )
  }
}
