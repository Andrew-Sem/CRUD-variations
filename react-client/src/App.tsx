import {useEffect, useState} from "react";
import {ITodo} from "./types/ITodo";
import axios from "axios";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([])
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get<ITodo[]>(
                "http://localhost:8080/todos"
            );
            setTodos(response.data);
        };
        getData();
    }, [])
    return (
        <div className={"flex flex-col items-center justify-center space-y-4 h-screen"}>
            {todos.length !== 0 && todos.map(todo => (
                <div key={todo.id} className={"grid grid-cols-3 text-xl bg-neutral-100 hover:bg-neutral-200 rounded-lg p-4 cursor-pointer"}>
                    <div className={"w-4"}>{todo.id}</div>
                    <div className={"w-32"}>{todo.title}</div>
                    <div>{todo.description}</div>
                </div>
            ))}
        </div>
    )
}

export default App
