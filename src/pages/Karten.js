import React, { useState } from 'react';
import AutoCompleteText from "../components/AutoCompleteText";
import LanguageChange from "../components/LanguageChange";
import ExportCards from "../components/ExportCards";
import Layout from "../components/layout"
import SEO from "../components/seo"
//import '../components/Karten.css';
//import '../components/KartenApp.css';

const Card = props =>  {
  const [cardLeft, changeCardLeft] = useState(props.left);
  const [cardRight, changeCardRight] = useState(props.right);
  
  const handleChange = (event, box) => {
    if(box === "left"){
      changeCardLeft(event.target.value);
    }
    else {
      changeCardRight(event.target.value);
    }
    let changedValue = {"left": cardLeft, "right": cardRight, "id": props.id}
    changedValue[box] = event.target.value;
    props.changeCard(props.id, changedValue);
  }
  return (
    <div >
      <div className="card">
        <input 
          type="text" 
          value={cardLeft} 
          onChange={e => {handleChange(e, "left")}}
        />
      </div>
      <div className="card">
        <input 
          type="text" 
          value={cardRight} 
          onChange={e => {handleChange(e, "right")}}
        />
      </div>
    </div>
  );
}


const CardsList = props => {
  return (
  <div className="cardslist">
    <h1 style={{"text-align": "center"}}>{props.language}</h1>
    {props.cards.map(card => <Card key={card["id"]} id={card["id"]} changeCard={props.changeCard} {...card} />)}
  </div>
  );
};

const Form = props => {
  const [left, changeLeft] = useState('');
  const [right, changeRight] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault(); //Prevents reload of page
    props.addCard(left, right)
    changeLeft('') //Resets fields
    changeRight('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="addcardbox"> 
        <AutoCompleteText to={props.to} from={props.from} field="left" value={left} placeholder="From" changeLeft={changeLeft} changeRight={changeRight} required/> {/** This is potentially buggy as it combines two react classes w/o much testing. That is why the old code is commented out. */}
        <AutoCompleteText to={props.from} from={props.to} field="right" value={right} placeholder="To" changeLeft={changeLeft} changeRight={changeRight} required/>
        <button id="addcard">ADD CARD</button> 
        {/** This is potentially buggy as it combines two react classes w/o much testing. That is why the old code is commented out. */}
        {/**<input
          type="text"
          placeholder="Squirrel"
          value={left}
          onChange={event => changeLeft(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Eichhörnchen"
          value={right}
          onChange={event => changeRight(event.target.value)}
          required
        />**/}
        </div>
      </form>
    </div>
  );
}


function getLanguageName(id) {
  let languages = {"af":"Afrikaans","am":"Amharic","ar":"Arabic","az":"Azerbaijani","ba":"Bashkir","be":"Belarusian","bg":"Bulgarian","bn":"Bengali","bs":"Bosnian","ca":"Catalan","ceb":"Cebuano","cs":"Czech","cv":"Chuvash","cy":"Welsh","da":"Danish","de":"German","el":"Greek","en":"English","eo":"Esperanto","es":"Spanish","et":"Estonian","eu":"Basque","fa":"Persian","fi":"Finnish","fr":"French","ga":"Irish","gd":"Scottish Gaelic","gl":"Galician","gu":"Gujarati","he":"Hebrew","hi":"Hindi","hr":"Croatian","ht":"Haitian","hu":"Hungarian","hy":"Armenian","id":"Indonesian","is":"Icelandic","it":"Italian","ja":"Japanese","jv":"Javanese","ka":"Georgian","kk":"Kazakh","km":"Khmer","kn":"Kannada","ko":"Korean","ky":"Kyrgyz","la":"Latin","lb":"Luxembourgish","lo":"Lao","lt":"Lithuanian","lv":"Latvian","mg":"Malagasy","mhr":"Mari","mi":"Maori","mk":"Macedonian","ml":"Malayalam","mn":"Mongolian","mr":"Marathi","mrj":"Hill Mari","ms":"Malay","mt":"Maltese","my":"Burmese","ne":"Nepali","nl":"Dutch","no":"Norwegian","pa":"Punjabi","pap":"Papiamento","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","sah":"Yakut","si":"Sinhalese","sk":"Slovak","sl":"Slovenian","sq":"Albanian","sr":"Serbian","su":"Sundanese","sv":"Swedish","sw":"Swahili","ta":"Tamil","te":"Telugu","tg":"Tajik","th":"Thai","tl":"Tagalog","tr":"Turkish","tt":"Tatar","udm":"Udmurt","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","vi":"Vietnamese","xh":"Xhosa","yi":"Yiddish","zh":"Chinese"}
  let lang = languages[id];
  if(lang === undefined){
    return "";
  }
  return lang;
}

function Karten() {
  const [cards, setCards] = useState([]);
  const [languageFrom, setLanguageFrom] = useState('en');
  const [languageTo, setLanguageTo] = useState('de');
  const [currentID, changeCurrentID] = useState(0); //If I work on this in the future, I should change the structure of this.
  // Currently it uses a bad indexing method
  const changeCard = (index, newVal) => { //Function to change the state of the cards content. High level for access in other Components.
    console.log(newVal)
    cards[index] = newVal;
    setCards(cards)
  }
  const addCard = (left, right) => {
    setCards([...cards, {"left": left,"right": right, "id": currentID}]);
    changeCurrentID(currentID + 1);
    getLanguageName("en")
  }
  return (
    <Layout>
      <SEO title="Karten Flashcards" />
    <div className="nav-spacing">
      <LanguageChange changeFrom={setLanguageFrom} changeTo={setLanguageTo} from={languageFrom} to={languageTo} />
      <CardsList language={`${getLanguageName(languageFrom)} <-> ${getLanguageName(languageTo)}`} cards={cards} changeCard={changeCard}/>
      <Form addCard={addCard} from={languageFrom} to={languageTo}/>
      <ExportCards cards={cards}/>
    </div>
    </Layout>

  );
}

export default Karten;
