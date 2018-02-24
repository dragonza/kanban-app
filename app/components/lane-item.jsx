import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {
  createNote,
  updateNote,
  deleteNote
} from '../actions/notes-actions';
import {
  createLane,
  deleteLane,
  detachFromLane,
  attachToLane,
  updateLane
} from '../actions/lanes-actions';
import Notes from './note-list';
import Editable from './editable';
import { laneNotesbyLane } from '../selectors/select';


class LaneItem extends React.Component {
  handleAddNote = (props) => {
    const { lane } = props;
    const newTask = props.createNote({
      task: 'New Task'
    });

    props.attachToLane({
      laneId: lane.id,
      noteId: newTask.note.id
    })
  }

  handleDeleteLane = (props) => {
    const { lane } = props;
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
    const { lane } = props;
    props.detachFromLane({
      laneId: lane.id,
      noteId
    });
    props.deleteNote(noteId);
  }

  handleEditNote = (id, text) => {
    this.props.updateNote({
      id: id,
      task: text
    });
  }

  handleEditLane = (text) => {
    const { lane } = this.props;
    this.props.updateLane({
      laneId:  lane.id,
      name: text
    })
  }


  renderComponent = (props, state) => {
    const { laneNotes, lane } = props;
    return (
      <li className='lane-item'>
        <div className='lane-header'>
          <button className='add-note lane-header-item' onClick={() => this.handleAddNote(props)}>+</button>
          <Editable
            className='lane-editable lane-header-item'
            value={lane.name}
            onEdit={(text) => this.handleEditLane(text)}
          />
          <button className='delete-lane lane-header-item' onClick={() => this.handleDeleteLane(props)}>x</button>
        </div>
        <Notes
          notes={laneNotes}
          onEditNote={(id, text) => this.handleEditNote(id ,text)}
          onDeleteNoteClick={(id) => this.handleDeleteNote(id, props)}
        />
      </li>
    );
  }

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default connect(
  (state, props) => {
    return {
      laneNotes: laneNotesbyLane(state, props)
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
      updateLane
    }, dispatch)
  }
)(LaneItem);
