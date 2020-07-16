import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function OnlineIDE(){
    return <iframe height="600px" width="100%" src="https://repl.it/@xHayden/CodeTraining1?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
  }


const CodePage = () => (
  <Layout>
    <SEO title="Code Online" />
    <OnlineIDE></OnlineIDE>
  </Layout>
)

export default CodePage
