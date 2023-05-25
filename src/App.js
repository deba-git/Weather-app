import Details from "./components/Details";
import coldBg from "./images/cold.jpg";
import hotBg from "./images/hot.jpg";
import { useEffect, useState } from "react";
import { getWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      //  console.log(data.temp , bg);
      // Dynamic Background image
      const lessThan = units === "metric" ? 20 : 60;
      if (data.temp <= lessThan ) setBg(coldBg);
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);

  // Handle units (when click button it convert to °F)
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    // console.log(button);
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          // want to render container only we have weather
          // container render only if weather is not null
          weather && (
            <div className="container">
              <div className=" section section_inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City Name.."
                />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section_temparature">
                <div className="cityname_icons">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconUrl} alt="weatherIcon" />
                  <h3>{`${weather.description}`}</h3>
                </div>
                <div className="temparature">
                  <h1>{`${weather.temp.toFixed()} ° ${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
              </div>
              {/* Description */}
              <Details weather={weather} units={units} />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
