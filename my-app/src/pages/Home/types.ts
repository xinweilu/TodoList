export type Todo={
    id:string;
    title:string;
    complete:boolean
}

//接受一个名为selectedTodo的参数，该参数的类型是Todo  返回值类型为void 并不返回任何类型
export type ToggleTodo=(selectedTodo:Todo)=>void
export type AddTodo=(newTodo:string)=>void
export type ToggleAllTodo=()=>void
export type HandleShowIncomplete=()=>void
export type DeleteTodo=(selectId:string)=>void

// actions.ts
export type ActionType =
  | { type: 'add'; title: string,id?:string,complete?:boolean }
  | { type: 'toggletodo'; title?: string,id:string,complete?:boolean }
  | { type: 'deletetodo'; title?: string,id:string,complete?:boolean }
  | { type: 'toggleAlltodo'; title?: string,id?:string,complete:boolean }
  | { type: 'clearCompleteTodo'; title?: string,id?:string,complete?:boolean }

