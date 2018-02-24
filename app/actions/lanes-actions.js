import uuid from 'uuid';

export const CREATE_LANE = 'CREATE_LANE';
export function createLane(lane) {  return {
    type: CREATE_LANE,
    lane: {
      id: uuid.v4(),
      notes: lane.notes || [],
      ...lane
    }
  }
}

export const UDATE_LANE = 'UDATE_LANE';
export function updateLane(updatedLane) {
  return {
    type: UDATE_LANE,
    ...updatedLane
  }
}

export const DELETE_LANE = 'DELETE_LANE';
export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  }
}

export const DETACH_FROM_LANE = 'DETACH_FROM_LANE';
export function detachFromLane({ laneId = '', noteId = '' }) {
  return {
    type: DETACH_FROM_LANE,
    laneId,
    noteId
  }
}

export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';
export function attachToLane({ laneId = '', noteId = '' }) {
  return {
    type: ATTACH_TO_LANE,
    laneId,
    noteId
  }
}
