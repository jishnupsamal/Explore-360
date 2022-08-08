import React from "react"
import "@fontsource/comfortaa"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PackagingList from "../components/PackagingList"
import * as style from "../components/index.module.css"

const Packaging = () => {
  return (
    <>
      <Layout>
        <h1 className={`${style.heading}`}>Bag Pack</h1>
        <PackagingList />
      </Layout>
    </>
  )
}

export const Head = () => <Seo title="Bag Pack" />

export default Packaging
