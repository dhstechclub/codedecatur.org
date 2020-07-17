import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"




const ToolsPage = () => (
  <Layout>
    <SEO title="Tools" />
    <div className="nav-spacing margin">
        <h1>Tools</h1>
        <h3>These tools have been created by Code Decatur members.</h3>
        <ul><Link to="/karten/">Karten - Quick flashcards for different languages</Link></ul>
        <p>*Ask and we'll add your tool!</p>
    </div>
  </Layout>
)

export default ToolsPage
