import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import SEO from "../components/seo"
deckDeckGoHighlightElement();


export default function Template({ data, }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} author={frontmatter.author}/>
        <div className="course-container nav-spacing">
            <div className="course">
                <h1>{frontmatter.title}</h1>
                <table style={{"width": "30%"}}>
                  <tbody>
                      <tr>
                          <td><h4>{frontmatter.date}</h4></td>
                          <td><h4>By {frontmatter.author}</h4></td>
                      </tr>
                  </tbody>
                </table>            
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
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        date
        title
        author
      }
    }
  }
`