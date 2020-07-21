import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import query from "./index"

export default function CTFPage(){
    return <Layout>
        <SEO title="Capture the Flag"></SEO>
        <div className="margin nav-spacing">
            <h1>Capture the Flag</h1>
        </div>
    </Layout>
}