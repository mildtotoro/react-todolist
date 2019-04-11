import React, { Component } from 'react';
import List from './List';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            text: "",
        }
    }

    addTodo = () => {
        const { text } = this.state;
        let id = text.toLowerCase();
        id = id.replace(" ", "");
        id = id.toString();

        // const isRepeat = todoList.some((list) => {
        //     return (list.id == id);
        // });

        if (!!text) {
            this.setState((state) => {
                return {
                    todoList: [
                        ...state.todoList,
                        {
                            status: "todo",
                            text,
                            id,
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
                <div className="mt-5 my-4">
                    <h1 className="bold">TODOLIST</h1>
                </div>
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <div class="form-inline my-3">
                            <div class="form-group mx-sm-3 mb-2">
                                <input class="form-control form-control-lg" value={text} onChange={this.updateInputValue} />
                            </div>
                            <button class="btn btn-primary mb-2" onClick={this.addTodo}>Ok</button>
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