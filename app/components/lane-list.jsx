import React from 'react';
import LaneItem from './lane-item';

export default function LaneList(props) {
    const {laneList} = props;
    console.log('laneList: ', laneList);
    if (!laneList) return null;
    return (
        <ul className='lane-list'>
            {
                laneList.map(lane => <LaneItem lane={lane} key={lane.id}/>)
            }
        </ul>

    );
}
