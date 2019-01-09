import React, {Component} from 'react';
import Task from "./Task";
import s from "./TasksList.module.css";

class TaskList extends Component {

    render() {
        return (
            <ul className={s.tasksList}>
                {
                    this.props.tasks.map((task) => {
                        return <Task task={task}
                                     deleteTaskCallback={this.props.deleteTaskCallback}
                                     updateTaskCallback={this.props.updateTaskCallback}
                                     key={task.id}/>
                    })
                }
            </ul>
        );
    }
}

export default TaskList;
