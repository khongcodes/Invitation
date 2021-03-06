//////////////////////////////////////////////////////////////
////////////////////        DATE        /////////////////////
////////////////////////////////////////////////////////////
// using react-date-picker package
///////////////////////////////////////////////////////////

// date is kept in state as Date object -
// before storing in DB it needs to be converted to milliseconds so it can be easily re-parsed
export const handleStoreDate = dateObj => dateObj ? dateObj.valueOf() : null

// rehydrate retrieved integer into Date object
export const handleReadDate = milliseconds => {
  if (milliseconds) {
    return new Date(milliseconds)
  } else {
    return null
  }
}

// render date for user
export const handleRenderDate = milliseconds => {
  const date = handleReadDate(milliseconds)
  if (date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return [months[date.getMonth()], date.getDate() + ',', date.getFullYear(), "-", days[date.getDay()]].join(" ")
  } else {
    return 'none'
  }
}


//////////////////////////////////////////////////////////////
////////////////////        TIME        /////////////////////
////////////////////////////////////////////////////////////
// using react-time-picker package
//////////////////////////////////////////////////////////

// time is already a string and requires less processing for storage
// render time with AM/PM for user
export const handleRenderTime = timeString => {
  if (timeString) {
    const timeArray = timeString.split(":");
    if (timeArray[1].length < 2) {
      timeArray[1] = `0${timeArray[1]}`
    }
    
    const checkHour = parseInt(timeArray[0], 10)
    let meridiem = "AM"

    if (checkHour > 12) {
      timeArray[0] = (checkHour % 12).toString();
      meridiem = "PM";
    }

    return timeArray.join(":") + " " + meridiem;
  } else {
    return 'none'
  }
}

export const convertCompiledDateTime = (milliseconds, timeString) => {
  const dateTime = new Date(milliseconds);
  dateTime.setHours(timeString.split(":")[0]);
  dateTime.setMinutes(timeString.split(":")[1]);
  return dateTime.valueOf();
}


//////////////////////////////////////////////////////////////
//////////////////        LOCATION        ///////////////////
////////////////////////////////////////////////////////////
// using react-geo-suggest
//////////////////////////////////////////////////////////

// just pass in location label, to be displayed to user,
// and longitude latitude, to be used by Google Maps API
// this limited capture of properties from the API is expressed in EventCreateContainer.js,
// to save space and not have to save more data to state than necessary

// if locationUserString (custom user string input) is present, return that value as location value
// otherwise, check if locationData object has any entries
// if yes, return JSON version of object as location value
// if no, return undefined as location value
export const handleStoreLocation = (locationData, locationUserString) => {
  if (locationUserString) {
    return locationUserString
  } else {
    return Object.entries(locationData).length > 1 ? JSON.stringify(locationData) : null
  }
}

// if stored data is JSON, rehydrate into object
// if stored data is empty, 
export const handleReadLocation = locationString => {
  if (!locationString) {
    return ''
  } else if (locationString.startsWith("{") && locationString.endsWith("}")) {
    return JSON.parse(locationString)
  } else {
    return locationString
  }
}

// render location label to user
export const handleRenderLocation = locationString => {
  const readableValue = handleReadLocation(locationString);
  if (typeof readableValue === 'string') {
    return readableValue || 'none'
  } else {
    return readableValue.label
  }
}