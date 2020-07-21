module.exports = {
  siteMetadata: {
    title: `Code Decatur`,
    description: `Code Decatur is a Coding Organization created to help students at all skill levels develop the necessary skills to become an experienced developer. We are also a Coding Club at Decatur High School in Decatur, Georgia 30030. We offer coding tutorials, and feature the projects of students in our organization. Our goal is to create a good sustainable Computer Science option for Decatur students. We offer tutorials on Python, Javascript, C#, Java, Assembly, and more! We are Student-Driven and output a steady stream of content, both for the members of our club to use and for the public to enjoy. We also host competitions to encourage an innovative environment. We meet every Wednesday to work on individual projects alongside group tutorials of all skills levels. `,
    url: "https://codedecatur.org",
    author: `Hayden Carpenter`,
    siteUrl: `https://codedecatur.org`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/pc.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `courses`,
        path: `${__dirname}/src/courses`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
