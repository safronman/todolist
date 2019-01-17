import React from 'react';
import {createTask} from "../Services";
import s from "./ToDoListCreateTask.module.css";

const ToDoListCreateTask = (props) => {

    let createNewTask = (event) => {
        if (event.key === 'Enter') {

            let newTaskInput = event.currentTarget;

            createTask(newTaskInput.value, 98919012)
                .then(data => {

                    let newTask = {
                        title: data.task.title,
                        isDone: data.task.done,
                        id: data.task.id
                    };

                    props.createTaskCallback(newTask);

                    newTaskInput.value = '';
                })
        }
    };

    return (
        <input className={s.mainInput}
               type='text'
               placeholder='Input task'
               onKeyPress={createNewTask}/>
    )
};

export default ToDoListCreateTask;
