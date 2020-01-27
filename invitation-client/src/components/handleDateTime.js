export const handleStoreDate = dateObj => dateObj.valueOf()

export const handleReadDate = string => new Date(string)

export const handleRenderDate = dateObj => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return [months[dateObj.getMonth()], dateObj.getDate()+',', dateObj.getFullYear(), "-", days[dateObj.getDay()]].join(" ")
}

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