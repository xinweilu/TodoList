import React,{useState,useMemo} from 'react'
import { TodoListItem } from './TodoListItem'
import { Todo,ToggleTodo,ToggleAllTodo,HandleShowIncomplete,ActionType } from './types'

interface TodoListProps{
    todos:Todo[],
    toggleTodo:ToggleTodo,
    //toggleAllTodo:ToggleAllTodo,
    // clearCompleteTodo:()=>void,
    dispatch:React.Dispatch<ActionType>
}
//<TodoListProps> 指定了该组件接受的 props 类型为 TodoListProps
//{ todos, toggleTodo } 是对 props 参数进行解构，分别获取 todos 和 toggleTodo 属性
export const TodoList:React.FC<TodoListProps>=({todos,dispatch})=>{
    const [showIncomplete,setShowIncomplete] = useState(false)
    const [complete,setComplete]=useState(true)
    const handleShowIncomplete :HandleShowIncomplete= () => {
        setShowIncomplete(!showIncomplete);
      }
    const filteredTodos = showIncomplete ? todos.filter(todo => !todo.complete) : todos;

    const todoLeft:number=useMemo(()=>{
       return todos.filter(todo => !todo.complete).length
    },[todos])

    const handleToggleAllTodo:ToggleAllTodo=()=>{
        dispatch({
            type: 'toggleAlltodo', complete:complete
        });
        setComplete(!complete)
      }
     function clearCompleteTodo(){
        dispatch({
            type: 'clearCompleteTodo'
        });
     }
    return(
        <div>
            

        <span>{todoLeft} items left</span>
        <input type="checkbox" checked={!complete} onChange={handleToggleAllTodo}/>全选<button onClick={handleToggleAllTodo}>全选 </button>
        <button onClick={()=>handleShowIncomplete()}>{showIncomplete ? 'ALL':'Active' }</button>
        <button onClick={()=>clearCompleteTodo()}>clear completed</button>
        <ul>
            {filteredTodos.map(todo=>{

                return <TodoListItem key={todo.id} todo={todo} dispatch={dispatch}></TodoListItem>
            })}
        </ul>
        </div>
    )

}
