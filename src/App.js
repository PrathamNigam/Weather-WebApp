import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import sunnyImage from "./images/icons8-sun-240.png";
import rainyImage from "./images/lightning-bolt.png";
import cloudyImage from "./images/cloud.png";
import hazeImage from "./images/fog (1).png";
import thunderstormImage from "./images/scattered-thunderstorms.png";
import mistImage from "./images/mist.png";
import logo from "./images/logo1.png";

import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [newsArticles, setNewsArticles] = useState([]);

  const apiKey = "737c83c941aca500142ac0c41293f363";
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  const getRandomCity = () => {
    const cities = [
      "London",
      "Paris",
      "New York",
      "Tokyo",
      "Sydney",
      "Berlin",
      "Rome",
      "Moscow",
      "Delhi",
      "Mumbai",
      "iceland",
    ];
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const searchLocation = () => {
    const url = `${baseUrl}?q=${location}&appid=${apiKey}`;

    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const searchRandomLocation = () => {
    const randomCity = getRandomCity();
    const url = `${baseUrl}?q=${randomCity}&appid=${apiKey}`;

    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    searchRandomLocation();
  }, []);

  useEffect(() => {
    const newsApiKey = "9408cd8bc7ce4f51813019660636cf1e";
    const newsApiUrl = `https://newsapi.org/v2/everything?q=climate&apiKey=${newsApiKey}`;

    axios.get(newsApiUrl).then((response) => {
      const limitedArticles = response.data.articles.slice(0, 15);
      setNewsArticles(limitedArticles);
      console.log(limitedArticles);
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const getWeatherImage = (weather) => {
    if (weather === "Clear") {
      return sunnyImage;
    } else if (weather === "Clouds") {
      return cloudyImage;
    } else if (weather === "Rain") {
      return rainyImage;
    } else if (weather === "Mist") {
      return mistImage;
    } else if (weather === "Thunderstorm") {
      return thunderstormImage;
    } else if (weather === "Haze") {
      return hazeImage;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  return (
    <div className="App">
      <div className="rectangle">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search..."
            type="text"
            className="searchbar"
          />
          <div className="data">
            <div className="contname">
              <h1>{data.name}</h1>
              <p>Chances Of Rain: {data.main?.humidity}%</p>
              <h2>{convertKelvinToCelsius(data.main?.temp)}°C</h2>
              {data.weather && (
                <img
                  src={getWeatherImage(data.weather[0]?.main)}
                  alt={data.weather[0]?.main}
                  className="weather-image"
                />
              )}
            </div>
          </div>
        </div>
        <div className="rectangle-1">
          <h6>AIR CONDITIONS</h6>
          <ul className="listing">
            <li>
              <i className="bi bi-thermometer-half"></i> Real Feel
              <br />
              <br />
              <span>{convertKelvinToCelsius(data.main?.feels_like)}°C</span>
            </li>
            <li>
              <i className="bi bi-wind"> Wind Speed</i>
              <br />
              <br />
              <span>{data.wind?.speed} Km/h</span>
            </li>
            <li>
              <i className="bi bi-thermometer-high"> Max temp</i>
              <br />
              <br />
              <span>{convertKelvinToCelsius(data.main?.temp_max)}°C</span>
            </li>
            <li>
              <i className="bi bi-thermometer-low"> Min Temp</i>
              <br />
              <br />
              <span>{convertKelvinToCelsius(data.main?.temp_min)}°C</span>
            </li>
          </ul>
        </div>
        <div className="rectangle-2">
          <img src={logo} className="logo" alt="Logo" />
          <p>
            <Link
              to="https://github.com/PrathamNigam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="info"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                class="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </Link>
          </p>
          <p>
            <Link
              to="https://www.windy.com/?26.876,80.911,5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="bi bi-map-fill"
                style={{ color: "white", width: "20px", height: "20px" }}
              ></i>
            </Link>
          </p>
        </div>
        <div className="rectangle-3">
          <h6>TIME</h6>
          <ul className="listing">
            <li style={{ fontSize: "16px", fontFamily: "sans-serif" }}>
              <i className="bi bi-sunrise"> Sunrise</i>
              <br />
              <br />
              <span>{formatTimestamp(data.sys?.sunrise)}</span>
            </li>
            <li style={{ fontSize: "16px", fontFamily: "sans-serif" }}>
              <i className="bi bi-sunset"> Sunset</i>
              <br />
              <br />
              <span>{formatTimestamp(data.sys?.sunset)}</span>
            </li>
          </ul>
        </div>
        <div className="rectangle-4">
          <h6>LATEST INFO</h6>
          <ul className="news-list">
            {newsArticles.map((article) => (
              <li key={article.url}>
                <Link
                  to={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
          <p>Click links for more Info</p>
        </div>
      </div>
    </div>
  );
}

export default App;
