import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { React, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import functionality from "../functionality";
// import { KeyboardAvoidingView } from "react-native-web";

const SearchScreen = ({ navigation }) => {
  var func = new functionality();
  const [city, setCity] = useState("");
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: "#F5F5F5",
        marginHorizontal: 20,
      }}
    >
      <StatusBar style={{ backgroundColor: "#F5F5F5" }} />
      <SafeAreaView>
        <Input
          placeholder="Search Your City Here"
          errorStyle={{ color: "red" }}
          rightIcon={{ type: "font-awesome", name: "search", color: "black" }}
          style={{ marginTop: 10 }}
          value={city}
          onChangeText={(e) => setCity(e)}
        />
      </SafeAreaView>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 5,
          }}
        >
          <Button
            title="Search"
            style={{ flex: 1, marginBottom: 5 }}
            onPress={() => {
              func.getLatLong(city, navigation);
              navigation.goBack();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
