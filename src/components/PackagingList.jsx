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

  const markPacked = (index) => {
    const newItems = [...items];
    newItems[index].packed =  true;
    console.log(newItems)
    setItems(newItems);
  };

  console.log(items)
  return (
    <>
      <input
        type="text"
        value={itemText}
        onChange={e => setItemText(e.target.value)}
      /> {'   '}
      <button onClick={updateList}>Add</button>
      <ul style={{listStyleType: 'none'}}>
        {items.map((item, index) => {
          return <li key={item.id} style={{ textDecoration: item.packed && "line-through"}}>
            <input type="checkbox" checked={item.packed} onChange={(e) => markPacked(index)} /> {' '}
            {item.text} {' '}
            <button onClick={() => {
              setItems(
                items.filter(i =>
                  i.id !== item.id
                )
              );
            }}>
              Delete
            </button>
          
          </li>
        })}
      </ul>
    </>
  )
}

PackagingList.propTypes = {}

export default PackagingList
