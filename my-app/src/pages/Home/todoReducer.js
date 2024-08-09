export const todoReducer=(state,action)=>{
    switch(action.type){
        case 'add':{
            return [
                ...state,
                {
                  id:crypto.randomUUID(),
                  title:action.title,
                  complete:false
                }

            ]
        }
        case 'toggletodo':{
            return state.map(todo=>{
                if(todo.id==action.id){
                  return{
                    ...todo,
                    complete:!todo.complete
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
                  complete:action.complete
                }
              })

        }
        case 'clearCompleteTodo':{
            return state.filter(todo=> !todo.complete)
        }
        default: {
            throw Error('Unknown action: ' + action.type);
          }
    }
}