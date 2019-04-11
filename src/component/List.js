import React, { Component } from 'react';

class List extends Component {
  render() {
    const { todoList, gotoNextStatus, removeList } = this.props;

    return (
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="todo-block">
            <h2 className="py-3">Todo</h2>
            {todoList.map((item) => {
              if (item.status === 'todo') {
                return (
                  <div class="card" key={item.id}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-8">
                          {item.text}
                        </div>
                        <div className="col-4">
                          <button className="btn btn-success mr-2 btn-sm" onClick={() => { gotoNextStatus(item.id) }} type="button"> 
                            <i class="fas fa-check"></i> 
                          </button>
                       
                          <button className="btn btn-secondary btn-sm" onClick={() => { removeList(item.id) }} type="button">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              return;
            })}

          </div>
        </div>
        <div className="col-12 col-md-4">
          <h2>Doing</h2>
          {todoList.map((item) => {
            if (item.status === 'doing') {
              return (
                <div key={item.id}>
                  {item.text}
                  <button onClick={() => { gotoNextStatus(item.id) }}>Done</button>
                  <button onClick={() => { removeList(item.id) }}>remove</button>
                </div>
              )
            }
          })}
        </div>
        <div className="col-12 col-md-4">
          <h2>Done</h2>
          {todoList.map((item) => {
            if (item.status === 'done') {
              return (
                <div key={item.id}>
                  {item.text}
                  {/* <button onClick={this.nextStatus(item.id)}></button> */}
                  <button onClick={() => { removeList(item.id) }}>remove</button>
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default List;
