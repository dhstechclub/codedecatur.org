import React from 'react';
import LanguageCheckbox from "./LanguageCheckbox"
import SearchFilter from "./SearchFilter"

export default class TagsBox extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            tagsSelected: [],
            languages: {
                "Javascript": true, 
                "Python": true, 
                "Java": true, 
                "C#": true, 
                "C++": true, 
                "Arduino": true, 
                "Go": true
            },
            availableLanguages: []
        }
        let data;
        
        for(let l in this.state.languages){
            let template = {id: "", displayName: ""}
            template.id = l;
            template.displayName = l;
            this.state.availableLanguages.push(template)
        }
        this.selectTag = this.selectTag.bind(this);
    }
    setLanguages (newLang) {
        this.setState({
            tagsSelected: this.state.tagsSelected,
            languages: newLang,
        })
    }
    selectTag (button) {
        let name = button.innerHTML;
        let newTags = this.state.tagsSelected.push(name)
        this.setState({
            tagsSeleted: newTags
        })
        let currentLanguages = this.state.availableLanguages;
        for(let i = 0; i < currentLanguages.length; i++){
            if(currentLanguages[i].id === name){
                currentLanguages.splice(i, 1)
            }
        }
        this.setState({availableLanguages: currentLanguages})
        button.remove()
    }
    unselectTag (button) {
        let name = button.innerHTML;
    }

    render () {
        return (
            <div>
                <SearchFilter data={this.state.availableLanguages} selectTag={this.selectTag}></SearchFilter>
                {this.state.tagsSelected.map(tag => (
                    <button style={{'marginRight': "20px", 'backgroundColor': 'rgba(0, 255, 0, 0.2)'}}>{tag}</button>
                ))}
                {/*<LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="python"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="javascript"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="java"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="csharp"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="cplusplus"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="arduino"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="go"/>
                <LanguageCheckbox langs={this.state.languages} setlangs={this.setLanguages} language="other"/>*/}
            </div>
        );

    }
}