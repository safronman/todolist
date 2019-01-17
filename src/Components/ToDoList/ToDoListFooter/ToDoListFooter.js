import React from 'react';
import s from './ToDoListFooter.module.css';

const ToDoListFooter = (props) => {

    let handleFilterChanged = (event) => {
        props.changeFilterCallback(event.currentTarget.dataset.value)
    };

    let clearCompleted = () => {
        props.clearCompletedCallback();
    };

    return (
        <div className={s.footerWrapper}>
            <div>
                    <span> {props.tasks.filter(item => {
                        return !item.isDone
                    }).length} items left </span>
            </div>
            <div>
                <button className={props.filter === 'all' ? `${s.btn} ${s.btnActive}` : s.btn}
                        onClick={handleFilterChanged}
                        data-value='all'>All
                </button>
                <button className={props.filter === 'active' ? `${s.btn} ${s.btnActive}` : s.btn}
                        onClick={handleFilterChanged}
                        data-value='active'>Active
                </button>
                <button className={props.filter === 'completed' ? `${s.btn} ${s.btnActive}` : s.btn}
                        onClick={handleFilterChanged}
                        data-value='completed'>Completed
                </button>
            </div>
            <div>
                <button className={s.btn}
                        onClick={clearCompleted}>Clear completed
                </button>
            </div>
        </div>
    )
};

export default ToDoListFooter;
