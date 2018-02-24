import React from 'react';
import LaneItem from './lane-item';

export default function LaneList(props) {
  const { laneList } = props;
  if (!laneList) return null;
  return (
    <ul className='lane-list'>
      {
        laneList.map(lane => <LaneItem lane={lane} key={lane.id} />)
      }
    </ul>

  );
}
