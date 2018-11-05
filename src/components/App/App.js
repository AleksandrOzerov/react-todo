import React, { Component } from "react";

import SearchPanel from "../SearchPanel";
import AppHeader from "../AppHeader";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFliter";
import ItemAddForm from "../ItemAddForm";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a luch")

      
    ],

    term: "",
    filter: "all" //active, done, all
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      // const idx = todoData.findIndex(el => el.id === id);

      // const before = todoData.slice(0, idx);
      //const after = todoData.slice(idx + 1);

      // const newArray = [...before, ...after]; 
      const newArray = todoData.filter(el => el.id !== id);
      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };
  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
       todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  toggleProperty(arr, id, propName){
       //update object
       const idx = arr.findIndex((el) => el.id === id);
       const oldItem = arr[idx];
       const newItem = {...oldItem,  //
       [propName]: !oldItem[propName]}; // done: !oldItem.done}
       //construct new array
        return [
         ...arr.slice(0, idx),
         newItem,
         ...arr.slice(idx + 1)
       ];
       
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
       todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  seacrhItem=(term) => {
  this.setState({term})
}
  onFilterChange=(filter) => {
  this.setState({filter})
}

  search(items, term){
    if(term.length===0){
      return items;
    }
   return items.filter((item) =>{
      return item.label
      .toLowerCase()
      .indexOf(term.toLowerCase()) > -1;

    }) 
  }

  filter(items,filter){

    switch(filter){
      case "all":
        return items;
      case "active":
        return items.filter((item)=>!item.done);
      case "done":
        return items.filter((item)=>item.done);
      default:
        return items;
    }
  }

  render() {
    const{todoData, term, filter}= this.state;

    const vilibleItems =this.filter(
    this.search(todoData, term), filter);
    const doneCount = todoData.filter((el)=>el.done).length;
    const todoCount = todoData.length - doneCount;
  
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
          seacrhItem={this.seacrhItem} />
          <ItemStatusFilter
          filter={filter}
          onFilterChange={this.onFilterChange} />
        </div>
        <TodoList
          todos={vilibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
