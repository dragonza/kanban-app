import React from 'react';
import Editable from './editable';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants/item-types';

const noteSource = {
    beginDrag(props) {
        console.log('begin dragging note', props);

        return {
            id: props.id
        }
    },

    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
}

const noteTarget = {
    hover(props, monitor) {
        const sourceProps = monitor.getItem(); // current item that is being dragged
        const targetId = props.id;// props here is the props of target element that is being dragged on
        const sourceId = sourceProps.id;

        if (sourceId !== targetId) {
            props.onMove({
                sourceId,
                targetId
            })
        }

    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class NoteItem extends React.Component {
    state = {
        editing: false
    }

    handleEditNote = (editing) => {
        this.setState({ editing });
    }

    handleSaveNote = (text, props) => {
        const {note} = this.props;
        if (text.length === 0) {
            props.onDeleteNoteClick(note.id);
        } else {
            props.onUpdateNote(note.id, text);
        }
        this.setState({ editing: false });
    }

    renderComponent = (props, state) => {
        const { connectDragSource, isDragging, connectDropTarget } = props;
        if (!props.note) return null;
        const {note} = props;
        console.log('isDragging: ', isDragging);
        const dragSource = state.editing ? a => a : connectDragSource;
        return dragSource(connectDropTarget(
            <li className="note-item" style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }}>
                <Editable
                    className='note-editable'
                    value={note.task}
                    editing={state.editing}
                    onEdit={(editing) => this.handleEditNote(editing)}
                    onSave={(text) => this.handleSaveNote(text, props)}
                />
                <button onClick={() => props.onDeleteNoteClick(note.id)}>x</button>
            </li>
        ))
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

export default compose(
    DragSource(ItemTypes.NOTE, noteSource, collectDrag),
    DropTarget(ItemTypes.NOTE, noteTarget, collectDrop)
)(NoteItem);

NoteItem.propTypes = {
    note: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

