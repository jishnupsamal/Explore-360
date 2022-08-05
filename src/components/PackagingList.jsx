import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as localforage from "localforage"
// import * as memoryDriver from "localforage-driver-memory"

// localforage.defineDriver(memoryDriver)
localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ],
  name: "Explore-360",
  storeName: "PackagingList",
})

const PackagingList = ({}) => {
  const [items, setItems] = useState([
    { text: "Clothes", packed: false },
    { text: "Hiking Boot", packed: false },
    { text: "Backpack Tent", packed: false },
  ])
  if (typeof window !== "undefined") {
    localforage.setItem("items", items)
  }
  useEffect(() => {
      localforage
        .getItem("items")
        .then(value => {
          setItems(value)
        })
        .catch(err => {
          setItems([
            { text: "Clothes", packed: false },
            { text: "Hiking Boot", packed: false },
            { text: "Backpack Tent", packed: false },
          ])
          console.log("Nothing Found...", err)
        })
  }, [])
  const [itemText, setItemText] = useState("")

  //   const packedItem = (index) => {
  //     const newItems = [...items]
  //     newItems[index].completed = true
  //     setItems(newItems);
  //   }

  return (
    <>
      {items.map((item, index) => (
        <ul>
          <li key={index} id={index}>
            <input type="checkbox" checked={item.completed} />{" "}
            <span>
              {item.packed ? "Packed" : null} {item.text}
            </span>
          </li>
        </ul>
      ))}

      <input type="text" value={itemText} onChange={e => setItemText(e.target.value)} />
      <button
        onClick={() => {
          items.push({
            text: itemText,
            packed: false,
          })
          setItemText("")
        }}
      >
        {" "}
        Add
      </button>
    </>
  )
}

PackagingList.propTypes = {}

export default PackagingList
