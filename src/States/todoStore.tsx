import { create } from "zustand";

import { devtools } from "zustand/middleware";

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
}

export const todoStore = create<States & Actions>()(
    devtools((set) => ({
        todos: [],
        addTodo: (todo: TodoType) => set((state) => ({ todos: [todo, ...state.todos] })),
    }))
);