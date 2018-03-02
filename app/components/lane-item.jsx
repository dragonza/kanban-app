import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    createNote,
    updateNote,
    deleteNote
} from '../actions/notes-actions';
import {
    deleteLane,
    detachFromLane,
    attachToLane,
    updateLane,
    moveNote
} from '../actions/lanes-actions';
import Notes from './note-list';
import Editable from './editable';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants/item-types';
import { notesByLane } from '../selectors/select';

const laneTarget = {
    hover(props, monitor) {
        const sourceProps = monitor.getItem();// note being dragged
        if (!props.lane.notes.length) {
            props.attachToLane({
                laneId: props.lane.id,
                noteId: sourceProps.id
            });
        }
    }
}

function collectDrop(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class LaneItem extends React.Component {
    state = {
        editing: false
    }

    handleAddNote = (props) => {
        const {lane} = props;
        const newTask = props.createNote({
            task: 'New Task'
        });

        props.attachToLane({
            laneId: lane.id,
            noteId: newTask.note.id
        })
    }

    handleDeleteLane = (props) => {
        const {lane} = props;
        lane.notes.forEach(noteId => {
            props.detachFromLane({
                laneId: lane.id,
                noteId
            });
            props.deleteNote(noteId);
        });
        props.deleteLane(props.lane.id);
    }

    handleDeleteNote = (noteId, props) => {
        const {lane} = props;
        props.detachFromLane({
            laneId: lane.id,
            noteId
        });
        props.deleteNote(noteId);
    }

    handleUpdateNote = (id, text) => {
        this.props.updateNote({
            id: id,
            task: text
        });
    }

    handleEditLane = (editing) => {
        this.setState({ editing })
    }

    handleUpdateLane = (text) => {
        const {lane} = this.props;
        this.props.updateLane({
            laneId: lane.id,
            name: text
        });
        this.setState({ editing: false });
    }

    handleMoveNote = ({ sourceId, targetId }) => {
        this.props.moveNote({
            sourceId,
            targetId
        });
    }

    renderComponent = (props, state) => {
        const { laneNotes, lane, connectDropTarget } = props;
        return connectDropTarget(
            <li className='lane-item'>
                <div className='lane-header'>
                    <button className='add-note lane-header-item'
                        onClick={() => this.handleAddNote(props)}>+</button>
                    <Editable
                        className='lane-editable lane-header-item'
                        value={lane.name}
                        editing={state.editing}
                        onSave={(text) => this.handleUpdateLane(text)}
                        onEdit={(editing) => this.handleEditLane(editing)}
                    />
                    <button className='delete-lane lane-header-item' onClick={() => this.handleDeleteLane(props)}>x
                    </button>
                </div>
                <Notes
                    onMove={this.handleMoveNote}
                    notes={laneNotes}
                    onUpdateNote={(id, text) => this.handleUpdateNote(id, text)}
                    onDeleteNoteClick={(id) => this.handleDeleteNote(id, props)}
                />
            </li>
        )
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

export default compose(connect(
    (state, props) => {
        return {
            laneNotes: notesByLane(state, props)
        }
    },
    (dispatch) => {
        return bindActionCreators({
            createNote,
            updateNote,
            deleteNote,
            deleteLane,
            detachFromLane,
            attachToLane,
            updateLane,
            moveNote
        }, dispatch)
    }),
    DropTarget(ItemTypes.NOTE, laneTarget, collectDrop)
)(LaneItem);

LaneItem.propTypes = {
    laneNotes: PropTypes.array,
    lane: PropTypes.object,
    createNote: PropTypes.func,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func,
    deleteLane: PropTypes.func,
    detachFromLane: PropTypes.func,
    attachToLane: PropTypes.func,
    updateLane: PropTypes.func
};
