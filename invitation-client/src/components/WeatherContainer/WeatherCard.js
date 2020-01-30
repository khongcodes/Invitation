import React, { Component } from 'react'

import { handleRenderDate, handleRenderTime, convertCompiledDateTime } from '../handleDateTimeLocation'
import '../../style/Weather.css'

export default class WeatherCard extends Component {
  state = {
    cityName: '',
    closestDate: undefined,
    closestForecast: {
      main: {},
      weather: [],
      clouds: {},
      wind: {},
      rain: {},
      snow: {}
    }
  }

  componentDidMount() {
    this.mounted = true;
    
    const location = this.props.location.location;
    const requestedDate = convertCompiledDateTime(this.props.date, this.props.time);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(resp => resp.json())
    .then(data => {
      if (this.mounted) {

        const closestDate = data.list.map(t => t.dt*1000).sort((a,b) => Math.abs(a-requestedDate) - Math.abs(b-requestedDate))[0];
        const closestForecast = data.list[data.list.findIndex(item => item.dt === closestDate/1000)];
        this.setState(previousState => ({
          cityName: data.city.name,
          closestDate: closestDate, 
          closestForecast: {
            ...previousState.closestForecast,
            ...closestForecast
          }
        }))

      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  listWeatherConditions = (weatherArray) => (
    weatherArray.map(item => 
      <div key={item.id} className='WeatherCard listItems'>
        <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt={item.main}/>
        <p>{item.description}</p>
      </div>
    )
  )

  renderIfPresent = (startString, item, key, endString) => ((Object.entries(item).length > 0) ? 
    <p>{startString}: {item[key]} {endString}</p>
    : 
    <></>
  )

  render() {
    const date = this.state.closestDate;
    const time = `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
    const { main, weather, clouds, wind, rain, snow } = this.state.closestForecast;

    return (
      <div className = 'WeatherCard Container'>
        <h3>Closest Available Weather Forecast:</h3>
        <h4 className = 'cityName'>
          { this.state.cityName }
        </h4>
        <p className = 'dateTime'>
          { handleRenderDate(date) } - { handleRenderTime(time) }
        </p>

        <div className = 'weatherInfoContainer'>
          <div className = 'iconContainer'>
            {this.listWeatherConditions(weather)}
          </div>

          <div className = 'weatherInfo'>
            <p>Temperature: { main.temp } F</p>
            <p>Feels like: { main.feels_like } F</p>
            <p>Humidity: {main.humidity}%</p>

            {this.renderIfPresent('Cloudiness', clouds, 'all', '%')}
            {this.renderIfPresent('Wind speed', wind, 'speed', 'mph')}
            {this.renderIfPresent('Rain volume', rain, '3h', 'mm in the last 3 hours')}
            {this.renderIfPresent('Snow volume', snow, '3h', 'in the last 3 hours')}
          </div>
        </div>

      </div>
    )
  }
}
