import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'TASKS-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistIt] = useState("");
    const getTasks = () => {
        taskAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <b>TodolistId:</b>
            <input
                placeholder={"todolistId"}
                onChange={(e) => setTodolistIt(e.currentTarget.value)}
                value={todolistId}
            />
        </div>
        <div>
            <button onClick={getTasks}>GET TASK(S)</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistIt] = useState("");
    const [title, setTitle] = useState("");
    const createTask = () => {
        taskAPI.createTask(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <b>TodolistId:</b>
            <input
                placeholder={"todolistId"}
                onChange={(e) => setTodolistIt(e.currentTarget.value)}
                value={todolistId}
            />
        </div>
        <div>
            <b>Task Title:</b>
            <input
                placeholder={"taskTitle"}
                onChange={(e) => setTitle(e.currentTarget.value)}
                value={title}
            />
        </div>
        <button onClick={createTask}>CREATE TASK</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<any>("");
    const [todolistId, setTodolistId] = useState<any>("");
    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <div>
                <b>todolistId</b>
                <input
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                    placeholder={"todolistId"}
                    value={todolistId}/>
            </div>
            <div>
                <b>taskId</b>
                <input
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                    placeholder={"taskId"}
                    value={taskId}/>
            </div>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<any>("");
    const [todolistId, setTodolistId] = useState<any>("");
    const [title, setTitle] = useState<any>("");
    const updateTask = () => {
        taskAPI.updateTaskTitle(todolistId, taskId, title)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <b>todolistId</b>
            <input
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
                placeholder={"todolistId"}
                value={todolistId}/>
        </div>
        <div>
            <b>taskId</b>
            <input
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
                placeholder={"taskId"}
                value={taskId}/>
        </div>
        <div>
            <b>New Title for Task</b>
            <input
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
                placeholder={"New Title"}
                value={title}/>
        </div>
        <button onClick={updateTask}>UPDATE TASK</button>
    </div>
}
