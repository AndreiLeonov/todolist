import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'TASKS-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f1d65134-cbe5-4a6d-8458-baf617b7e565'
        taskAPI.getTasks(todolistId)
            .then( (response) => {
                setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f1d65134-cbe5-4a6d-8458-baf617b7e565'
        taskAPI.createTask(todolistId,'!!!NEW TASK!!!')
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f1d65134-cbe5-4a6d-8458-baf617b7e565';
        const taskId = '6113af04-03b5-4f01-9f01-412c1138ef7d';
        taskAPI.deleteTask(todolistId, taskId)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f1d65134-cbe5-4a6d-8458-baf617b7e565';
        const taskId = '814d8e9a-e06a-4da0-ad0d-bca4616cc238';
        const newTitle = 'NEW TITLE'
        taskAPI.updateTaskTitle(todolistId,taskId,newTitle)
            .then( (response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
