import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import WorldClock from "../components/WorldClock";
import Weather from "../components/Weather";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Explore 360</h1>
    <WorldClock />
    <Weather />
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
