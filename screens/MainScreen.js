import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import selectIcon from "../icons";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Fontisto,
} from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import functionality from "../functionality";
import icons from "../icons";
import { StatusBar } from "react-native";

const MainScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [locationCurrentData, setLocationCurrentData] = useState(null);
  const [showData, setShowData] = useState("today");
  const [airData, setAirData] = useState(null);
  const icon = new icons();

  useEffect(async () => {
    const loc = new functionality();
    const weatherData = await loc.getWeatherBasic(loc, showData);
    // const getData = await loc.getLatLong("Ulhasnagar");
    // console.log(weatherData);
    setWeather(weatherData);
    const locationData = await loc.getCity(loc);
    setLocationCurrentData(locationData);
    const air = await loc.getAirData(loc);
    setAirData(air.list[0].components);
  }, []);
  const TodayWeather = () => (
    <View
      style={[
        styles.dayWiseContainerContent,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 5,
        },
      ]}
    >
      <View style={styles.dayWiseItem}>
        <MaterialCommunityIcons
          style={{ flex: 1, textAlign: "center", color: "#52b788" }}
          name="weather-sunset-up"
          size={38}
        />
        <Text style={styles.dayWiseDetailTemp}>
          {Math.round(weather.daily[0].feels_like.morn)}ºc
        </Text>
        <Text style={styles.dayWiseTimeSection}>Morning</Text>
      </View>
      <View style={styles.dayWiseItem}>
        <MaterialCommunityIcons
          style={{ flex: 1, textAlign: "center", color: "#52b788" }}
          name="weather-partly-cloudy"
          size={38}
        />
        <Text style={styles.dayWiseDetailTemp}>
          {Math.round(weather.daily[0].feels_like.day)}ºc
        </Text>
        <Text style={styles.dayWiseTimeSection}>Afternoon</Text>
      </View>
      <View style={styles.dayWiseItem}>
        <MaterialCommunityIcons
          style={{ flex: 1, textAlign: "center", color: "#52b788" }}
          name="weather-sunset"
          size={38}
        />
        <Text style={styles.dayWiseDetailTemp}>
          {Math.round(weather.daily[0].feels_like.eve)}ºc
        </Text>
        <Text style={styles.dayWiseTimeSection}>Evening</Text>
      </View>
      <View style={styles.dayWiseItem}>
        <MaterialCommunityIcons
          style={{ textAlign: "center", color: "#52b788" }}
          name="weather-night-partly-cloudy"
          size={38}
        />
        <Text style={styles.dayWiseDetailTemp}>
          {Math.round(weather.daily[0].feels_like.night)}ºc
        </Text>
        <Text style={styles.dayWiseTimeSection}>Night</Text>
      </View>
    </View>
  );
  const WeekWeather = ({ item }) => (
    <View style={[styles.dayWiseItem, { width: 60, height: 90 }]} key={item.id}>
      {/* <View> */}
      <Fontisto
        name={icon.selectIcon(item.weather[0].icon)}
        size={28}
        color="#52b788"
      ></Fontisto>
      {/* </View> */}
      <Text style={styles.dayWiseDetailTemp}>
        {Math.round(item.temp.max)}ºc
      </Text>
      <Text style={[styles.dayWiseTimeSection, { fontSize: 10 }]}>
        {day < 6 ? week[++day] : week[(day = 0)]}
      </Text>
    </View>
  );
  const d = new Date();
  let day = d.getDay();
  console.log(day);
  day = 2;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (weather && locationCurrentData && airData) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style={{ backgroundCOlor: "#F5F5F5" }} />

          {/* header */}
          <View style={styles.container} backgroundColor="#E5E5E5">
            <View style={styles.headerMain}>
              <FontAwesome
                style={styles.headerBellIcon}
                name="bell"
                color="#FFA940"
                size={24}
              ></FontAwesome>
              <FontAwesome
                onPress={() => navigation.navigate("Search")}
                name="search"
                size={24}
                color="gray"
              ></FontAwesome>
            </View>
            {/* temperature Content */}
            <View style={styles.temperatureContainer}>
              <View style={styles.temperatureContainerText}>
                <Text
                  style={{
                    fontFamily: "Montserrat_400Regular",
                    color: "black",
                    fontSize: 40,
                  }}
                >
                  {Math.round(weather.current.temp)}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat_400Regular",
                    color: "black",
                    alignContent: "flex-start",
                    paddingBottom: 5,
                    fontSize: 22,
                  }}
                >
                  º c
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat_400Regular",
                    color: "black",
                    fontSize: 14,
                    paddingLeft: 5,
                  }}
                >
                  | {weather.current.weather[0].description}
                </Text>
              </View>
              <View>
                <Fontisto
                  name={icon.selectIcon(weather.current.weather[0].icon)}
                  size={65}
                  color="#52b788"
                ></Fontisto>
              </View>
            </View>
            {/* place name */}
            <View style={{ marginHorizontal: 30, marginTop: 15 }}>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 20,
                }}
              >
                {locationCurrentData.city}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 12,
                    marginTop: 5,
                    paddingRight: 5,
                  }}
                >
                  {locationCurrentData.state}, {locationCurrentData.country}
                </Text>
                <FontAwesome name="map-pin" color="red" size={12} />
              </View>
            </View>
            {/* Other details */}
            <View style={[styles.detailContainer, { marginTop: 25 }]}>
              <View>
                <Text style={styles.detailTextHeading}>
                  {weather.current.humidity}%
                </Text>
                <Text style={styles.detailTextValue}>Humidity</Text>
              </View>
              <View>
                <Text style={styles.detailTextHeading}>
                  {weather.current.uvi}
                </Text>
                <Text style={styles.detailTextValue}>UV Index</Text>
              </View>
              <View>
                <Text style={styles.detailTextHeading}>
                  {weather.current.wind_speed}
                </Text>
                <Text style={styles.detailTextValue}>Wind (Km/h)</Text>
              </View>
            </View>
            {/* Day wise Container */}
            <View style={styles.dayWiseContainer}>
              <View style={styles.dayWiseTabButtons}>
                <View style={styles.dayCardTabButton}>
                  <Text
                    onPress={() => setShowData("today")}
                    style={[
                      showData == "today"
                        ? styles.tabButton
                        : styles.tabButtonInActive,
                      { paddingLeft: 10 },
                    ]}
                  >
                    Today
                  </Text>
                  <Text
                    onPress={() => setShowData("tomorrow")}
                    style={[
                      showData == "tomorrow"
                        ? styles.tabButton
                        : styles.tabButtonInActive,
                      ,
                      { paddingLeft: 10 },
                    ]}
                  >
                    This Week
                  </Text>
                  {/*  */}
                </View>
                <View>
                  <Text style={styles.commonBlueButton}>See All</Text>
                </View>
              </View>
              {showData == "today" ? (
                <TodayWeather />
              ) : (
                <View
                  style={[
                    styles.dayWiseContainerContent,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 5,
                    },
                  ]}
                >
                  <FlatList
                    data={weather.daily}
                    renderItem={WeekWeather}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    initialNumToRender={4}
                  />
                </View>
              )}
            </View>
            {/* Air Pollution */}
            <View style={{ paddingHorizontal: 30, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.tabButton}>Air Pollution</Text>
                <Text
                  style={styles.commonBlueButton}
                  onPress={() => navigation.navigate("Detail")}
                >
                  Details
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="podcast" color="#F67280" size={50} />
                <View style={{ paddingLeft: 15 }}>
                  <View style={styles.temperatureContainerText}>
                    <Text
                      style={{
                        fontFamily: "Montserrat_400Regular",
                        color: "#F67280",
                        fontSize: 32,
                      }}
                    >
                      {Math.round(airData.co)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Montserrat_400Regular",
                        color: "black",
                        fontSize: 14,
                        paddingLeft: 5,
                      }}
                    >
                      | Micro Dust / PM2.5
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.pollutionType}>Unhealthy</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* mycity section */}
            <View style={{ paddingHorizontal: 30, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.tabButton}>My City</Text>
                <Text style={styles.commonBlueButton}>Edit</Text>
              </View>
              <View
                style={[
                  styles.dayWiseContainerContent,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 5,
                  },
                ]}
              >
                <View style={styles.dayWiseItem}>
                  <MaterialCommunityIcons
                    style={{ flex: 1, textAlign: "center", color: "#52b788" }}
                    name="weather-cloudy"
                    size={38}
                  />
                  <Text style={styles.dayWiseDetailTemp}>23º</Text>
                  <Text style={styles.dayWiseTimeSection}>Morning</Text>
                </View>
                <View style={styles.dayWiseItem}>
                  <MaterialCommunityIcons
                    style={{ flex: 1, textAlign: "center", color: "#52b788" }}
                    name="weather-partly-cloudy"
                    size={38}
                  />
                  <Text style={styles.dayWiseDetailTemp}>28º</Text>
                  <Text style={styles.dayWiseTimeSection}>Afternoon</Text>
                </View>
                <View style={styles.dayWiseItem}>
                  <MaterialCommunityIcons
                    style={{ flex: 1, textAlign: "center", color: "#52b788" }}
                    name="weather-lightning-rainy"
                    size={38}
                  />
                  <Text style={styles.dayWiseDetailTemp}>21º</Text>
                  <Text style={styles.dayWiseTimeSection}>Evening</Text>
                </View>
                <View style={styles.dayWiseItem}>
                  <MaterialCommunityIcons
                    style={{ textAlign: "center", color: "#52b788" }}
                    name="weather-night-partly-cloudy"
                    size={38}
                  />
                  <Text style={styles.dayWiseDetailTemp}>19º</Text>
                  <Text style={styles.dayWiseTimeSection}>Night</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" color="#52b788" />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  headerMain: {
    marginVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerBellIcon: {
    marginRight: 20,
  },
  temperatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  temperatureContainerText: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTextHeading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
  },
  detailTextValue: {
    fontFamily: "Montserrat_300Light",
    justifyContent: "center",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 14,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingBottom: 30,
  },
  dayWiseContainer: {
    paddingHorizontal: 30,
  },
  dayWiseTabButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayCardTabButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commonBlueButton: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#617BE3",
  },
  tabButton: {
    color: "#000000",
    fontFamily: "Montserrat_600SemiBold",
    lineHeight: 26,
    fontSize: 16,
  },
  tabButtonInActive: {
    color: "#898989",
    fontFamily: "Montserrat_400Regular",
    lineHeight: 26,
    fontSize: 14,
  },
  dayWiseContainerContent: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
  dayWiseItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  dayWiseDetailTemp: {
    paddingTop: 10,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    textAlign: "center",
  },
  dayWiseTimeSection: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    marginTop: 5,
  },
  pollutionType: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
});
export default MainScreen;
