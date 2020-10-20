import axios from 'axios'

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '47abf291-5646-442e-a8b1-279217d07bf7'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists/`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    },
}
