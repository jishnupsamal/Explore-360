import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as localforage from "localforage"
import * as memoryDriver from "localforage-driver-memory"

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
  })
  
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

  
  
  

  //   const packedItem = (index) => {
  //     const newItems = [...items]
  //     newItems[index].completed = true
  //     setItems(newItems);
  //   }
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
  console.log(items)
  return (
    <>
      <ul>
        {items.map(item => {
          return (
          <li key={item.id}>
            {item.text.toString()}
          </li>)
        })}
      </ul>

      <input
        type="text"
        value={itemText}
        onChange={e => setItemText(e.target.value)}
      />
      <button onClick={updateList}>Add</button>
    </>
  )
}

PackagingList.propTypes = {}

export default PackagingList
