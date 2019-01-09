import React, {Component} from 'react';
import {createTask} from "./Services";

class ToDoListCreateTask extends Component {

    render() {
        return (
            <input className='todolist__input'
                   type='text'
                   placeholder='Введите таску'
                   onKeyPress={this.createTask.bind(this)}/>
        )
    }

    createTask(event) {
        if (event.key === 'Enter') {

            let newTaskInput = event.currentTarget;

            createTask(newTaskInput.value, 98919012)
                .then(data => {

                    let newTask = {
                        title: data.task.title,
                        isDone: data.task.done,
                        id: data.task.id
                    };

                    this.props.createTaskCallback(newTask);

                    newTaskInput.value = '';
                })
        }
    }
}

export default ToDoListCreateTask;
