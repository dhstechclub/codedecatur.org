/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
//import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
//import Header from "./header"
import "./layout.css"
import "./base.css"
import Logo from "../images/codecatur.png"


function Nav() {
  return (
    <nav>
      <div id="left-align-nav">
        <div className="nav-element">
          <Link to="/"><img src={Logo} id="main-image" alt="Code Decatur"></img></Link>
        </div>
        <div className="nav-element">
          <Link to="/tutorials">Tutorials</Link>
        </div>
        <div className="nav-element">
          <Link to="/projects">Projects</Link>
        </div>
        <div className="nav-element">
          <Link to="/schedule">Schedule</Link>
        </div>
      </div>
    </nav>
  );
}


const Layout = ({ children }) => {
  /**const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)*/

  return (
    <>
    <Nav/>
      {/**<Header siteTitle={data.site.siteMetadata.title} />**/}
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        <footer>
          <h1 className="footer-name">Code Decatur </h1> © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://github.com/xhayden" rel="noreferrer" target="_blank">Hayden Carpenter</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
