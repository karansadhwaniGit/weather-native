export default class icons {
  selectIcon(name) {
    // console.log(name);
    if (name == "01d") {
      return "sun";
    } else if (name == "01n") {
      return "night-clear";
    } else if (name == "02d") {
      return "day-cloudy";
    } else if (name == "02n") {
      return "night-alt-cloudy";
    } else if (name == "03d") {
      return "cloudy";
    } else if (name == "03n") {
      return "cloudy";
    } else if (name == "04d") {
      return "cloud-up";
    } else if (name == "04n") {
      return "cloud-up";
    } else if (name == "09d") {
      return "rain";
    } else if (name == "09n") {
      return "rains";
    } else if (name == "10d") {
      return "day-rain";
    } else if (name == "10n") {
      return "night-rain";
    } else if (name == "11d") {
      return "day-lightning";
    } else if (name == "11n") {
      return "night-lightning";
    } else if (name == "13d") {
      return "snowflake";
    } else if (name == "13n") {
      return "snowflake";
    } else if (name == "15d") {
      return "fog";
    } else if (name == "15n") {
      return "fog";
    } else {
      return "fog";
    }
  }
}
