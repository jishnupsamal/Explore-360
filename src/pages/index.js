import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import WorldClock from "../components/WorldClock";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Explore 360</h1>
    <WorldClock />
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
