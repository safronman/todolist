import React, {Component} from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList/ToDoList";

class App extends Component {
    render() {
        return (
            <div className="app">
                <p className="app__warning">Внимание. На сервере установлено ожидание около 3 секунд.</p>
                <p className="app__desc">Поэтому при добавление, удалении, изменении названия тасок и совершении других операций, связанных с
                    сервером, необходимо выждать это время</p>
                <ToDoList/>
            </div>
        );
    }
}

export default App;
