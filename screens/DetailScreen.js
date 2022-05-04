// import React, { useState, useEffect } from "react";
// import { Platform, Text, View, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import { func } from "prop-types";
// import axios from "axios";
// export default function App() {
//   const [location, setLocation] = useState({});
//   const [weather, setWeather] = useState({});
//   const [errorMsg, setErrorMsg] = useState(null);
//   const axios = require("axios");

//   useEffect(() => {
//     (async () => {
//       let { status } = await Permissions.askAsync(Permissions.LOCATION);
//       if (status !== "granted") {
//         this.setErrorMsg("Permission to access location was denied");
//         console.log("Permission to access location was denied");
//       } else {
//         try {
//           let location = await Location.getCurrentPositionAsync({
//             enableHighAccuracy: true,
//           });

//           const { latitude, longitude } = location.coords;
//           axios({
//             method: "get",
//             url: `https://api.geoapify.com/v1/geocode/reverse?lat=${
//               latitude + 0.0003007
//             }&lon=${
//               longitude - 0.0002111
//             }&format=json&apiKey=4df3f7d181104b7e839ae3a89fd67180`,
//           })
//             .then((response) => {
//               setLocation(response.data.results[0]);
//               if (location) {
//                 getWeather(latitude + 0.0003007, longitude - 0.0002111);
//                 console.log(weather.main);
//               }
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         } catch (error) {
//           // Call the function until get the coordinates
//           this.getLocationAsync();
//         }
//       }
//     })();
//   }, []);
//   async function getWeather(lat, long) {
//     await axios({
//       method: "get",
//       url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=52378f47189b16a4f567e1625c482c3f&units=metric`,
//     })
//       .then((response) => {
//         setWeather(response.data);
//       })
//       .catch((error) => console.log(error));
//   }

//   let text;
//   if (errorMsg) {
//     text = errorMsg;
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{location.city}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { white } from "color-name";

const DetailScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome
            name="angle-left"
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.mainText}>Today</Text>
        </View>
        {/* Today's Date */}
        <View>
          <Text style={styles.dateText}>December 22</Text>
        </View>
        {/* whole day detail */}
        <View style={styles.timeWiseContainer}>
          <FontAwesome5 name="dot-circle" color="black" size={12} />
          <View style={styles.tempDetails}>
            <View style={{ marginRight: 30 }}>
              <MaterialCommunityIcons
                name="weather-rainy"
                color="#52b788"
                size={52}
              />
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Morning
              </Text>
            </View>
            <View
              style={[
                styles.tempDetailsMorning,
                {
                  backgroundColor: "#90D0FF",
                },
              ]}
            >
              <View style={styles.tempDetailsText}>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                  }}
                >
                  23º
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 12,
                    paddingTop: 3,
                  }}
                >
                  Warmest day of the week
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.timeWiseContainer}>
          <FontAwesome5 name="dot-circle" color="black" size={12} />
          <View style={styles.tempDetails}>
            <View style={{ marginRight: 30 }}>
              <MaterialCommunityIcons
                name="weather-sunny"
                color="#52b788"
                size={52}
              />
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Afternoon
              </Text>
            </View>
            <View
              style={[
                styles.tempDetailsMorning,
                {
                  backgroundColor: "#EFE190",
                },
              ]}
            >
              <View style={styles.tempDetailsText}>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                  }}
                >
                  33º
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 12,
                    paddingTop: 3,
                  }}
                >
                  Turning cloudy and windy
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.timeWiseContainer}>
          <FontAwesome5 name="dot-circle" color="black" size={12} />
          <View style={styles.tempDetails}>
            <View style={{ marginRight: 30 }}>
              <MaterialCommunityIcons
                name="weather-lightning"
                color="#52b788"
                size={52}
              />
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Evening
              </Text>
            </View>
            <View
              style={[
                styles.tempDetailsMorning,
                {
                  backgroundColor: "#FFBAC1",
                },
              ]}
            >
              <View style={styles.tempDetailsText}>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                  }}
                >
                  21º
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 12,
                    paddingTop: 3,
                  }}
                >
                  Winds light and chances of rain
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.timeWiseContainer}>
          <FontAwesome5 name="dot-circle" color="black" size={12} />
          <View style={styles.tempDetails}>
            <View style={{ marginRight: 30 }}>
              <MaterialCommunityIcons
                name="weather-night-partly-cloudy"
                color="#52b788"
                size={52}
              />
              <Text
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Night
              </Text>
            </View>
            <View
              style={[
                styles.tempDetailsMorning,
                {
                  backgroundColor: "#02A8A8",
                },
              ]}
            >
              <View style={styles.tempDetailsText}>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_600SemiBold",
                    fontSize: 12,
                  }}
                >
                  19º
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    color: "white",
                    fontFamily: "Montserrat_400Regular",
                    fontSize: 12,
                    paddingTop: 3,
                  }}
                >
                  Chance of Heavy Rain 95%
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Today's Air Details */}
        <View>
          <Text
            style={[
              styles.dateText,
              {
                marginTop: 10,
                fontSize: 16,
              },
            ]}
          >
            Today Details
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginRight: 30,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View style={styles.airDetailSingleItem}>
            <FontAwesome5
              name="wind"
              size={26}
              style={{ textAlign: "center" }}
            />
            <View>
              <Text style={styles.airDetail}>E 8 kmh</Text>
              <Text style={styles.airDetailSegment}>Wind</Text>
            </View>
          </View>
          <View style={styles.airDetailSingleItem}>
            <SimpleLineIcons
              name="drop"
              size={26}
              style={{ textAlign: "center" }}
            />
            <View>
              <Text style={styles.airDetail}>61%</Text>
              <Text style={styles.airDetailSegment}>Humidity</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            marginRight: 30,
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <View style={styles.airDetailSingleItem}>
            <Feather name="sun" size={26} style={{ textAlign: "center" }} />
            <View>
              <Text style={styles.airDetail}>11</Text>
              <Text style={styles.airDetailSegment}>UV Index</Text>
            </View>
          </View>
          <View style={styles.airDetailSingleItem}>
            <SimpleLineIcons
              name="arrow-right-circle"
              size={26}
              style={{ textAlign: "center" }}
            />
            <View>
              <Text style={styles.airDetail}>1008 hPa</Text>
              <Text style={styles.airDetailSegment}>Pressure</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: "#E5E5E5",
  },
  container: {
    marginLeft: 30,
  },
  header: {
    marginTop: 20,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  mainText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    alignItems: "center",
    fontSize: 16,
  },
  dateText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    paddingTop: 10,
  },
  timeWiseContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempDetailsMorning: {
    width: 210,
    paddingHorizontal: 2,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#52b788",
    alignContent: "space-between",
  },
  airDetailSingleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
  },
  airDetail: {
    width: 100,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    marginLeft: 20,
  },
  airDetailSegment: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginLeft: 20,
  },
});
