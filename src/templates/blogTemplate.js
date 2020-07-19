import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import SEO from "../components/seo";
deckDeckGoHighlightElement();


export default function Template({ data, }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  let featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid


  return (
    <Layout>
      <SEO title={frontmatter.title} author={frontmatter.author}/>
        <div className="course-container nav-spacing">
            <div className="course">
                <h1>{frontmatter.title}</h1>
                <table>
                  <tbody>
                      <tr>
                          <td><h4>{frontmatter.date}</h4></td>
                      </tr>
                      <tr>
                      </tr>
                  </tbody>
                </table>  
                <div className="featured-image"><Img fluid={featuredImgFluid} /></div>    
                <div
                className="course-content"
                dangerouslySetInnerHTML={{ __html: html }}
                />
                
            </div>
        </div>
    </Layout>
    
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`