import React from 'react';
export default class LanguageChange extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    handleLanguageChange = (e, type) => {
        const val = e.target.value;
        if(type === "from"){
            this.props.changeFrom(val)
        }
        else if(type === "to"){
            this.props.changeTo(val)
        }
    }

    render () {
        return (
            <div style={{"text-align": "center"}}>
                <h3>Change Language</h3>
                <input placeholder="From" type="text" value={this.props.from} onChange={e => this.handleLanguageChange(e, "from")}/>
                <input placeholder="To" type="text" value={this.props.to} onChange={e => this.handleLanguageChange(e, "to")}/>
                <br></br>
                <a href="https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/" rel="noopener noreferrer" target="_blank">Supported languages</a>
            </div>
        );

    }
}
