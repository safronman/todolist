import React, {Component} from 'react';

class ToDoListFooter extends Component {

    render() {
        return (
            <div className="todolist__footer">
                <div>
                    <span className="todolist__count">
                        {this.props.tasks.filter(item => {
                            return !item.isDone
                        }).length} items left </span>
                </div>
                <div>
                    <button className={this.props.filter === 'all' ? 'btn  btn--footer  btn--active' : 'btn  btn--footer'}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='all'>All</button>
                    <button className={this.props.filter === 'active' ? 'btn  btn--footer  btn--active' : 'btn  btn--footer'}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='active'>Active</button>
                    <button className={this.props.filter === 'completed' ? 'btn  btn--footer  btn--active' : 'btn  btn--footer'}
                            onClick={this.handleFilterChanged.bind(this)}
                            data-value='completed'>Completed</button>
                </div>
                <div>
                    <button className="btn  btn--footer"
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
