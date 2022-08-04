import React, { useEffect, useState } from "react"
import L from 'leaflet';
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from "react-leaflet/TileLayer"
import { useMapEvents, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
const axios = require("axios").default
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    load() {
      map.locate()
    },
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

  if(!location) return null;
  
  return (
    <>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

      <div>
        <h4>Know Your Locality</h4>
        <p>
          <ul>
            <li>{`Area: ${location.region}, ${location.country_name}`}</li>
            <li>{`Timezone: ${
              location.timezone
            } (UTC${location.utc_offset.slice(0, 3)}:${location.utc_offset.slice(3, 5)})`}</li>
            <li>{`Currency: ${location.currency_name} (${location.currency})`}</li>
          </ul>
        </p>
      </div>
    </>
  )
}

export default Map
