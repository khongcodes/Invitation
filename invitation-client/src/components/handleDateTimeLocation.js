//////////////////////////////////////////////////////////////
////////////////////        DATE        /////////////////////
////////////////////////////////////////////////////////////
// using react-date-picker package
///////////////////////////////////////////////////////////

// date is kept in state as Date object -
// before storing in DB it needs to be converted to milliseconds so it can be easily re-parsed
export const handleStoreDate = dateObj => dateObj.valueOf()

// rehydrate retrieved integer into Date object
export const handleReadDate = milliseconds => new Date(milliseconds)

// render date for user
export const handleRenderDate = milliseconds => {
  const date = handleReadDate(milliseconds)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return [months[date.getMonth()], date.getDate() + ',', date.getFullYear(), "-", days[date.getDay()]].join(" ")
}


//////////////////////////////////////////////////////////////
////////////////////        TIME        /////////////////////
////////////////////////////////////////////////////////////
// using react-time-picker package
//////////////////////////////////////////////////////////

// time is already a string and requires less processing for storage
// render time with AM/PM for user
export const handleRenderTime = timeString => {
  const timeArray = timeString.split(":");
  const checkHour = parseInt(timeArray[0], 10)
  let meridiem = "AM"

  if (checkHour > 12) {
    timeArray[0] = (checkHour % 12).toString();
    meridiem = "PM";
  }

  return timeArray.join(":") + " " + meridiem;
}


//////////////////////////////////////////////////////////////
//////////////////        LOCATION        ///////////////////
////////////////////////////////////////////////////////////
// using react-geo-suggest
//////////////////////////////////////////////////////////

// just pass in location label, to be displayed to user,
// and longitude latitude, to be used by Google Maps API

// this limited capture of properties from the API is expressed in EventFormContainer.js,
// to save space and not have to save more data to state than necessary
export const handleStoreLocation = locationData => JSON.stringify(locationData);

// rehydrate retrieved JSON string into object
export const handleReadLocation = locationJSON => JSON.parse(locationJSON)

// render location label to user
export const handleRenderLocation = locationString => {
  if (locationString.startsWith("{") && locationString.endsWith("}")) {
    return handleReadLocation(locationString).label
  } else if (locationString === '""') {
    return "none"
  } else {
    return locationString
  }
}