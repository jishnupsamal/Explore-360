import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from "react-leaflet/TileLayer"
import { useMapEvents, useMap, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

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
    fetch("https://ipapi.co/json/?fields=582143").then().catch()
  })
  return (
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
  )
}

export default Map
