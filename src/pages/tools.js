import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"




const ToolsPage = () => (
  <Layout>
    <SEO title="Tools" />
    <div className="nav-spacing margin">
        <h1 className="pixel-font" style={{"font-size": "60px"}}>Tools</h1>
        <ul><Link to="/karten/"><h3>Karten - Quick Flashcards for Different Languages</h3></Link></ul>
        <p>*Ask and we'll add your tool!</p>
    </div>
  </Layout>
)

export default ToolsPage
