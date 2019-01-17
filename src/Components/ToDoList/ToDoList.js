import React, {Component} from 'react';
import {createStore} from 'redux';
import s from "./ToDoList.module.css";
import ToDoListCreateTask from "./ToDoListCreateTask/ToDoListCreateTask";
import TaskList from "./TasksList/TasksList";
import ToDoListFooter from "./ToDoListFooter/ToDoListFooter";
import {getTasks} from "./Services";
import {todolistReducer} from "./redux/todolist-reducers";
import {
    getTasksActionCreator,
    createTaskActionCreator,
    deleteTaskActionCreator,
    updateTaskActionCreator,
    changeFilterActionCreator,
    clearCompletedActionCreator,
} from "./redux/todolist-actions";

class ToDoList extends Component {

    constructor(props) {
        super(props);

        this.store = createStore(todolistReducer);
        let state = this.store.getState();

        this.state = state;

        this.store.subscribe(() => {
            let state = this.store.getState();
            this.setState(state);
        });

        getTasks(98919012)
            .then(tasksFromServer => {
                let tasks = tasksFromServer.map(itemFromServer => {
                    return {
                        title: itemFromServer.title,
                        id: itemFromServer.id,
                        isDone: itemFromServer.done,
                    }
                });

                let action = getTasksActionCreator(tasks);
                this.store.dispatch(action);
            })
    }

    render() {
        let filteredTasks = [];

        switch (this.state.filter) {
            case 'all':
                filteredTasks = this.state.tasks;
                break;

            case 'active':
                filteredTasks = this.state.tasks.filter((item) => {
                    return item.isDone === false
                });
                break;

            case 'completed':
                filteredTasks = this.state.tasks.filter((item) => {
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
                                    createTaskCallback={this.createTaskToState.bind(this)}/>
                <TaskList tasks={filteredTasks}
                          deleteTaskCallback={this.deleteTask.bind(this)}
                          updateTaskCallback={this.updateTask.bind(this)}/>
                <ToDoListFooter tasks={this.state.tasks}
                                filter={this.state.filter}
                                changeFilterCallback={this.changeFilter.bind(this)}
                                clearCompletedCallback={this.clearCompleted.bind(this)}/>
            </div>
        );
    }

    createTaskToState(task) {
        let action = createTaskActionCreator(task);
        this.store.dispatch(action);
    }

    deleteTask(taskId) {
        let action = deleteTaskActionCreator(taskId);
        this.store.dispatch(action);
    }

    updateTask(task) {
        let action = updateTaskActionCreator(task);
        this.store.dispatch(action);
    }

    changeFilter(filterValue) {
        let action = changeFilterActionCreator(filterValue);
        this.store.dispatch(action);
    }

    clearCompleted() {
        let action = clearCompletedActionCreator();
        this.store.dispatch(action);
    }
}

export default ToDoList;
