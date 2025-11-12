import React, { ChangeEvent,useState } from 'react'
import { AddTodo,ActionType, Priority } from './types'
import styles from './index.less'

interface AddTodoFormProps{
    dispatch:React.Dispatch<ActionType>
}

export  const AddtoForm:React.FC<AddTodoFormProps>=({dispatch})=>{
    const [newTodo,setNewTodo]=useState<string>('')
    const [description,setDescription]=useState<string>('')
    const [priority,setPriority]=useState<Priority>('medium')
    const [dueDate,setDueDate]=useState<string>('')
    const [showAdvanced,setShowAdvanced]=useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
      };
    
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as Priority);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newTodo.trim() === '') {
            return;
        }
        dispatch({
            type: 'add', 
            title: newTodo,
            description: description.trim() || undefined,
            priority: priority,
            dueDate: dueDate || undefined
        });
        setNewTodo('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setShowAdvanced(false);
    };
    
    return(
        <form onSubmit={handleSubmit} className={styles.addForm}>
            <div className={styles.formRow}>
                <input 
                    type="text" 
                    id="todoInput" 
                    value={newTodo} 
                    onChange={handleInputChange} 
                    placeholder="添加新任务..."
                    className={styles.todoInput}
                />
                <button type="submit" className={styles.addButton}>添加</button>
            </div>
            
            <button 
                type="button" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={styles.toggleAdvanced}
            >
                {showAdvanced ? '收起' : '更多选项'}
            </button>
            
            {showAdvanced && (
                <div className={styles.advancedOptions}>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">描述:</label>
                        <textarea 
                            id="description"
                            value={description} 
                            onChange={handleDescriptionChange} 
                            placeholder="任务描述（可选）"
                            className={styles.descriptionInput}
                            rows={3}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="priority">优先级:</label>
                        <select 
                            id="priority"
                            value={priority} 
                            onChange={handlePriorityChange}
                            className={styles.prioritySelect}
                        >
                            <option value="low">低</option>
                            <option value="medium">中</option>
                            <option value="high">高</option>
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="dueDate">截止日期:</label>
                        <input 
                            type="date" 
                            id="dueDate"
                            value={dueDate} 
                            onChange={handleDueDateChange}
                            className={styles.dateInput}
                        />
                    </div>
                </div>
            )}
        </form>
    )
}
