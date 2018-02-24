import React from 'react';
import Editable from './editable';
import PropTypes from 'prop-types';

export default class NoteItem extends React.Component {
    handleEditNote = (text, props) => {
        const {note} = this.props;
        if (text.length === 0) {
            props.onDeleteNoteClick(note.id);
        } else {
            props.onEditNote(note.id, text);
        }
    }

    renderComponent = (props) => {
        if (!props.note) return null;
        const {note} = props;
        return (
            <li className="note-item">
                <Editable
                    className='note-editable'
                    value={note.task}
                    onEdit={(text) => this.handleEditNote(text, props)}
                />
                <button onClick={() => props.onDeleteNoteClick(note.id)}>x</button>
            </li>
        )
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

NoteItem.propTypes = {
    note: PropTypes.object
};
