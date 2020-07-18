import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div class="margin nav-spacing">
      <h1>NOT FOUND</h1>
      <p>The page you requested does not exist.</p>
    </div>
    
  </Layout>
)

export default NotFoundPage
