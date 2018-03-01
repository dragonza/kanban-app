import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LaneList from './lane-list';
import { laneListSelector } from '../selectors/select';
import { createLane } from '../actions/lanes-actions';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class App extends React.Component {
    addLane = () => {
        this.props.createLane({
            name: 'New Lane'
        });
    }

    render() {
        const {laneList} = this.props;
        if (!laneList) return null;
        return (
            <div className='kanban-app'>
                <button onClick={() => this.addLane()}>+</button>
                <LaneList
                    laneList={laneList}
                    className='lane-list'
                />
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            laneList: laneListSelector(state)
        }
    },
    (dispatch) => {
        return bindActionCreators({
            createLane
        }, dispatch);
    }
)(App)

App.propTypes = {
    laneList: PropTypes.array.isRequired,
    createLane: PropTypes.func
};
