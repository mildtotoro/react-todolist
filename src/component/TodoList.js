import React, { Component } from 'react';
import List from './List';
import moment from 'moment';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            doingList: [],
            doneList: [],
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

    addTodo = (event) => {
        event.preventDefault();
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

    removeItemFromList = (item) => {
        this.setState((state) => {
            let list = state.todoList;
            let listName = 'todoList';
            if(item.status === 'done') {
                list = state.doneList;
                listName = 'doneList';
            } else if(item.status === 'doing') {
                list = state.doingList;
                listName = 'doingList';
            } 
            let newList = list;
             newList = list.filter((itemList) => {
                if(itemList.id !== item.id) {
                    return itemList;
                }
                
            });
            return {
                [listName] : newList,
            }
        });
    }

    addDoing = (itemDoing) => {
        this.removeItemFromList(itemDoing);
        this.setState((state) => {
            const newDoingList = [
                ...state.doingList,
                {
                    ...itemDoing,
                    status: 'doing'
                }
            ]
            
            return {
                doingList: newDoingList,  
            }
        });
    }

    addDone = (itemDone) => {
        this.removeItemFromList(itemDone);

        this.setState((state) => {
            const newDoneList = [
                ...state.doneList,
                {
                    ...itemDone,
                    status: 'done'
                }
            ]
            
            return {
                doneList: newDoneList,
            }
        });
    }

    render() {
        const { todoList, doingList, doneList, text } = this.state;

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
                                    <form className="form-inline" onSubmit={this.addTodo}>
                                        <div className="form-group mx-sm-2 mb-2">
                                            <input className="form-control form-control-lg" value={text} onChange={this.updateInputValue} name="todolist" placeholder="I will ..."/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-lg mb-2">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <List
                    status="todo"
                    todoList={todoList}
                    doingList={doingList}
                    doneList={doneList}
                    addDoing={this.addDoing}
                    addDone={this.addDone}
                    removeItemFromList={this.removeItemFromList}
                />
            </div>
        )
    }
}

export default TodoList;