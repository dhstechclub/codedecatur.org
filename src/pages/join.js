import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function JoinPage() {
    return <Layout>
        <SEO title="Join Us"/>
        <div className="margin nav-spacing">
            <h1>
                Join us!
            </h1>
            <p>
                We are currently operating as a club at Decatur High School.
            </p>
            <p>
                We have meetings on Wednesdays, but due to COVID-19, we are exclusively online, using this site and our Discord linked below.<br/>
            </p>
            <p>
                Keep up to date about our status on <Link to="/blog">our blog</Link>.
            </p>
            <a href="https://discord.gg/8HVZDaE" target="_blank" rel="norefferer">Join us on Discord!</a>
            <p>

            </p>
            
        </div>

    </Layout>
}