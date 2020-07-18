import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TutorialsPage from "../components/tutorials_base.js"


const tutorials = [
    {'url': 'https://trinket.io/embed/python3/88aeefac23', 'title': "Hello World!", "desc": "An introduction to Java"},
  
  ]

const JavaPage = () => {
    return (
    <Layout>
      <SEO title="Java Tutorial" />
        <TutorialsPage tutorials={tutorials}></TutorialsPage>
    </Layout>
    );
}

export default JavaPage
