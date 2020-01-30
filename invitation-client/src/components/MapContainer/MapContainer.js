import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadLocation } from '../handleDateTimeLocation'

class MapContainer extends Component {

  makeLocationQuery = (processedLocation) => {
    let useLocation, queryMode, query; 
    const googleApiUrl = 'https://www.google.com/maps/embed/v1/';
    const apiParams = '?key=AIzaSyCR56nlJdP92vesegyf8bXWkq-6uo9-Nyo&';

    if (typeof processedLocation !== 'string') {
      useLocation = processedLocation.place_id;
      queryMode = 'place';
      query = `q=place_id:${useLocation}`;
    } else {
      useLocation = encodeURIComponent(processedLocation).replace(/'/, '%27');
      queryMode = 'search';
      query = `q=${useLocation}`;
    }

    return googleApiUrl + queryMode + apiParams + query;
  }

  render() {
    return (
      <div>
        {
          this.props.location ?
            <iframe
              width="100%"
              frameBorder="0" style={{border:0, height:'92vh'}}
              src={this.makeLocationQuery(handleReadLocation(this.props.location))}>
            </iframe>
          : 
            'Map could not be loaded for this location.'
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.event.data.location
})

export default connect(mapStateToProps)(MapContainer)