import { createSelector } from 'reselect';

export const noteListSelector = (state) => state.noteList;
export const laneListSelector = (state) => state.laneList;
// export const laneNotesFromLane = (state, props) => {
//   const noteList = noteListSelector(state);
//   const laneNotesList = props.lane.notes;
//   if (!laneNotesList) return null;
//   return laneNotesList
//     .map(noteId => noteList.find(note => note.id === noteId))
//     .filter(Boolean);
// }

export const laneNotesbyLane = createSelector(
  noteListSelector,
  (state, props) => props.lane.notes, // notes by lane
  (noteList, noteIdList) => {
    return noteIdList
      .map(noteId => noteList.find(note => note.id === noteId))
      .filter(Boolean);
  }
)
