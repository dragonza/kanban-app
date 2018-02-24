import initialState from '../store/default-state';
import { combineReducers } from 'redux';
import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE
} from '../actions/notes-actions';
import {
  CREATE_LANE,
  DELETE_LANE,
  DETACH_FROM_LANE,
  ATTACH_TO_LANE,
  UDATE_LANE
} from '../actions/lanes-actions';

function noteList(state = initialState.noteList, action) {
    switch (action.type) {
      case CREATE_NOTE:
        return [...state, action.note];

      case UPDATE_NOTE:
        return state.map(note => {
          if (note.id === action.id) {
            return { ...note, task: action.task }
          }
          return note;
        });

      case DELETE_NOTE:
        return state.filter(note => note.id !== action.noteId);

      default:
        return state;
    }
}

function laneList(state = initialState.laneList, action) {
  switch (action.type) {
    case CREATE_LANE:
    return [...state, action.lane];

    case DELETE_LANE:
    return state.filter(lane => lane.id !== action.laneId);

    case DETACH_FROM_LANE:
    return state.map(lane => {
      if (lane.id === action.laneId) {
        return {
          ...lane,
          notes: lane.notes.filter(id => id !== action.noteId)
        }
      }

      return lane;
    });

    case ATTACH_TO_LANE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          return {
            ...lane,
            notes: [...lane.notes, action.noteId]
          }
        }

        return lane;
      });

    case UDATE_LANE:
    return state.map(lane => {
      if (lane.id === action.laneId) {
        console.log(lane);
        return {
          ...lane,
          name: action.name
        }
      }
      return lane;
    });


    default:
      return state;
  }
}


const kanbanApp = combineReducers({
  noteList,
  laneList
});

export default kanbanApp;
