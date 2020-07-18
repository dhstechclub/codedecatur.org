import React, { useState } from "react"

function OnlineIDE(props){
    return <iframe src={props.url} width="100%" className="ide" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen title="Trinket IDE"></iframe>
}

function Tutorial(props){
  return (<div>
    <h2>{props.title}</h2>
  <p>{props.desc}</p>
    <OnlineIDE url={props.url}/>
  </div>);
}

const TutorialsPage = (props) => {
  const tutorials = props.tutorials
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
      <div className="tutorials-frame flex-container nav-spacing">
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
  );
}

export default TutorialsPage
