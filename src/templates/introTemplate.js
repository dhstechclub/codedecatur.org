import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

function OnlineIDE(props){
    return <iframe src={props.url} width="100%" className="ide" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen title="Trinket IDE"></iframe>
}


function Tutorial(props){
  return (<div>
    <h2>{props.title}</h2>
  <p>{props.desc}</p>
    <OnlineIDE url={props.url}/>
  </div>);
}

export default function Template ({ data, }) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    const tutorials = frontmatter.tutorials

  const [currentTutorial, setcurrentTutorial] = useState(0)

  const TutorialSelection = () => {
    var tutorialElements = tutorials.map((value, index) => {
      return (
        <li><button onClick={() => setcurrentTutorial(index)}>
        {value.title}
        </button></li>
      );
    });
  return <ol>{tutorialElements}</ol>
  }

  const NextTutorialButton = () => {
    if((currentTutorial + 1) < tutorials.length){
      return (
        <button onClick={() => setcurrentTutorial(currentTutorial + 1)}>
        Next Tutorial
        </button>
      );
    }
    else return null;
  }

  const PreviousTutorialButton = () => {
    if((currentTutorial) > 0){
      return (
        <button onClick={() => setcurrentTutorial(currentTutorial - 1)}>
        Previous Tutorial
        </button>
      );
    }
    else return null;
  }

  return (
    <Layout>
    <SEO title={frontmatter.title}/>
    <div className="tutorials-frame nav-spacing">
            <div className=" flex-container ">
                <div className="tutorial-row tutorial-navigation">
                    <TutorialSelection/>
                    <div>
                        <NextTutorialButton/>
                        <PreviousTutorialButton/>
                    </div>    
                </div>
                <div className="tutorial-row tutorials"> 
                    <Tutorial url={tutorials[currentTutorial].url} title={tutorials[currentTutorial].title} desc={tutorials[currentTutorial].desc}/>
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                </div>
            </div>
        </div>
    </Layout>
      
  );
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
        tutorials {
            desc
            title
            url
          }
      }
    }
  }
`