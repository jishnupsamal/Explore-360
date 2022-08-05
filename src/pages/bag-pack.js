import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PackagingList from "../components/PackagingList"

const Packaging = () => {
  return (
    <>
      <Layout>
        <h1>Bag Pack</h1>
        <PackagingList />
      </Layout>
    </>
  )
}

export const Head = () => <Seo title="Bag Pack" />

export default Packaging
