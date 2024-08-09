import React, { ChangeEvent,useState } from 'react'
import { AddTodo,ActionType } from './types'

interface AddTodoFormProps{
    //addtodo:Addtodo
    dispatch:React.Dispatch<ActionType>
}

export  const AddtoForm:React.FC<AddTodoFormProps>=({dispatch})=>{
    const [newTodo,setNewTodo]=useState<string>('')
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 防止默认提交行为
        // 处理表单提交逻辑
       // addTodo(newTodo)
       dispatch({
        type: 'add', title:newTodo
        });
        setNewTodo('')
      };
    return(
        <>
        <form onSubmit={handleSubmit}>

            <input  type="text" id="todoInput" value={newTodo} onChange={handleInputChange} placeholder="请输入"></input>
        
            <button type="submit">添加</button>
            {/* 在表单内的 <button> 元素如果没有显式指定 type 属性，其默认行为是 type="submit"，这意味着点击按钮会触发表单的提交事件 */}
        </form>
        </>
    )
}
