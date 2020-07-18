import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"




const ToolsPage = () => (
  <Layout>
    <SEO title="Tools" />
    <div className="nav-spacing margin">
        <h1 className="pixel-font">Tools</h1>
        <hr></hr>
        <ul><Link to="/karten/"><h3>Karten - Quick Flashcards for Different Languages</h3></Link></ul>
    </div>
  </Layout>
)

export default ToolsPage
