import React, {useEffect, useState} from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "../components/map";

const LocationPage = () => (
    <Layout>
        <Map />
    </Layout>
)

export const Head = () => <Seo title="Location Report" />

export default LocationPage;