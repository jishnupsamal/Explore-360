import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as localforage from "localforage"
import * as memoryDriver from "localforage-driver-memory"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import { BsPlusLg } from "react-icons/bs"
import { MdDelete } from "react-icons/md"

localforage.defineDriver(memoryDriver)
localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
    memoryDriver._driver,
  ],
  name: "Explore-360",
  storeName: "PackagingList",
})

const PackagingList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Clothes", packed: false },
    { id: 2, text: "Hiking Boot", packed: false },
    { id: 3, text: "Backpack Tent", packed: false },
  ])
  const [itemText, setItemText] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      localforage.setItem("items", items)
    }
  }, [items])

  useEffect(() => {
    localforage
      .getItem("items")
      .then(values => {
        setItems(values)
        return items
      })
      .catch(err => {
        console.log("Nothing Found...", err)
      })
  }, [])

  const updateList = () => {
    items.push({
      id: Object.keys(items).length + 1,
      text: itemText,
      packed: false,
    })
    if (typeof window !== "undefined") {
      localforage.setItem("items", items)
    }
    setItemText("")
  }

  const markPacked = index => {
    const newItems = [...items]
    newItems[index].packed = true
    console.log(newItems)
    setItems(newItems)
  }

  console.log(items)
  return (
    <>
      {/* { items !== null && ( */}
      <div class="row">
        <div className="form-floating col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="Something..."
            value={itemText}
            onChange={e => setItemText(e.target.value)}
          />
          <label>Items to Pack...</label>
        </div>

        <Button variant="outline-secondary" className="col-md-4" onClick={updateList}>
          {" "}
          <BsPlusLg style={{ fontSize: "1.1rem" }} />
        </Button>
      </div>
      {items !== null && (
        <ul style={{ listStyleType: "none" }}>
          {items.map((item, index) => {
            return (
              <li
                key={item.id}
                className="my-3"
              >
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={e => markPacked(index)}
                />
                <label className="mx-3" 
                style={{ textDecoration: item.packed && "line-through" }}>{item.text}</label>
                <Button
                  variant="danger"
                  className="ms-5"
                  onClick={() => {
                    setItems(items.filter(i => i.id !== item.id))
                  }}
                >
                  <MdDelete style={{ fontSize: "1.1rem" }} />
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

PackagingList.propTypes = {}

export default PackagingList
