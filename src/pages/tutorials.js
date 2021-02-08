import React, { useState, } from "react"
import TagsBox from "../components/TagsBox"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"


const NewTutorialPage = () => {
  return <Layout>
    <SEO title="Tutorials" />
    <div className="nav-spacing margin">
        <h1 className="pixel-font">Tutorials</h1>
        <TagsBox></TagsBox>
        <table>
            <StaticQuery query={graphql`  
                            query CoursesQuery {
                                allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/courses/"}}, sort: {fields: frontmatter___difficulty, order: ASC}) {
                                    nodes {
                                        frontmatter {
                                            slug
                                            date
                                            author
                                            title
                                            language
                                            difficulty
                                            description
                                        }
                                    }
                                }
                            }
                        `}
            render={data => {
                return <tbody>
                    {data.allMarkdownRemark.nodes.map((node) => {
                        let slug;
                        if(node.frontmatter.slug === undefined || node.frontmatter.slug === ""){
                            slug = `/tutorials/${node.frontmatter.language}/${node.frontmatter.title}`;
                            slug = slug.replace(/\s/g, '-').toLowerCase();
                            slug = encodeURI(slug);
                        }
                        else {
                            slug = node.frontmatter.slug;
                        }
                        let stars = 'Difficulty: '
                        for(let i = 0; i < node.frontmatter.difficulty; i++){
                            stars += '⭐';
                        }
                        return <tr>
                                <td className={`blog-preview ${node.frontmatter.language}`}>
                                <div>
                                
                                    <Link className="link-to-blog" to={slug} key={slug}>{node.frontmatter.title}</Link><br/>
                                    {node.frontmatter.date}<br/>
                                    By {node.frontmatter.author}<br/>
                                    {stars}<br/>
                                    {node.frontmatter.description}
                                </div>
                            </td>
                        </tr>
                    })}
                    
                </tbody>
            }}  
            />
        </table>
    </div>
    </Layout>
 }

export default NewTutorialPage
