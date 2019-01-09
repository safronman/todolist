import React, {Component} from 'react';
import {updateTask} from "./Services";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            title: props.task.title
        };

        this.parentDeleteCallback = props.deleteTaskCallback;
        this.parentUpdateCallback = props.updateTaskCallback;
    }

    render() {
        let displayElement = '';

        if (this.state.editMode) {
            displayElement = <input type="text"
                                    value={this.state.title}
                                    onChange={this.changeTitle.bind(this)}
                                    onBlur={this.saveTitle.bind(this)} />
        } else {
            displayElement =
                <span onDoubleClick={this.goToEditMode.bind(this)}>
                    {this.state.title}
                </span>
        }

        return <li className={this.props.task.isDone ? 'todolist__item  todolist__item--done' : 'todolist__item'}>
            <div>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.toggleTaskStatus.bind(this)}/>

                {displayElement}
            </div>
            <button className='btn'
                    onClick={this.deleteTask.bind(this)}>Delete</button>
        </li>;
    }

    deleteTask() {
        this.parentDeleteCallback(this.props.task.id);
    }

    toggleTaskStatus() {
        // debugger
        let task = {
            ...this.props.task
        };

        task.isDone = !task.isDone;

        updateTask(task.title, 98919012, task.id, task.isDone)
            .then ( data => {
                this.setState({
                    editMode: false
                });
                this.parentUpdateCallback(task);
            })
    }

    goToEditMode() {
        this.setState({
            editMode: true
        })
    }

    saveTitle(event) {
        // debugger
        let newTitle = event.currentTarget.value;

        let task = {
            ...this.props.task
        };

        task.title = newTitle;

        updateTask(newTitle, 98919012, task.id, null)
            .then ( data => {
                this.setState({
                    editMode: false
                });
                this.parentUpdateCallback(task);
            })
    }

    changeTitle(event) {
        this.setState({
            title: event.currentTarget.value
        })
    }
}

export default Task;
