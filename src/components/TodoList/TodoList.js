import React from "react";
import TodoListItem from "../TodoListItem";
import "./todoList.css";
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  //деструкторизация props 

  const elements = todos.map(item => {
    const { id, ...itemProps } = item; //деструкторизацию и добавление rest параметра itemProps, в который войдут
    return (
      //все свойства объека которые не были деструторированы (все свойства кроме id)
  
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps} 
        onDeleted={()=>onDeleted(id)}
        onToggleImportant={()=>onToggleImportant(id)}
        onToggleDone={()=>onToggleDone(id)}/>
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};
export default TodoList;
