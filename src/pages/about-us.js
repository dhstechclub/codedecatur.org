import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { graphql } from "gatsby"

export const query4 = graphql`
  query {
    file(relativePath: { eq: "2019/DEF-Image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 90) {
          ...GatsbyImageSharpFluid
          
        }
      }
    }
  }
`

export default function AboutUsPage({ data }){
    return <Layout>
        <SEO title="About Us"></SEO>
        <div id="about-banner">
                <h1>About Us</h1>
            </div>
        <div className="margin-more nav-spacing">
            <div className="flex-container">
                <div id="about-description">
                    <ul>
                        <li>Code Decatur is a Coding Organization created to help students at all skill levels develop the necessary skills to become experienced developers.</li>
                        <li>We are also a Coding Club at Decatur High School in Decatur, Georgia.</li>
                        <li>We offer coding <a href="/tutorials/" className="uline">tutorials</a>, and feature the <a href="/projects/" className="uline">projects</a> of students in our organization. </li>
                        <li>Our goal is to create a good sustainable Computer Science option for Decatur students.</li>
                        <li>We are Student-Driven and output a steady stream of content, both for the members of our club to use and for the public to enjoy.</li> 
                        <li>We also host competitions to encourage an innovative environment.</li>
                        <li>We meet every Wednesday to work on individual projects alongside group tutorials of all skills levels.</li>
                    </ul>
                </div>
                <div id="about-image">
                    <Img fluid={data.file.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt="Background"
                    style={{width: '100%'}}
                    ></Img>
                </div>
            </div>
            
        </div>
        
    </Layout>
}

