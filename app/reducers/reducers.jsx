import initialState from '../store/default-state';
import { combineReducers } from 'redux';
import update from 'immutability-helper';
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
    UPDATE_LANE,
    MOVE_NOTE
} from '../actions/lanes-actions';

function noteList(state = initialState.noteList, action) {
    switch (action.type) {
        case CREATE_NOTE:
            return [...state, action.note];

        case UPDATE_NOTE:
            return state.map(note => {
                if (note.id === action.id) {
                    return {...note, task: action.task}
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
                const currentNoteIndex = lane.notes.indexOf(action.noteId);
                if (currentNoteIndex >= 0) {
                    return {
                        ...lane,
                        notes: lane.notes.filter(note => note !== action.noteId)
                    }
                }

                if (lane.id === action.laneId) {
                    return {
                        ...lane,
                        notes: [...lane.notes, action.noteId]
                    }
                }

                return lane;
            });

        case UPDATE_LANE:
            return state.map(lane => {
                if (lane.id === action.laneId) {
                    return {
                        ...lane,
                        name: action.name
                    }
                }
                return lane;
            });


        case MOVE_NOTE:
            {
                const sourceId = action.sourceId;
                const targetId = action.targetId;
                const sourceLane = state.find(lane => lane.notes.includes(sourceId));
                const targetLane = state.find(lane => lane.notes.includes(targetId));
                const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
                const targetNoteIndex = targetLane.notes.indexOf(targetId);
                if (targetLane.id === sourceLane.id) {
                    return state.map(lane => {
                        if (lane.id === sourceLane.id) {
                            return Object.assign({}, lane, {
                                notes: update(sourceLane.notes, {
                                    $splice: [
                                        [sourceNoteIndex, 1],
                                        [targetNoteIndex, 0, sourceId]
                                    ]
                                })
                            })
                        }
                        return lane;
                    });
                } else {
                    return state.map(lane => {
                        if (lane.id === sourceLane.id) {
                            return {
                                ...lane,
                                notes: lane.notes.filter(note => note !== sourceId)
                            }
                        }

                        if (lane.id === targetLane.id) {
                            return {
                                ...lane,
                                notes: lane.notes
                                    .slice(0, targetNoteIndex)
                                    .concat([sourceId])
                                    .concat(lane.notes.slice(targetNoteIndex))
                            }
                        }

                        return lane;
                    });
                }
            }

        default:
            return state;
    }
}


const kanbanApp = combineReducers({
    noteList,
    laneList
});

export default kanbanApp;
