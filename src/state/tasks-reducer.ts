import {TasksStateType} from "../App";
import {v1} from "uuid"
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskType} from "../TodoList";

export type removeTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

export type addTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}

export type changeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionTypes =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            let newTodolist = [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todolistId]: newTodolist};
        case 'ADD_TASK':
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todolistId]: changeTitleAndStatus(state[action.todolistId], action.taskId, action.isDone)
            };
        case 'CHANGE_TASK_TITLE':
            return {
                ...state, [action.todolistId]: changeTitleAndStatus(state[action.todolistId], action.taskId, action.title)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []};
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState;
        default:
            throw new Error("IDK");
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string,): changeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', todolistId, taskId, title}
}

let changeTitleAndStatus = (tasks: Array<TaskType>, taskId: string, property: string | boolean): Array<TaskType> => {
    let propertyName = typeof property === "string" ? 'title' : 'isDone';
    return [...tasks.map(task => {
        if (task.id !== taskId) {
            return task
        } else {
            return {...task, [propertyName]: property}
        }
    })]
}
