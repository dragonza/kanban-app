import React from 'react';
import NoteItem from './note-item';

const Notes = ({ notes, onDeleteNoteClick, onEditNote}) => {
  if (!notes) return null;
  return (
    <ul className="notes-list">
      {
        notes.map(note =>
          <NoteItem
            note={note}
            onDeleteNoteClick={onDeleteNoteClick}
            onEditNote={onEditNote}
            key={note.id}
          />
        )
      }
    </ul>
  );
}

export default Notes;
