import React,{useContext} from 'react'
import { Todo,ToggleTodo,ActionType } from './types'
import styles from './index.less'
import {TodoContext} from './index'
interface TodoListItemProps{
    todo:Todo,
    dispatch:React.Dispatch<ActionType>
}

export const TodoListItem: React.FC<TodoListItemProps> = (props) => {
   
    const { todo,dispatch } = props;
    //const {deleteTodo}= useContext(TodoContext);

    function  handleChange(selectId:string){    
        dispatch({
            type: 'toggletodo', id:selectId
        });
    }

    function handleDelete(selectId:string){
        dispatch({
            type: 'deletetodo', id:selectId
        });


    }
    return (
        <li >
        <label className={todo.complete? styles.complete:undefined}>
            <input type="checkbox" checked={todo.complete}  onChange={()=>handleChange(todo.id)}/>
                {todo.title}
        </label>
           <button onClick={()=>handleDelete(todo.id)}>x</button>
        </li>
    )
};
