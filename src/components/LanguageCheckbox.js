import React from 'react';
export default class LanguageCheckbox extends React.Component {

    constructor (props) {
        super(props)
        this.language = props.language;
        this.langs = props.langs;
        this.setlangs = props.setlangs;
        this.state = {
        }
    }
    toggleLanguage = (langArr, lang, checkboxName) => {
        langArr[lang] = !langArr[lang]
        let currentState = langArr[lang]
        
        let langElements = document.getElementsByClassName(lang);
        for(let i = 0; i < langElements.length; i++){
            if(currentState){
                langElements[i].style.display = 'block';
                document.getElementById(checkboxName).style["backgroundColor"] = 'rgba(0, 255, 0, 0.2)';
                
            }
            else {
                langElements[i].style.display = 'none';
                document.getElementById(checkboxName).style["backgroundColor"] = 'rgba(255, 0, 0, 0.2)';
            }
            
        }
        return langArr
    }   
    render () {

        let checkboxName = `${this.language}-checkbox`;
        let labelName = `${this.language}-label`;
        let langUpper = this.language.charAt(0).toUpperCase() + this.language.slice(1)
        if(langUpper === "Csharp"){
            langUpper = "C#";
        } else if(langUpper === "Cplusplus"){
            langUpper = "C++";
        } 
        
        return (
            <button style={{'marginRight': "20px", 'backgroundColor': 'rgba(0, 255, 0, 0.2)'}} onClick={
                () => this.setlangs(
                    this.toggleLanguage(
                        this.langs, 
                        this.language, 
                        checkboxName
                        )
                    )
                } 
                id={checkboxName}>
                <p htmlFor={checkboxName} id={labelName} style={{'marginBottom': 0}}>{langUpper}</p>
            </button>
        )

    }
}