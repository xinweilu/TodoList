
import styles from './index.less';
import {Todo, ActionType} from './types'
import React, { useEffect, useReducer } from 'react';
import { TodoList } from './TodoList';
import { AddtoForm } from './AddtoForm';
import {todoReducer} from './todoReducer'

const initialTodos: Todo[]=[
  {id:crypto.randomUUID(),title:"js",complete:true,priority:'high',createdAt:new Date().toISOString()},
  {id:crypto.randomUUID(),title:"ts",complete:false,priority:'medium',createdAt:new Date().toISOString()}
]

const App: React.FC = () => {
  //实现刷新后todolist不会消失
  const getInitialTodos = (): Todo[] => {
    const storageTodos = localStorage.getItem('todosTasks')
    if(storageTodos){
      try {
        return JSON.parse(storageTodos)
      } catch {
        return initialTodos
      }
    } else {
      return initialTodos
    }
  }

  const [todoTasks,dispatch]=useReducer(todoReducer,getInitialTodos())

  useEffect(()=>{
    localStorage.setItem('todosTasks',JSON.stringify(todoTasks))
  },[todoTasks])

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.title}>TodoList</h1>
      <AddtoForm dispatch={dispatch}></AddtoForm>
      <TodoList todos={todoTasks} dispatch={dispatch}></TodoList>
    </div>
  );
};

export default App;
