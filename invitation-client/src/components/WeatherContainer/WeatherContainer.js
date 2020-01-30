import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadLocation } from '../handleDateTimeLocation';
import WeatherCard from './WeatherCard';

class WeatherContainer extends Component {
  
  // state is kept in WeatherCard - in order to do async fetching on componentDidMount,
  // event needs to be loaded from store in a container and passed to child as a prop
  // console.log(this.props) on componentDidMount will show that event is undefined
  // proof below

  // componentDidMount() {
  //   if (this.props.event.data.location) {
  //     console.log('event loaded')
  //   } else {
  //     console.log('event not loaded')
  //   }

  //   console.log(this.props.event.data.location)
  // }

  render() {
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