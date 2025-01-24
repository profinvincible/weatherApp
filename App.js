import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Image,
} from "react-native";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "7b1b324e35bd239c356b59e62378370e"; // Replace with your API key

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Download APK Link
  const downloadLink = "https://your-server.com/weatherApp.apk"; // Replace with your APK link

  const handleDownload = () => {
    Linking.openURL(downloadLink); // Open the download link
  };

  return (
    <View style={styles.container}>
      {/* Weather App Section */}
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity onPress={fetchWeather} style={styles.button}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.weatherText}>
            Temperature: {weather.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            Weather: {weather.weather[0].description}
          </Text>
        </View>
      )}

      {/* Download Button Section */}
      {/* <TouchableOpacity
        onPress={handleDownload}
        style={styles.downloadContainer}>
        <Image
          style={styles.downloadButton}
          source={require("./images/image.png")} // Replace with your logo image
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "90%",
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  weatherContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 8,
  },
  downloadContainer: {
    marginTop: 20, // Add some space between the weather and download button
  },
  downloadButton: {
    width: 150,
    height: 150, // Adjust the size of your image as needed
    resizeMode: "contain",
  },
});

export default App;
