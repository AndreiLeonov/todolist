import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'TODOLIST-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const getTodolists = () => {
        todolistAPI.getTodolist().then((response) => {
            setState(response.data)
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolists}>GET TODOLIST(S)</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <b>Todolist title:</b>
            <input
                placeholder={"Todolist Title"}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
                value={title}
            />
        </div>
        <button onClick={createTodolist}>CREATE TODOLIST</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])

    const [todolistId, setTodolistId] = useState("");
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <b>TodolistId:</b>
            <input
                placeholder={"TodolistId"}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
                value={todolistId}
            />
        </div>
        <button onClick={deleteTodolist}>DELETE TODOLIST</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState("");
    const [title, setTitle] = useState("");
    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <b>TodolistId</b>
            <input placeholder={"TodolistId"}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
                   value={todolistId}
            />
        </div>
        <div>
            <b>Title</b>
            <input
                placeholder={"Title"}
                onChange={(e) => setTitle(e.currentTarget.value)}
                value={title}
            />
        </div>
        <button onClick={updateTodolist}>UPDATE TODOLIST TITLE</button>
    </div>
}
