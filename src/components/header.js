import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import NavBar from "./navbar"

const Header = ({ siteTitle }) => (
  <header
  >
    <Link
      to="/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      <NavBar siteTitle={siteTitle}/>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
