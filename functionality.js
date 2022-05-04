import axios from "axios";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MainScreen from "./screens/MainScreen";
class functionality {
  naviagtor;
  locationPercentage;
  location = {};
  city = null;
  weather = null;
  air = null;
  custLat = null;
  custLong = null;
  async locationCurrent() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setErrorMsg("Permission to access location was denied");
      console.log("Permission to access location was denied");
    } else {
      this.locationPercentage = status;
    }
  }
  async getCity(loc) {
    await loc.locationCurrent();
    this.location = await (await Location.getCurrentPositionAsync()).coords;
    await axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${
          this.location.latitude + 0.0003007
        }&lon=${
          this.location.longitude - 0.0002111
        }&format=json&apiKey=4df3f7d181104b7e839ae3a89fd67180`
      )
      .then(async (response) => {
        try {
          this.city = await response.data.results[0];
          return this.city;
        } catch {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
    // console.log(this.city);
    return this.city;
  }
  async getLatLong(city, naviagtor) {
    this.naviagtor = naviagtor;
    await axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=4df3f7d181104b7e839ae3a89fd67180`
      )
      .then(async (response) => {
        try {
          this.location = {
            longitude: await response.data.features[0].geometry.coordinates[0],
            latitude: await response.data.features[0].geometry.coordinates[1],
          };
        } catch {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
    this.getWeatherBasic(this.location, null, 0);
    // console.log(await this.getWeather(null, 0));

    // return this.city;
  }
  async getWeather(loc, flag = 1) {
    if (flag) {
      await loc.locationCurrent();
      this.location = await (await Location.getCurrentPositionAsync()).coords;
    } else if (flag == 0) {
      this.location.latitude = this.custLat;
      console.log(this.location.latitude);
      this.location.longitude = this.custLong;
    }
    await axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude}&lon=${this.location.longitude}&appid=52378f47189b16a4f567e1625c482c3f&units=metric`,
    })
      .then(async (response) => {
        try {
          this.weather = await response.data;
          return this.weather;
        } catch {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
    console.log(this.weather);
    if (flag == 0) {
      MainScreen.setData(this.weather);
      // navigator.pop();
    }
    return this.weather;
  }
  async getWeatherBasic(loc, day, flag = 1) {
    var url;
    if (flag) {
      await loc.locationCurrent();
      this.location = await (await Location.getCurrentPositionAsync()).coords;
    }
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.location.latitude}&lon=${this.location.longitude}&exclude=hourly,minutely&appid=27bba5998035e8aed7150511d5aae4f9&units=metric`;
    console.log(url);
    await axios({
      method: "get",
      url: url,
    })
      .then(async (response) => {
        try {
          this.weather = await response.data;
          // console.log(this.weather);
          return this.weather;
        } catch {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
    console.log(this.weather);
    return this.weather;
  }
  async getAirData(loc) {
    await loc.locationCurrent();
    this.location = await (await Location.getCurrentPositionAsync()).coords;
    await axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/air_pollution?lat=${this.location.latitude}&lon=${this.location.longitude}&exclude=hourly,minutely&appid=27bba5998035e8aed7150511d5aae4f9&units=metric`,
    })
      .then(async (response) => {
        try {
          this.air = await response.data;
          // console.log(this.air);
          return this.air;
        } catch {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
    return this.air;
  }
}
export default functionality;
