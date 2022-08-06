import React, { useEffect, useState } from "react"
import L from "leaflet"
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from "react-leaflet/TileLayer"
import { useMapEvents, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
const axios = require("axios").default

if (typeof window !== 'undefined') {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  })
  
  L.Marker.prototype.options.icon = DefaultIcon
}

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Map = () => {
  const [location, setLocation] = useState("")
  useEffect(() => {
    axios
      .get("https://ipapi.co/json/?fields=582143")
      .then(res => {
        console.log(res)
        setLocation(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (!location) return null

  return (
    <>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={17}
        scrollWheelZoom
        style={{ height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <p>Click on the map to know your location</p>
      <div>
        <h4>Know Your Locality</h4>
        <p>
          <ul>
            <li>{`Area: ${location.region}, ${location.country_name}`}</li>
            <li>{`Timezone: ${
              location.timezone
            } (UTC${location.utc_offset.slice(
              0,
              3
            )}:${location.utc_offset.slice(3, 5)})`}</li>
            <li>{`Currency: ${location.currency_name} (${location.currency})`}</li>
          </ul>
        </p>
      </div>
    </>
  )
}

export default Map
