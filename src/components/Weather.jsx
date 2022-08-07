import React, { useEffect, useState } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import {MdLocationPin, MdVisibility} from "react-icons/md"
import {FaTemperatureLow} from "react-icons/fa"
import {BsWind, BsSunsetFill, BsSunriseFill} from "react-icons/bs"

const Weather = () => {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState("")
  const units = "metric"

  useEffect(() => {
    axios
      .get("http://ip-api.com/json/?fields=42004479")
      .then(res => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${res.data.lat}&lon=${res.data.lon}&appid=${process.env.GATSBY_OPENWEATHER_API_KEY}`
          )
          .then(res1 => {
            setWeather(res1.data)
          })
          .catch(err1 => {
            console.log(err1)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(weather)

  return (
    <>
      <Card
        border="primary"
        className="text-center d-flex justify-content-center bg-warning text-light my-4"
      >
        <Card.Body>
          {/* <Card.Title width="3rem" as="h2">
            
          </Card.Title> */}
          <ul style={{listStyleType: "none"}}>
            <li>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].main}
              width="75"
              height="75"
            />
            </li>
            <li><MdLocationPin />{" "}{weather.name}</li>
            <li><FaTemperatureLow /> {" "} {weather.main.temp} &#176;C</li>
            <li>< BsSunriseFill /> {" "} <BsSunsetFill /></li>
            <li><BsWind /> {" "} {weather.wind.speed} m/s </li>
            <li>Cloudiness: {weather.clouds.all}%</li>
            <li><MdVisibility /> {" "} {weather.visibility > 1000 ? ((
              weather.visibility)/1000 `km`
              ) : weather.visibility `m`}</li>
          </ul>
        </Card.Body>
      </Card>
    </>
  )
}

export default Weather
