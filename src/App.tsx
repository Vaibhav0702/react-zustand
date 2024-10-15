import { useState } from "react"
import { todoStore } from "./States/todoStore"


import deleteButton from "../src/delete-svgrepo-com.svg";


function App() {

  const [todo, setTodo] = useState("");

  const store = todoStore(); // connect Store


  // create Random ID
  const ranDomId = (): number => {
    const min = 1000;
    const max = 9999;

    return Math.round(Math.random() * (max - min + 1)) + min;
  }


  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault(); // prevent refresh

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

           <div className="mt-5">

              {
                store.todos.length > 0 && store.todos.map((item) => (
                    <div className="w-full rounded-lg p-2 border border-green-300 mb-2 flex justify-between items-center" key={item.id}>
                         <h1 className={`${item.isDone ? "line-through" :""}`}>{item.todo}</h1>

                         <div className="flex ">
                             <input className="m-2" type="checkbox" onChange={(e)=> store.toggelTodo( item.id , e.target.checked)} checked={item.isDone} />
                        
                            <img src={deleteButton} alt="deleteButton" className="w-[20px] m-2" onClick={()=> store.deleteTodo(item.id)} />
                         </div>
                    </div>
                ))
              }

           </div>

        </div>
      </div>
    </>
  )
}

export default App
