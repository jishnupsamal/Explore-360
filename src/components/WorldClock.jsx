import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Moment from "react-moment"
import "moment-timezone"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "react-bootstrap/Card"

const WorldClock = ({}) => {
  const [data, setData] = useState("")

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/?fields=582143")
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(data.utc_offset)
  console.log(data.country_name)
  return (
    <>
      <Card border="success" className="text-center d-flex justify-content-center">
        <Card.Body>
          <Card.Title width="3rem" as="h2">
            <Moment
              format="hh [:] mm [:] ss a"
              interval={1000}
              tz={`${data.utc_offset}`}
            />
          </Card.Title>
        </Card.Body>
        <Card.Footer>{data.country_name}</Card.Footer>
      </Card>
    </>
  )
}

WorldClock.propTypes = {}

export default WorldClock
