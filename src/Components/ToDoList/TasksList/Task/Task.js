import React, {Component} from 'react';
import {delTask, updateTask} from "../../Services";
import s from "./Task.module.css";
import deleteIcon from '../../../../img/delete.png';

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
                                    className={s.taskInput}
                                    value={this.state.title}
                                    onChange={this.changeTitle.bind(this)}
                                    onBlur={this.saveTitle.bind(this)}/>
        } else {
            displayElement =
                <span onDoubleClick={this.goToEditMode.bind(this)}>
                    {this.state.title}
                </span>
        }

        return (
            <li className={this.props.task.isDone ? `${s.item} ${s.itemDone}` : `${s.item}`}>
                <div>
                    <input
                        className={s.taskCheckbox}
                        type="checkbox"
                        checked={this.props.task.isDone}
                        onChange={this.toggleTaskStatus.bind(this)}/>

                    {displayElement}
                </div>
                <img className={s.deleteTask}
                     src={deleteIcon}
                     onClick={this.deleteTask.bind(this)}
                     alt="Delete icon"/>
            </li>
        );
    }

    deleteTask() {
        let task = {
            ...this.props.task
        };

        delTask(98919012, task.id)
            .then(data => {
                this.parentDeleteCallback(this.props.task.id);
            })
    }

    toggleTaskStatus() {
        let task = {
            ...this.props.task
        };

        task.isDone = !task.isDone;

        updateTask(task.title, 98919012, task.id, task.isDone)
            .then(data => {
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
        let newTitle = event.currentTarget.value;

        let task = {
            ...this.props.task
        };

        task.title = newTitle;

        updateTask(newTitle, 98919012, task.id, null)
            .then(data => {
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
