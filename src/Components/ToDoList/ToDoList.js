import React, {Component} from 'react';
import s from "./ToDoList.module.css";
import ToDoListCreateTask from "./ToDoListCreateTask/ToDoListCreateTask";
import TaskList from "./TasksList/TasksList";
import ToDoListFooter from "./ToDoListFooter/ToDoListFooter";
import {getTask} from "./Services";

class ToDoList extends Component {

    constructor() {
        super();

        this.state = {
            tasks: [],
            filter: 'all'
        };

        getTask(98919012)
            .then(tasksFromServer => {

                let tasks = tasksFromServer.map(itemFromServer => {
                    return {
                        title: itemFromServer.title,
                        id: itemFromServer.id,
                        isDone: itemFromServer.done,
                    }
                });

                this.setState({
                    tasks: tasks
                })
            })
    }

    render() {
        let filterdTasks = [];

        switch (this.state.filter) {
            case 'all':
                filterdTasks = this.state.tasks;
                break;

            case 'active':
                filterdTasks = this.state.tasks.filter((item) => {
                    return item.isDone === false
                });
                break;

            case 'completed':
                filterdTasks = this.state.tasks.filter((item) => {
                    return item.isDone === true
                });
                break;

            default:
                console.log('Unknown operation');
                break;

        }

        return (
            <div className={s.todolist}>
                <ToDoListCreateTask task={this.state.tasks}
                                    createTaskCallback={this.addTaskToState.bind(this)}/>
                <TaskList tasks={filterdTasks}
                          deleteTaskCallback={this.deleteTask.bind(this)}
                          updateTaskCallback={this.updateTask.bind(this)}/>
                <ToDoListFooter tasks={this.state.tasks}
                                filter={this.state.filter}
                                changeFilterCallback={this.changeFilter.bind(this)}
                                clearCompletedCallback={this.clearCompleted.bind(this)}/>
            </div>
        );
    }

    addTaskToState(task) {
        this.setState({
            tasks: [...this.state.tasks, task]
        })
    }

    deleteTask(taskId) {
        this.setState({
            tasks: this.state.tasks.filter((item) => {
                return item.id !== taskId;
            })
        })
    }

    updateTask(task) {
        let newTasksList = [...this.state.tasks];

        newTasksList.forEach((item) => {
            if (item.id === task.id) {
                item.isDone = task.isDone;
            }
        });

        this.setState({
            tasks: newTasksList
        })
    }

    changeFilter(filterValue) {
        this.setState({
            filter: filterValue
        })
    }

    clearCompleted() {
        this.setState({
            tasks: this.state.tasks.filter((item) => {
                return item.isDone === false
            })
        })
    }
}

export default ToDoList;
