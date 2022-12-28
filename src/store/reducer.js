import * as actions from './actionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.TASK_ADD:
      return [...state, {
        id:     action.payload.id,
        title:  action.payload.title,
        time:   action.payload.time,
        by:     action.payload.by,
        url:    action.payload.url,
        kids:   action.payload.kids,
      }];
    
    /*
    case actions.TASK_TOGGLE:
      return state.map(task => {
        if (task.id === action.payload.id)
          return { ...task, completed: !task.completed }
        return task;
      });

    case actions.TASK_REMOVE:
      return state.filter(task => action.payload.id !== task.id);
    */
    default:
      return state;
  }
}