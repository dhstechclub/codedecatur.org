import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DiscordLogo from "../images/discord.png"
import FacebookLogo from "../images/facebook.png"
import InstagramLogo from "../images/instagram.png"
import GithubLogo from "../images/github.png"
import "../components/global.css"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { graphql } from "gatsby"
let images = {}

function MediaSubsection(props){
  return (
    <div className="flex-container media-sub-container">
      <div className="media-block">
          <h2>{props.title}</h2>
          {props.info}
          
      </div>
      <div className="image-block">
      <Img fluid={images[props.image]}
                alt={props.image}
      ></Img>
      </div>
      
    </div>
      
    );
}


function Media(){
  return (
    <div className="media-container">
      <MediaSubsection title="2019" image="2019logo.png" info={<div><p>We were founded in 2019 under the name Cybersecurity Club. We participated in <a href="https://picoctf.com" rel="noreferrer" target="_blank">PicoCTF 2019</a>, a 'hacking' competition between high school students known as <a href="ctf">Capture the Flag</a>.</p></div>}/>
      <MediaSubsection title="2020" image="favicon.png" info={<div><p>Our 2020 Year will start off with some coding challenges we will host here, at <a href="https://codedecatur.org">codedecatur.org</a>. 
      Those challenges will come out periodically on our <Link to="/tutorials/">tutorials page</Link>. The content is student-driven and created by our members, as is all of the content on this site.</p></div>}/>
    </div>
    
  );
}


const Socials = () => {
  return <div className="flex-container center socials">
    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/codecatur/"><img src={InstagramLogo} alt="Instagram Logo"/></a>
    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/code.decatur.5"><img src={FacebookLogo} alt="Facebook Logo"/></a>
    <a target="_blank" rel="noreferrer" href="https://discord.gg/8HVZDaE"><img src={DiscordLogo} alt="Discord Logo"/></a>
    <a target="_blank" rel="noreferrer" href="https://github.com/"><img src={GithubLogo} alt="Github Logo"/></a>
  </div>
}


const IndexPage = ({ data }) => {

  data.allFile.edges.map((edge) => {
    let i = edge.node.childImageSharp.fluid
    images[i.originalName] = i
  })

  return (
    <Layout>
      <SEO title="Homepage" name="Code Decatur"></SEO>
      <div className="App">
        <div id="introduction" >
          <div className="main-desc">
            <div id="mainpage-image-mobile">
              <Img fluid={images["DEF-Image.jpg"]}
                objectFit="cover"
                objectPosition="50% 50%"
                alt="DEF Image from 2019 Mobile"
                style={{width: '100%'}}
              ></Img>
            </div>
            <div className="flex-container" style={{height: "100%"}}>
              <div id="tagline-frame">
                <h1 style={{marginRight: "auto", textAlign: "left"}}>Innovation begins<br/>with education</h1>
                <div id="inner-desc">
                  <p>Our club offers hands-on coding experience for all skill levels with our interactive lessons and activities.</p>
                  <p>Whether you're a beginner or an expert, we'll help you develop your skills in a no-pressure environment and create projects worth sharing.</p>
                  <br/>
                  <button id="learn-button"><Link to="/about-us">ABOUT US</Link></button>
                </div>
              </div>
              <div id="mainpage-image">
              <Img fluid={images["DEF-Image.jpg"]}
                objectFit="cover"
                objectPosition="50% 50%"
                alt="DEF Image from 2019 Desktop"
                style={{width: '100%'}}
              ></Img>
              </div>
            </div>
          </div>
        </div>
        <Media/>
        <Socials/>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allFile(filter: {absolutePath: {regex: "images/index/"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 800, quality: 90) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`



export default IndexPage