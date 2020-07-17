import React from 'react';
export default class ExportCards extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div style={{"text-align": "center"}}>
                <h3>For Quizlet Import:</h3>
                {this.props.cards.map(card => <pre>{card.left}    {card.right}</pre>)}
            </div>
        );

    }
}
