import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadLocation } from '../handleDateTimeLocation';
import WeatherCard from './WeatherCard';

class WeatherContainer extends Component {
  
  // componentDidMount() {
  //   const location = handleReadLocation(this.props.event.data.location);
  //   console.log(this.props)
  //   if (location.location) {
  //     console.log('worked')
  //   }
  //   fetch('https://api.weather.gov/points/39.7456,-97.0892')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  // }
  
  render() {
    // console.log(handleReadLocation(this.props.event.data.location))
    if (typeof handleReadLocation(this.props.event.data.location) === 'object') {
      return (
        <WeatherCard 
          location = {handleReadLocation(this.props.event.data.location)} 
          date = {this.props.event.data.date}
          time = {this.props.event.data.time}
        />
      )
    } else {
      return (
        <div>
          Weather could not be loaded for this location.
        </div>
      )
    }
  }
}

const mapStateToProps = ({event}) => ({event})

export default connect(mapStateToProps)(WeatherContainer)