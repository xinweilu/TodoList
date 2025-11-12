import React,{useState,useMemo} from 'react'
import { TodoListItem } from './TodoListItem'
import { Todo,ToggleTodo,ToggleAllTodo,HandleShowIncomplete,ActionType, Priority } from './types'
import styles from './index.less'

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'none' | 'priority' | 'dueDate' | 'createdAt';

interface TodoListProps{
    todos:Todo[],
    dispatch:React.Dispatch<ActionType>
}

export const TodoList:React.FC<TodoListProps>=({todos,dispatch})=>{
    const [filter, setFilter] = useState<FilterType>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState<SortType>('none')
    const [complete, setComplete] = useState(true)

    const handleShowIncomplete: HandleShowIncomplete = () => {
        setFilter(filter === 'active' ? 'all' : 'active');
    }

    const filteredTodos = useMemo(() => {
        let result = todos;

        // Filter by status
        if (filter === 'active') {
            result = result.filter(todo => !todo.complete);
        } else if (filter === 'completed') {
            result = result.filter(todo => todo.complete);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(todo => 
                todo.title.toLowerCase().includes(query) ||
                todo.description?.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortBy !== 'none') {
            result = [...result].sort((a, b) => {
                switch (sortBy) {
                    case 'priority': {
                        const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
                        const aPriority = priorityOrder[a.priority || 'medium'];
                        const bPriority = priorityOrder[b.priority || 'medium'];
                        return bPriority - aPriority; // High priority first
                    }
                    case 'dueDate': {
                        if (!a.dueDate && !b.dueDate) return 0;
                        if (!a.dueDate) return 1;
                        if (!b.dueDate) return -1;
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    }
                    case 'createdAt': {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
                    }
                    default:
                        return 0;
                }
            });
        }

        return result;
    }, [todos, filter, searchQuery, sortBy]);

    const todoLeft: number = useMemo(() => {
        return todos.filter(todo => !todo.complete).length
    }, [todos])

    const completedCount = useMemo(() => {
        return todos.filter(todo => todo.complete).length
    }, [todos])

    const handleToggleAllTodo: ToggleAllTodo = () => {
        dispatch({
            type: 'toggleAlltodo', 
            complete: complete
        });
        setComplete(!complete)
    }

    function clearCompleteTodo() {
        dispatch({
            type: 'clearCompleteTodo'
        });
    }

    return(
        <div className={styles.todoListContainer}>
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索任务..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterButtons}>
                    <button 
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? styles.activeFilter : ''}
                    >
                        全部
                    </button>
                    <button 
                        onClick={() => setFilter('active')}
                        className={filter === 'active' ? styles.activeFilter : ''}
                    >
                        未完成
                    </button>
                    <button 
                        onClick={() => setFilter('completed')}
                        className={filter === 'completed' ? styles.activeFilter : ''}
                    >
                        已完成
                    </button>
                </div>

                <div className={styles.sortBox}>
                    <label htmlFor="sortSelect">排序:</label>
                    <select
                        id="sortSelect"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortType)}
                        className={styles.sortSelect}
                    >
                        <option value="none">默认</option>
                        <option value="priority">按优先级</option>
                        <option value="dueDate">按截止日期</option>
                        <option value="createdAt">按创建时间</option>
                    </select>
                </div>
            </div>

            <div className={styles.stats}>
                <span className={styles.statItem}>
                    剩余: <strong>{todoLeft}</strong> 项
                </span>
                <span className={styles.statItem}>
                    已完成: <strong>{completedCount}</strong> 项
                </span>
                <span className={styles.statItem}>
                    总计: <strong>{todos.length}</strong> 项
                </span>
            </div>

            <div className={styles.actions}>
                <label className={styles.toggleAllLabel}>
                    <input 
                        type="checkbox" 
                        checked={!complete} 
                        onChange={handleToggleAllTodo}
                        className={styles.toggleAllCheckbox}
                    />
                    全选
                </label>
                <button 
                    onClick={clearCompleteTodo}
                    className={styles.clearButton}
                    disabled={completedCount === 0}
                >
                    清除已完成
                </button>
            </div>

            {filteredTodos.length === 0 ? (
                <div className={styles.emptyState}>
                    {searchQuery ? '没有找到匹配的任务' : '暂无任务'}
                </div>
            ) : (
                <ul className={styles.todoList}>
                    {filteredTodos.map(todo => (
                        <TodoListItem key={todo.id} todo={todo} dispatch={dispatch} />
                    ))}
                </ul>
            )}
        </div>
    )
}
