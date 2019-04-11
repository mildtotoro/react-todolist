import React, { Component } from 'react';
import List from './List';
import moment from 'moment';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            text: "",
        }
    }

    // from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r && 0x3 | 0x8)).toString(16);
        });
    }

    addTodo = () => {
        const { text } = this.state;
        const id = this.generateUUID();
        console.log("id", id);

        if (!!text) {
            this.setState((state) => {
                return {
                    todoList: [
                        ...state.todoList,
                        {
                            id,
                            text,
                            status: "todo",
                            createAt: moment().format("DD-MM-YYYY HH:mm"),
                        }
                    ],
                    text: "",
                }
            });
        }
    }

    removeList = (id) => {
        this.setState((state) => {
            const newList = state.todoList.filter((item) => {
                return item.id !== id;
            });

            return {
                todoList: newList,
            }
        });
    }

    updateInputValue = (e) => {
        console.log(e.target.value);
        this.setState({
            text: e.target.value
        });
    }

    gotoNextStatus = (id) => {
        this.setState((state) => {
            const newList = state.todoList.map((item) => {
                if (item.id === id) {
                    if (item.status === 'todo') {
                        return {
                            ...item,
                            status: 'doing',
                        }
                    } else {
                        return {
                            ...item,
                            status: 'done',
                        }
                    }
                }
                return item;
            });

            return {
                todoList: newList,
            }
        });
    }


    render() {
        const { todoList, text } = this.state;
        return (
            <div className="container">
                <div className="mt-5 my-3">
                    <h1 className="bold">TODOLIST</h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card-with-shadow">
                            <div className="row  py-2 my-4">
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="form-inline my-3">
                                        <div className="form-group mx-sm-2 mb-2">
                                            <input className="form-control form-control-lg" value={text} onChange={this.updateInputValue} />
                                        </div>
                                        <button className="btn btn-primary btn-lg mb-2" onClick={this.addTodo}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <List
                    status="todo"
                    todoList={todoList}
                    gotoNextStatus={this.gotoNextStatus}
                    removeList={this.removeList}
                />
            </div>
        )
    }
}

export default TodoList;