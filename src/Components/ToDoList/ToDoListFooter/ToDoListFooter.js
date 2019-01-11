import React, {Component} from 'react';
import s from './ToDoListFooter.module.css';

class ToDoListFooter extends Component {

    render() {
        return (
            <div className={s.footerWrapper}>
                <div>
                    <span> {this.props.tasks.filter(item => {
                            return !item.isDone
                        }).length} items left </span>
                </div>
                <div>
                    <button className={this.props.filter === 'all' ? `${s.btn} ${s.btnActive}` : `${s.btn}`}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='all'>All</button>
                    <button className={this.props.filter === 'active' ? `${s.btn} ${s.btnActive}` : `${s.btn}`}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='active'>Active</button>
                    <button className={this.props.filter === 'completed' ? `${s.btn} ${s.btnActive}` : `${s.btn}`}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='completed'>Completed</button>
                </div>
                <div>
                    <button className={`${s.btn}`}
                            onClick={this.clearCompleted.bind(this)}>Clear completed</button>
                </div>
            </div>
        )
    }

    handleFilterChanged(event) {
        this.props.changeFilterCallback(event.currentTarget.dataset.value)
    }

    clearCompleted () {
        this.props.clearCompletedCallback();
    }
}

export default ToDoListFooter;
