import {c} from "./todolist-actions";

export function todolistReducer(oldState, action) {
    switch (action.type) {
        case c.GET_TASKS:
            return {
                ...oldState,
                tasks: [...oldState.tasks, ...action.tasks]
            };

        case c.CREATE_TASK:
            return {
                ...oldState,
                tasks: [...oldState.tasks, action.task]
            };

        case c.DELETE_TASK:
            return {
                ...oldState,
                tasks: [...oldState.tasks.filter(item => {
                    return item.id !== action.id;
                })]
            };

        case c.UPDATE_TASK:
            let newState = {...oldState};
            newState.tasks = [...newState.tasks];

            newState.tasks.forEach((task, index) => {
                if (task.id === action.id) {
                    newState.tasks[index] = {
                        ...task,
                        isDone: action.isDone,
                        title: action.title
                    }
                }
            });

            return newState;

        case c.CHANGE_FILTER:
            return {
                ...oldState,
                filter: action.value
            };

        case c.CLEAR_COMPLETED:
            return {
                ...oldState,
                tasks: oldState.tasks.filter(item => {
                    return item.isDone === false
                })
            };


        default:
            if (!!oldState) {
                return oldState;
            } else {
                return {
                    tasks: [],
                    filter: "all"
                }
            }

    }
}
