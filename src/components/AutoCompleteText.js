import React from 'react';
//Tutorial used: 
//React Beginners Tutorial - Build an Autocomplete Text Box
//by freeCodeCamp.org
//https://www.youtube.com/watch?v=NnpISZANByg


export default class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            suggestions: [],
            translations: [],
        }
    }
    async requestTranslation(from = "en", to = "de", text) {
        text = encodeURI(text);
        let key = 'trnsl.1.1.20200418T232246Z.b7edff6ecbcb555e.4db2c669dd3fe2634cc4336e540c0ef7a7f9cdb1' //My API key (free)
        let lang = (from + '-' + to)
        let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}`)
        let data = await response.json()
        return data;
    }

    attemptTranslate(e){
        const val = e.target.value;
        setTimeout(() => { //Waits to see if you're done typing, at least a little bit. 
            if(this.props.value === val){
                this.requestTranslation(this.props.from, this.props.to, val).then(data => {
                    this.setState(() => ({
                        translations: data["text"],
                    }))
                    
                    let suggestions = [];
                    if (val.length > 1){
                        //const regex = new RegExp(`^${val}`, 'i'); //Find values starting w/ val in text box
                        const { translations } = this.state;
                        suggestions = translations;
                        //console.log(translations)
                        //suggestions = translations.sort().filter(v => regex.test(v))
                    }
                    this.setState(() => ({suggestions}))
                    }
                ) 
            }
        }, 200)

    }

    onTextChanged = (e) => {
        /*
        On change of text, update the text in the box (React won't allow you to change the text if it's a state w/o management of that state)
        Then attempt to translate that text if it has been there for longer than 200ms (set in the setTimeout in the attemptTranslate function)
        */
        const val = e.target.value;
        this.updateForForm(val) 
        //this.setState(() => ({text: val})) //instead of this, call function to change parent text of this component.
        if(val.length > 0){
            this.attemptTranslate(e)
        }
    }

    updateForForm = (val, useOther = false) => {
        let toChange = this.props.field;
        if(useOther){
            toChange = (toChange === "left") ? "right" : "left";
        }
        if(toChange === "left"){
            this.props.changeLeft(val)
        }
        else if(toChange === "right"){
            this.props.changeRight(val)
            //console.log(val)
        }
    }

    suggestionSelected (value) {
        this.setState(() => ({
            suggesions: [],
        }))
        this.updateForForm(value, true)
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if(!suggestions){
            return (
                <ul>
                <li className="recommendation">Request failed. Check language.</li> {/**Language not found or request invalid**/}
                </ul>
            )
        }
        if(suggestions.length === 0){ //Check if suggestions arr is empty
            return null
        }
        else {
            return (
                <ul>
                    {suggestions.map((item) => <li className="recommendation" onClick={() => this.suggestionSelected(item)}>{item}</li>)} {/**Create an element for every item in suggesions array**/}
                </ul>
            )
        }
    }

    render () {
        return (
            <div className="inputBlock">
                <input type="text" value={this.props.value} onChange={this.onTextChanged} placeholder={this.props.placeholder}/>
                {this.renderSuggestions()}
            </div>
        )
    }
}