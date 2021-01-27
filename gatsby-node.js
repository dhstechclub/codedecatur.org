/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { node } = require("prop-types")

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const courseTemplate = require.resolve(`./src/templates/courseTemplate.js`)
    const blogTemplate = require.resolve(`./src/templates/blogTemplate.js`)
    const introTemplate = require.resolve(`./src/templates/introTemplate.js`)
  
    const courseResult = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { fileAbsolutePath: {regex : "\/courses/"} },
          limit: 1000,
        ) {
          edges {
            node {
              frontmatter {
                slug
                language
                title
              }
            }
          }
        }
      }
    `)

    const blogResult = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { fileAbsolutePath: {regex : "\/blog/"} },
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)

    const introResult = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { fileAbsolutePath: {regex : "\/courses/intros/"} },
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
                language
                title
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (courseResult.errors || blogResult.errors || introResult.errors ) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    
    courseResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let slugString;
      if(node.frontmatter.slug == undefined || node.frontmatter.slug == ""){
        slugString = `/tutorials/${node.frontmatter.language}/${node.frontmatter.title}`;
        slugString = slugString.replace(/\s/g, '-').toLowerCase();
        slugString = encodeURI(slugString);
      }
      else {
        slugString = node.frontmatter.slug;
      }

      createPage({
        path: slugString,
        component: courseTemplate,
        context: {
          // additional data can be passed via context
          title: node.frontmatter.title,
        },
      })
    })

    introResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: introTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })

    blogResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let slugString;
      if(node.frontmatter.slug == undefined || node.frontmatter.slug == ""){
        slugString = `/blog/${node.frontmatter.title}`;
        slugString = slugString.replace(/\s/g, '-').toLowerCase();
        slugString = encodeURI(slugString);
      }
      else {
        slugString = node.frontmatter.slug;
      }
      createPage({
        path: node.frontmatter.slug,
        component: blogTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}