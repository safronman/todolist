import React from 'react';
import Task from "./Task/Task";
import s from "./TasksList.module.css";

const TaskList = (props) => {
    return (
        <ul className={s.tasksList}>
            {
                props.tasks.map((task) => {
                    return <Task task={task}
                                 deleteTaskCallback={props.deleteTaskCallback}
                                 updateTaskCallback={props.updateTaskCallback}
                                 key={task.id}/>
                })
            }
        </ul>
    );
};

export default TaskList;
