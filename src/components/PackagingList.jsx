import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as localforage from "localforage";
import * as memoryDriver from "localforage-driver-memory";

localforage.defineDriver(memoryDriver);
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE, memoryDriver._driver],
  name: 'Explore-360',
  storeName: 'PackagingList',
})

const PackagingList = ({}) => {
  const [items, setItems] = useState([
    { text: "Google", packed: false },
    { text: "Google", packed: true },
  ])

  localforage.setItem("items", items)
  useEffect(() => {
    localforage
      .getItem("items")
      .then(value => {
        setItems(value)
      })
      .catch(err => {
        setItems([
          { id: 1, text: "Google", packed: false },
          { id: 2, text: "Google", packed: true },
        ])
        console.log("Nothing Found...", err)
      })
  }, [])

  const [item, setItem] = useState("")

  //   const packedItem = (index) => {
  //     const newItems = [...items]
  //     newItems[index].completed = true
  //     setItems(newItems);
  //   }


  return (
    <>
      {items.map((item, index) => (
        <ul>
          <li key={index}>
            <input type="checkbox" checked={item.completed} />{" "}
            <span>
              {item.packed ? "Packed" : null} {item.text}
            </span>
          </li>
        </ul>
      ))}

      <input type="text" value={item} onChange={e => setItem(e.target.value)} />
      <button
        onClick={() => {
          items.push({
            text: item,
            packed: false,
          })
          setItem("")
        }}
      >{" "}
        Add
      </button>
    </>
  )
}

PackagingList.propTypes = {}

export default PackagingList
