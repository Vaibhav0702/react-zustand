import { create } from "zustand";

import { devtools , persist } from "zustand/middleware";  // add dev tool as middelware

export interface TodoType {
    id: number;
    todo: string;
    isDone: boolean;
}

interface States {
    todos: TodoType[] | []; // Simplified type
}

interface Actions {
    addTodo: (todo: TodoType) => void;
    toggelTodo : (id : number , isChacked : boolean) => void;
    deleteTodo : (id : number) => void
}

export const todoStore = create<States & Actions>()(
    devtools(
        persist( // persist will add it to local storage 
        (set) => ({
            todos: [],
            addTodo: (todo: TodoType) => set((state) => ({ todos: [todo, ...state.todos] })),
            toggelTodo : (id : number , isChacked : boolean) => set((state) => ({
                 todos : state.todos.map((item) => {
                      if(item.id == id){
                        item.isDone = isChacked
                      }
                      return item
                 })
            })),
            deleteTodo : (id : number) => set((state)=>({
                  todos : state.todos.filter((item) => item.id !== id)
            }))
        }),
        {
            name : "todoStore"
        }
    ))
);