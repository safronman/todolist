export const c = {
    GET_TASKS: "GET_TASKS",
    CLEAR_COMPLETED: "CLEAR_COMPLETED",
    CHANGE_FILTER: "CHANGE_FILTER",
    CREATE_TASK: "CREATE_TASK",
    DELETE_TASK: "DELETE_TASK",
    UPDATE_TASK: "UPDATE_TASK"
};

export const getTasksActionCreator = (tasks) => {
    return (
        {
            type: c.GET_TASKS,
            tasks: tasks
        }
    )
};


export const createTaskActionCreator = (newTask) => {
    return (
        {
            type: c.CREATE_TASK,
            task: newTask
        }
    )
};

export const deleteTaskActionCreator = (taskId) => {
    return (
        {
            type: c.DELETE_TASK,
            id: taskId
        }
    )
};

export const updateTaskActionCreator = (task) => {
    return (
        {
            type: c.UPDATE_TASK,
            id: task.id,
            title: task.title,
            isDone: task.isDone
        }
    )
};

export const changeFilterActionCreator = (newFilterValue) => {
    return (
        {
            type: c.CHANGE_FILTER,
            value: newFilterValue
        }
    )
};

export const clearCompletedActionCreator = () => {
    return (
        {
            type: c.CLEAR_COMPLETED
        }
    )
};
