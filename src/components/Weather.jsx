import React, { useEffect, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "react-bootstrap/Card"
import Spinner from "react-bootstrap/Spinner"
import { MdLocationPin, MdVisibility } from "react-icons/md"
import { FaTemperatureLow } from "react-icons/fa"
import { BsWind, BsCloudsFill } from "react-icons/bs"

const Weather = () => {
  // const [location, setLocation] = useState({})
  const [weather, setWeather] = useState(null)
  const units = "metric"

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then(res => {
        return res.data
      })
      .then(location => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.GATSBY_OPENWEATHER_API_KEY}`
        )
      })
      .then(res => {
        return setWeather(res.data)
      })
  }, [])

  if (!weather) return null

  return (
    <>
      <Card
        border="primary"
        className="text-center d-flex justify-content-center bg-warning text-light my-4"
      >
        <Card.Body>
          {/* <Card.Title width="3rem" as="h2">
            
          </Card.Title> */}
          {weather !== null ? (
            <ul style={{ listStyleType: "none" }}>
              <li>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].main}
                  width="75"
                  height="75"
                />{" "}
                {weather.weather[0].main}
              </li>
              <li>
                <MdLocationPin /> {weather.name}
              </li>
              <li>
                <FaTemperatureLow /> {weather.main.temp} &#176;C
              </li>
              <li>
                <BsWind /> {weather.wind.speed} m/s{" "}
              </li>
              <li>
                <BsCloudsFill /> {weather.clouds.all}%
              </li>
              <li>
                <MdVisibility />{" "}
                {weather.visibility > 1000
                  ? `${weather.visibility / 1000} km`
                  : `${weather.visibility} m`}
              </li>
            </ul>
          ) : (
            <Spinner animation="grow" variant="success" />
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default Weather
