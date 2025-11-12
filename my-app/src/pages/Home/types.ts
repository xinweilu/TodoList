export type Priority = 'high' | 'medium' | 'low';

export type Todo={
    id:string;
    title:string;
    complete:boolean;
    priority?: Priority;
    dueDate?: string; // ISO date string
    description?: string;
    createdAt: string; // ISO date string
    updatedAt?: string; // ISO date string
}

//接受一个名为selectedTodo的参数，该参数的类型是Todo  返回值类型为void 并不返回任何类型
export type ToggleTodo=(selectedTodo:Todo)=>void
export type AddTodo=(newTodo:string)=>void
export type ToggleAllTodo=()=>void
export type HandleShowIncomplete=()=>void
export type DeleteTodo=(selectId:string)=>void

// actions.ts
export type ActionType =
  | { type: 'add'; title: string; id?:string; complete?:boolean; priority?: Priority; dueDate?: string; description?: string }
  | { type: 'toggletodo'; title?: string; id:string; complete?:boolean }
  | { type: 'deletetodo'; title?: string; id:string; complete?:boolean }
  | { type: 'toggleAlltodo'; title?: string; id?:string; complete:boolean }
  | { type: 'clearCompleteTodo'; title?: string; id?:string; complete?:boolean }
  | { type: 'edittodo'; id: string; title?: string; description?: string; priority?: Priority; dueDate?: string }
  | { type: 'updatePriority'; id: string; priority: Priority }
  | { type: 'updateDueDate'; id: string; dueDate: string }

