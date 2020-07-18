import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"


export default function Template({ data, }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
        <div className="course-container margin nav-spacing">
            <div className="course">
                <h1>{frontmatter.title}</h1>
                <table style={{"width": "30%"}}>
                    <tr>
                        <td><h4>{frontmatter.date}</h4></td>
                        <td><h4>By {frontmatter.author}</h4></td>
                    </tr>
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
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
      }
    }
  }
`