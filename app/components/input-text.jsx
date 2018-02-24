import React from 'react';

export default class NoteInputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text || ''
        }
    }

    static defaulProps = {
        placeholder: '',
        text: '',
        editing: false
    }

    handleBlur = (e) => {
        this.props.onSave(e.target.value);
    }

    handleChange = (e) => {
        this.setState({text: e.target.value});
    }

    handleSubmit = (e) => {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
        }
    }

    render() {
        return (
            <input
                autoFocus={true}
                className='input-text'
                type='text'
                placeholder={this.props.placeholder}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        )
    }
}
