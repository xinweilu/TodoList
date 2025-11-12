import React,{useState, useRef, useEffect} from 'react'
import { Todo,ToggleTodo,ActionType, Priority } from './types'
import styles from './index.less'

interface TodoListItemProps{
    todo:Todo,
    dispatch:React.Dispatch<ActionType>
}

const priorityLabels: Record<Priority, string> = {
    high: '高',
    medium: '中',
    low: '低'
};

const priorityColors: Record<Priority, string> = {
    high: '#ff4444',
    medium: '#ffaa00',
    low: '#44aa44'
};

export const TodoListItem: React.FC<TodoListItemProps> = (props) => {
    const { todo,dispatch } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');
    const [editPriority, setEditPriority] = useState<Priority>(todo.priority || 'medium');
    const [editDueDate, setEditDueDate] = useState(todo.dueDate ? todo.dueDate.split('T')[0] : '');
    const [showDetails, setShowDetails] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    function handleChange(selectId:string){    
        dispatch({
            type: 'toggletodo', id:selectId
        });
    }

    function handleDelete(selectId:string){
        dispatch({
            type: 'deletetodo', id:selectId
        });
    }

    function handleDoubleClick() {
        setIsEditing(true);
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setEditPriority(todo.priority || 'medium');
        setEditDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : '');
    }

    function handleSave() {
        if (editTitle.trim()) {
            dispatch({
                type: 'edittodo',
                id: todo.id,
                title: editTitle.trim(),
                description: editDescription.trim() || undefined,
                priority: editPriority,
                dueDate: editDueDate || undefined
            });
            setIsEditing(false);
        }
    }

    function handleCancel() {
        setIsEditing(false);
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setEditPriority(todo.priority || 'medium');
        setEditDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : '');
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    }

    function formatDate(dateString?: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN');
    }

    function isOverdue(): boolean {
        if (!todo.dueDate || todo.complete) return false;
        return new Date(todo.dueDate) < new Date();
    }

    if (isEditing) {
        return (
            <li className={styles.todoItem}>
                <div className={styles.editForm}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.editInput}
                        placeholder="任务标题"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.editDescription}
                        placeholder="任务描述（可选）"
                        rows={2}
                    />
                    <div className={styles.editOptions}>
                        <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value as Priority)}
                            className={styles.editPriority}
                        >
                            <option value="low">低</option>
                            <option value="medium">中</option>
                            <option value="high">高</option>
                        </select>
                        <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className={styles.editDate}
                        />
                    </div>
                    <div className={styles.editActions}>
                        <button onClick={handleSave} className={styles.saveButton}>保存</button>
                        <button onClick={handleCancel} className={styles.cancelButton}>取消</button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li className={`${styles.todoItem} ${todo.complete ? styles.completed : ''}`}>
            <div className={styles.todoContent}>
                <label className={todo.complete ? styles.complete : undefined}>
                    <input 
                        type="checkbox" 
                        checked={todo.complete}  
                        onChange={() => handleChange(todo.id)}
                        className={styles.checkbox}
                    />
                    <span 
                        className={styles.todoTitle}
                        onDoubleClick={handleDoubleClick}
                    >
                        {todo.title}
                    </span>
                </label>
                
                <div className={styles.todoMeta}>
                    {todo.priority && (
                        <span 
                            className={styles.priorityBadge}
                            style={{ backgroundColor: priorityColors[todo.priority] }}
                        >
                            {priorityLabels[todo.priority]}
                        </span>
                    )}
                    {todo.dueDate && (
                        <span className={`${styles.dueDate} ${isOverdue() ? styles.overdue : ''}`}>
                            📅 {formatDate(todo.dueDate)}
                        </span>
                    )}
                </div>

                {todo.description && (
                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className={styles.toggleDescription}
                    >
                        {showDetails ? '隐藏详情' : '显示详情'}
                    </button>
                )}

                {showDetails && todo.description && (
                    <div className={styles.description}>
                        {todo.description}
                    </div>
                )}

                <div className={styles.todoActions}>
                    <button 
                        onClick={handleDoubleClick}
                        className={styles.editButton}
                        title="双击标题也可编辑"
                    >
                        ✏️
                    </button>
                    <button 
                        onClick={() => handleDelete(todo.id)}
                        className={styles.deleteButton}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </li>
    )
};
