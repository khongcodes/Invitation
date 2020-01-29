import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadLocation } from '../handleDateTimeLocation'
import MapPlace from './MapPlace';
import MapArea from './MapArea';

class MapContainer extends Component {

  makeLocationQuery = (processedLocation) => {
    let useLocation; 
    if (typeof processedLocation !== 'string') {
      useLocation = processedLocation.place_id
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyCR56nlJdP92vesegyf8bXWkq-6uo9-Nyo&q=place_id:${useLocation}&zoom=15`
    } else {
      useLocation = processedLocation.split(' ').join('+')
      return `https://www.google.com/maps/embed/v1/search?key=AIzaSyCR56nlJdP92vesegyf8bXWkq-6uo9-Nyo&q=${useLocation}&zoom=15`
    }
  }

  render() {
    return (
      <div>
        <iframe
          width="100%"
          height="600"
          frameBorder="0" style={{border:0}}
          src={this.makeLocationQuery(handleReadLocation(this.props.location))}>
        </iframe>

        <button onClick={()=>console.log(handleReadLocation(this.props.location).place_id)}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.event.data.location
})

export default connect(mapStateToProps)(MapContainer)