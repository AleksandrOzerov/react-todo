import React from "react";
import TodoListItem from "../TodoListItem";
import "./todoList.css";
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  //деструкторизация props 

  const elements = todos.map(item => {
    const { id, ...itemProps } = item; //деструкторизацию и добавление rest параметра itemProps, в который войдут
    return (
      //все свойства объека которые не были деструторированы (все свойства кроме id)
      /*
<li>
можно записать так:
    <TodoListItem
    label ={item.label}
    important = {item.important}/>
</li>

этот код можно записать короче выполнив spread оператор для объекта, это означает
взять каждое свойство из объекта item и передать в качестве атрибута вместе со значением
в todoListItem
*/
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
