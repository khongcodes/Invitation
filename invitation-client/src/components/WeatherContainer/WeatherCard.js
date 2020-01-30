import React, { Component } from 'react'

import { handleRenderDate, handleRenderTime, convertCompiledDateTime } from '../handleDateTimeLocation'

export default class WeatherCard extends Component {
  componentDidMount() {
    // const {lat, lng} = this.props.location.location;
    // const dateTimeMilliseconds = convertCompiledDateTime(this.props.date, this.props.time)
    // fetch(`/forecast/719a610df11e5fbabdf3c4290515d014/${lat},${lng},${dateTimeMilliseconds/1000}`)
    // .then(response => console.log(response))
    // .then(data => {
    //   console.log(data)
    // })
  //   .catch(error=>console.log(error))
  }

  render() {
    console.log(new Date(this.props.date))
    console.log(this.props.time)
    return (
      <div>
        <p>location label: {this.props.location.label}</p>
        <p>date: {handleRenderDate(this.props.date)}</p>
        <p>time: {handleRenderTime(this.props.time)}</p>
      </div>
    )
  }
}
