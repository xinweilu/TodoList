
import styles from './index.less';
import { TodoListItem } from './TodoListItem';
import {Todo,ToggleTodo,AddTodo,ToggleAllTodo,DeleteTodo,ActionType} from './types'
import React, { useState,createContext, useCallback,useEffect,useReducer } from 'react';
import { TodoList } from './TodoList';
import { AddtoForm } from './AddtoForm';
import {todoReducer} from './todoReducer'

const initialTodos: Todo[]=[
  {id:crypto.randomUUID(),title:"js",complete:true},
  {id:crypto.randomUUID(),title:"ts",complete:false}
]
// interface TodoContextType {
//   deleteTodo: DeleteTodo
// }

export const TodoContext =  createContext<TodoContextType|undefined>(undefined);
const App: React.FC = () => {
   const [todos,setTodos]=useState(initialTodos)
  //实现刷新后todolist不会消失
  // const [todos,setTodos]=useState(()=>{
  //   const  storageTodos=localStorage.getItem('todosTasks')
  //   console.log(storageTodos)
  //   if(storageTodos){
  //     return JSON.parse(storageTodos)
  //   }else{
  //     return initialTodos

  // }})




    // const toggleTodo:ToggleTodo=useCallback( selectedTodo=>{
    //   const newTodos =todos.map(todo=>{
    //     if(todo==selectedTodo){
    //       return{
    //         ...todo,
    //         complete:!todo.complete
    //       }
    //     }
    //     return todo;//
    //   })

    //   setTodos(newTodos)
    // },[todos])


    const [todoTasks,dispatch]=useReducer(todoReducer,initialTodos)

//     useEffect(()=>{
//       //console.log(todoTasks)
//       localStorage.setItem('todosTasks',JSON.stringify(todoTasks))

// },[todoTasks])

    // const addTodo:AddTodo=useCallback((newTodo)=>{
    //   if(newTodo.trim()===''){
    //     return 
    //   }
    //   setTodos([
    //     ...todos,
    //     {
    //       id:crypto.randomUUID(),
    //       title:newTodo,
    //       complete:false
    //     }
    //   ])
    // },[todos])
   
    // const toggleAllTodo:ToggleAllTodo=useCallback(()=>{
      
    //   setTodos(todos.map(todo=>{
    //     return {
    //       ...todo,
    //       complete:!complete
    //     }
    //   }))

    //   setComplete(!complete)
    // },[complete,todos])

    //删除
    // const deleteTodo:DeleteTodo=useCallback((selectId:string)=>{
    //   console.log(selectId)
    //   const  newTodos=todos.filter(todo=>{
    //     return todo.id!==selectId
    //   })
    //   setTodos(newTodos)
    // } ,[todos])

  //清除完成的
  const clearCompleteTodo=()=>{
    console.log(todoTasks.filter(todo=> !todo.complete))
    setTodos(todoTasks.filter(todo=> !todo.complete))
    console.log(todos)
  }

  return (
    // <TodoContext.Provider value={{deleteTodo}}>
    <div >
      <h1>TodoList</h1>
         <AddtoForm dispatch={dispatch}></AddtoForm>
         <TodoList todos={todoTasks} dispatch={dispatch}   clearCompleteTodo={clearCompleteTodo}></TodoList>
    </div>
    // </TodoContext.Provider>
  );
};

export default App;
