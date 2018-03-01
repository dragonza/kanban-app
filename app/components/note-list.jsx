import React from 'react';
import NoteItem from './note-item';

const Notes = ({notes, onDeleteNoteClick, onEditNote, onMove}) => {
    if (!notes) return null;
    return (
        <ul className="notes-list">
            {
                notes.map(note =>
                    <NoteItem
                        onMove={onMove}
                        note={note}
                        id={note.id}
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
