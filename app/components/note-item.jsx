import React from 'react';
import InputText from './input-text';
import Editable from './editable';

export default class NoteItem extends React.Component {
  handleDoubleClick = () => {
    this.setState({ editing: true });
  }

  handleEditNote = (text) => {
    const { note } = this.props;
    if (text.length === 0) {
      this.props.onDeleteNoteClick(note.id);
    } else {
      this.props.onEditNote(note.id, text);
    }
  }

  renderComponent = (props, state) => {
    if (!props.note) return null;
    const { note } = props;
    return  (
      <li className="note-item">
        <Editable
          className='note-editable'
          value={note.task}
          onEdit={(text) => this.handleEditNote(text)}
        />
        <button onClick={() => props.onDeleteNoteClick(note.id)}>x</button>
      </li>
    )
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}
