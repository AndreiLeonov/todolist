import axios from 'axios'

type CommonResponseType<T={}> = {
    resultCode: number
    messages: string[] //Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '47abf291-5646-442e-a8b1-279217d07bf7'
    }
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists/`)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>(`todo-lists/`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
}
