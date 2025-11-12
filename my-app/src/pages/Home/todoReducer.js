export const todoReducer=(state,action)=>{
    const now = new Date().toISOString();
    switch(action.type){
        case 'add':{
            return [
                ...state,
                {
                  id:crypto.randomUUID(),
                  title:action.title,
                  complete:action.complete || false,
                  priority: action.priority || 'medium',
                  dueDate: action.dueDate,
                  description: action.description || '',
                  createdAt: now,
                  updatedAt: now
                }

            ]
        }
        case 'toggletodo':{
            return state.map(todo=>{
                if(todo.id==action.id){
                  return{
                    ...todo,
                    complete:!todo.complete,
                    updatedAt: new Date().toISOString()
                  }
                }
                return todo;//
              })
        }
        case 'deletetodo':{
            return state.filter(todo=>{
                    return todo.id!==action.id
                  })

        }
        case 'toggleAlltodo':{
            return state.map(todo=>{
                return {
                  ...todo,
                  complete:action.complete,
                  updatedAt: new Date().toISOString()
                }
              })

        }
        case 'clearCompleteTodo':{
            return state.filter(todo=> !todo.complete)
        }
        case 'edittodo':{
            return state.map(todo=>{
                if(todo.id===action.id){
                  return {
                    ...todo,
                    title: action.title !== undefined ? action.title : todo.title,
                    description: action.description !== undefined ? action.description : todo.description,
                    priority: action.priority !== undefined ? action.priority : todo.priority,
                    dueDate: action.dueDate !== undefined ? action.dueDate : todo.dueDate,
                    updatedAt: new Date().toISOString()
                  }
                }
                return todo;
              })
        }
        case 'updatePriority':{
            return state.map(todo=>{
                if(todo.id===action.id){
                  return {
                    ...todo,
                    priority: action.priority,
                    updatedAt: new Date().toISOString()
                  }
                }
                return todo;
              })
        }
        case 'updateDueDate':{
            return state.map(todo=>{
                if(todo.id===action.id){
                  return {
                    ...todo,
                    dueDate: action.dueDate,
                    updatedAt: new Date().toISOString()
                  }
                }
                return todo;
              })
        }
        default: {
            throw Error('Unknown action: ' + action.type);
          }
    }
}