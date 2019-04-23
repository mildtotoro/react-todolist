import React, { Component } from 'react';

class List extends Component {
  render() {
    const { todoList, doingList, doneList, addTodo, addDoing, addDone, removeItemFromList } = this.props;

    return (
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="todo-block ">
            <h2 className="py-3">Todo</h2>

            {todoList.map((item) => {
              return (
                <div className="card-with-shadow mb-3" key={item.id}>
                  <div className="card-body text-left">
                    <div className="row">
                      <div className="col-8">
                        {item.text}
                      </div>
                      <div className="col-4 text-right">
                      
                        <button className="btn btn-success mr-2 btn-sm" onClick={() => { addDoing(item); }} type="button">
                          <i className="fas fa-check"></i>
                        </button>

                        <button className="btn btn-secondary btn-sm" onClick={() => { removeItemFromList(item); }} type="button">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="todo-block">
            <h2 className="py-3">Doing</h2>
            {doingList.map((item) => {
              return (
                <div className="card-with-shadow mb-3" key={item.id}>
                  <div className="card-body text-left">
                    <div className="row">
                      <div className="col-7">
                        {item.text}
                      </div>
                      <div className="col-5 text-right">
                        <button className="btn btn-success mr-2 btn-sm" onClick={() => { addDone(item) }} type="button">
                          <i className="fas fa-check"></i>
                        </button>
                        <button className="btn btn-success mr-2 btn-sm" onClick={() => { addTodo(item) }} type="button">
                          <i className="fas fa-undo"></i>
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => { removeItemFromList(item) }} type="button">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="todo-block">
            <h2 className="py-3">Done</h2>
            {doneList.map((item) => {
              return (
                <div className="card-with-shadow mb-3" key={item.id}>
                  <div className="card-body text-left">
                    <div className="row">
                      <div className="col-8">
                        {item.text}
                      </div>
                      <div className="col-4 text-right">
                        <button className="btn btn-success mr-2 btn-sm" onClick={() => { addDoing(item) }} type="button">
                          <i className="fas fa-undo"></i>
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => { removeItemFromList(item) }} type="button">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
