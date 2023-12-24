import { useState } from "react";
import "./App.css";
import WeatherCard from "./WeatherCard";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=f84deeec27c34f30968122821232509&q=${city}`
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch weather data");
    }
    
  };


  return (
    <div style={{ minHeight: "100vh" }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => fetchData()}>Search</button>
      {!loading ? (
        data && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              margin: "4rem 0rem",
            }}
          >
            <WeatherCard
              factor={"Temperature"}
              value={`${data.current.temp_c}℃`}
            />
            <WeatherCard
              factor={"Humidity"}
              value={`${data.current.humidity}%`}
            />
            <WeatherCard
              factor={"Condition"}
              value={`${data.current.condition.text}`}
            />
            <WeatherCard
              factor={"Wind Speed"}
              value={`${data.current.wind_kph} kph`}
            />
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
