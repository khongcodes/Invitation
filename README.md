# Invitation

![screenshot 1](https://i.imgur.com/RXhN9qU.png)
![screenshot 2](https://i.imgur.com/fknk79K.png)
![screenshot 3](https://i.imgur.com/0G5zj3D.png)
[Video demo](https://youtu.be/cL8TZPi83VA)

## About
This is a lightweight app designed for creating share-able event pages, decoupled from social media.

Event pages feature an automatic Google Maps embedded window and a weather forecast for the input date and time, if they are within 5 days ahead of the current day.

## Future updates
- enable delete events
- better weather api use
- custom map showing nearby public transportation options as pre-loaded markers with Google Maps API
- assign random URL slug to events to further discourage users from accessing other events

## Instructions
This package uses the foreman gem! Make sure packages and gems are installed -

### Installation
In `/invitation-api` run:
```
bundle install
```

In `/invitation-client` run:
```
npm install
```

### Getting Started
To start the Rails and React servers, navigate to `/invitation-api` and run:
```
rails start
```
Rails: localhost:3001
React: localhost:3000


# Special thanks
The following 2 articles were extremely helpful for me as I was learning how to set up user authentication systems between React and Rails. This application uses session cookies with CSRF tokens for security.

- [Rails session cookies for API Authentication](https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication) by Mike Clark

- [React with Rails User Authentication](https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2) by Alejandro Sabogal

This application is reliant on Google Maps Embed API and OpenWeather API.
- [Google Maps](https://developers.google.com/maps/documentation)

- [OpenWeather](https://openweathermap.org/api)

This application imports components:
- [DatePicker](https://github.com/wojtekmaj/react-date-picker) by Wojciech Maj

- [TimePicker](https://github.com/wojtekmaj/react-time-picker) by Wojciech Maj

- [Geosuggest](https://github.com/ubilabs/react-geosuggest) by Ubilabs
