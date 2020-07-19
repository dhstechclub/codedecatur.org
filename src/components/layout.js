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

function MobileNav() {
  
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="mobile-nav">
      <div id="left-align-nav">
      <div className="flex-container">
        <div className="hamburger-icon" onClick={() => {setOpen(!open)}}>
            <div/>
            <div/>
            <div/>
        </div>
        <div className="nav-element" id="nav-logo">
        <Link to="/"><img src={Logo} id="main-image" alt="Code Decatur"></img></Link>
        </div>
      </div>
        
        <div className={open ? "" : "hidden"}>
          <div className="nav-element">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-element">
            <Link to="/tutorials/">Tutorials</Link>
          </div>
          <div className="nav-element">
          <Link to="/blog/">Blog</Link>
          </div>
          <div className="nav-element">
            <Link to="/projects/">Projects</Link>
          </div>
          <div className="nav-element">
            <Link to="/tools/">Tools</Link>
          </div>
        </div>
      </div>
    </nav>

  );
}


function Nav() {
  return (
    <nav className="desktop-nav">
      <div id="left-align-nav">
        <div className="nav-element" id="nav-logo">
          <Link to="/"><img src={Logo} id="main-image" alt="Code Decatur"></img></Link>
        </div>
        <div className="nav-element">
          <Link to="/tutorials/">Tutorials</Link>
        </div>
        <div className="nav-element">
          <Link to="/blog/">Blog</Link>
        </div>
        <div className="nav-element">
          <Link to="/projects/">Projects</Link>
        </div>
        <div className="nav-element">
          <Link to="/tools/">Tools</Link>
        </div>
        <div className="nav-element">
          <Link to="/schedule/">Schedule</Link>
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
    <MobileNav/>
    <Nav/>
      {/**<Header siteTitle={data.site.siteMetadata.title} />**/}
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        <footer>
          <div id="footer-frame">
            Code Decatur © {new Date().getFullYear()}, Built by
            {` `}
            <a href="https://github.com/xhayden" rel="noreferrer" target="_blank">Hayden Carpenter</a>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
