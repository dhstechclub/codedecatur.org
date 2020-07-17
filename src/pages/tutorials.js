import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

function OnlineIDE(props){
    return <iframe src={props.url} width="100%" className="ide" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
}

function Tutorial(props){
  return (<div>
    <h2>{props.title}</h2>
  <p>{props.desc}</p>
    <OnlineIDE url={props.url}/>
  </div>);
}

const tutorials = [
  {'url': 'https://trinket.io/embed/python3/88aeefac23', 'title': "Hello World!", "desc": "An introduction to Python"},
  {'url': 'https://trinket.io/embed/python3/70a2b36461', 'title': "Variables", "desc": "Add numbers with variables"},
  {'url': 'https://trinket.io/embed/python3/83b5f93350', 'title': "Strings", "desc": "Hanging on by a thread"},
  {'url': 'https://trinket.io/embed/python3/85d8540699', 'title': "Casting", "desc": "Cast it aside"},
  {'url': 'https://trinket.io/embed/python3/c5352637af', 'title': "Lists", "desc": "Karl Barx"},
  {'url': 'https://trinket.io/embed/python3/f467749abb', 'title': "If Statements", "desc": "AI in a box"},
  {'url': 'https://trinket.io/embed/python3/682732fad3', 'title': "While Loops", "desc": "Self-proclaimed best loop NA"},
  {'url': 'https://trinket.io/embed/python3/7ec6e19d56', 'title': "For Loops", "desc": "If I had a nickel for i in range(100), i'd have $5.00"},
  {'url': 'https://trinket.io/embed/python3/9d465e96e9', 'title': "Functions", "desc": "Functions? I hardly know her!"},
  {'url': 'https://trinket.io/embed/python3/faa497cf91', 'title': "Functions: Demo", "desc": "I'm a new addition to your story :)"},
  {'url': 'https://trinket.io/embed/python3/c1ffcc43c9', 'title': "User Input", "desc": "Sometimes it's better to not give users a choice"},
  {'url': 'https://trinket.io/embed/python3/b5877d9501', 'title': "Scope", "desc": "Anything more is out of the scope of this course."},
]


const TutorialsPage = () => {
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
      <SEO title="Code Online" />
      <div className="tutorials-frame flex-container">
        <div className="tutorial-row tutorial-navigation">
          <TutorialSelection/>
            <div>
              <NextTutorialButton/>
              <PreviousTutorialButton/>
          </div>    
        </div>
        <div className="tutorial-row tutorials"> 
          <Tutorial url={tutorials[currentTutorial].url} title={tutorials[currentTutorial].title} desc={tutorials[currentTutorial].desc}/>
        </div>
      </div>
      
      
    </Layout>
  );
}

export default TutorialsPage
