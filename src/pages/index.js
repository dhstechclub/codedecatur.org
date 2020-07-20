import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DiscordLogo from "../images/discord.png"
import FacebookLogo from "../images/facebook.png"
import InstagramLogo from "../images/instagram.png"
import GithubLogo from "../images/github.png"
import Potion from "../images/healthpotion.webm"
import "../components/global.css"
import { Link } from "gatsby"
import Img from "gatsby-image"



function MediaSubsection(props){
  return (
      <div className="media-block">
        <h2>{props.title}</h2>
        {props.info}
      </div>
    );
}


function Media(){
  return (
    <div className="flex-container media-container">
      <MediaSubsection title="2019" info={<div><p>We were founded in 2019 under the name Cybersecurity Club. We participated in <a href="https://picoctf.com" rel="noreferrer" target="_blank">PicoCTF 2019</a>, a 'hacking' competition between high school students known as <a href="ctf">Capture the Flag</a>.</p></div>}/>
      <MediaSubsection title="2020" info={<div><p>Our 2020 Year will start off with some coding challenges we will host here, at <span className="purple">codedecatur.org</span>. 
      Those challenges will come out periodically <Link to="/tutorials/">here</Link>. The content is student-driven and created by our members, as is all of the content on this site.</p></div>}/>
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


const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Homepage" name="Code Decatur"></SEO>
    <div className="App">
      <div id="introduction" >
      <div style={{paddingBottom: 40}}>
        <Img fluid={data.file.childImageSharp.fluid}
        objectFit="cover"
        objectPosition="50% 50%"
        alt="Background"
        style={{height: '13vw', width: '100%'}}
        ></Img>
      </div>
        
        {//<img src={Background} id="banner-img" alt="Pixelart Banner"></img>
        }
        <div className="main-desc">
          <h1 className="pixel-font">{'Code Decatur'}</h1>
          <div id="inner-desc">
            <p>We offer hands-on coding experience for all ranges of <br/>skill with our interactive lessons and activities.</p>
            <p> From beginner to expert, our club will help you<br/>develop your skills in a no-pressure environment.</p>
          </div>
          <hr></hr>
        </div>
      </div>
      <Media/>
      <video autoPlay muted loop playsInLine style={{"height": '160px', marginBottom: '30px'}}><source src={Potion} type="video/webm" /></video>

      <hr></hr>
      <Socials/>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    file(relativePath: { eq: "indexback.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1500, quality: 90) {
          ...GatsbyImageSharpFluid
          
        }
      }
    }
  }
`

export default IndexPage