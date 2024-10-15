import { useState } from "react"
import { todoStore } from "./States/todoStore";

function App() {

  const [todo, setTodo] = useState("");

  const store = todoStore();



  const ranDomId = (): number => {
    const min = 1000;
    const max = 9999;

    return Math.round(Math.random() * (max - min + 1)) + min;
  }


  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();


    if (todo.length > 0) {
      store.addTodo({
        id: ranDomId(),
        todo: todo,
        isDone: false
      })
    }

    setTodo('')

  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[600px] p-3 rounded-md shadow-lg bg-[#242424]">
          <h1 className="font-bold text-3xl">Todos</h1>
          <p>Add your daily task</p>

          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <input type="text" className="w-full h-10 p-2 rounded bg-[#282828] outline-red-400 border border-red-400" placeholder="Enter your task" onChange={(e) => setTodo(e.target.value)} value={todo} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
