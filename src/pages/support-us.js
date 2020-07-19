import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function SupportUsPage() {
    return <Layout>
        <SEO title="Support Us"/>
        <div className="margin nav-spacing">
            <h1>
                Support us!
            </h1>
            <p>
                We are always looking for opportunities to expand and improve upon our club's experience.<br/>
                Your support helps us accomplish our mission of providing a steady stream of quality content and growth for our members.<br/><br/>
                Access to new technologies allows us to help prepare students for their college life and beyond.
            </p>
            <p>
                Thank you for caring about Computer Science and STEM here in Decatur.
            </p>
            <p>
                Currently, we do not have donations and sponsorships set up.<br/>Feel free to email us at either <a className="uline" href="mailto:93haydcarp@csdecatur.net">93haydcarp@csdecatur.net</a> or <a className="uline"  href="mailto:codedecatur@gmail.com"> codedecatur@gmail.com</a>.
            </p>
            <table id="support-us-table" className="pixel-font">
                <td><button><a href="">Donate</a></button></td>
                <td><button><a href="mailto:93haydcarp@csdecatur.net">Sponsor us</a></button></td>
                <td><button><a href="mailto:93haydcarp@csdecatur.net">Become a Mentor</a></button></td>
            </table>
            
        </div>

    </Layout>
}