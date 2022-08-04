import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Header from "../components/header";
const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Explore 360</h1>
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
