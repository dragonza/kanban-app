import uuid from 'uuid';

export default {
    noteList: [
        {
            id: 0,
            task: 'Learn React'
        },
        {
            id: 1,
            task: 'Do laundry'
        }
    ],
    laneList: [
        {
            id: uuid.v4(),
            notes: [0],
            name: 'To Do'
        },
        {
            id: uuid.v4(),
            notes: [1],
            name: 'In Progress'
        }
    ]
}
