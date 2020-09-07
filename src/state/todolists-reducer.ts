import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid"

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdlst => tdlst.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                ...state,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: "all"
                }
            ]
        case 'CHANGE-TODOLIST-TITLE':
            // let newState = {
            //     ...state
            // }
            // let todoList = state.find(t => t.id === action.id);
            // if (todoList) {
            //     todoList.title = action.title;
            // }
            // return newState
            //тоже самое, только через map
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);

        case 'CHANGE-TODOLIST-FILTER':
            // let newState = {
            //     ...state
            // }
            // let todoList = state.find(t => t.id === action.id);
            // if (todoList) {
            //     todoList.filter = action.filter;
            // }
            // return newState;

            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);

        default:
            throw new Error("IDK");
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle}
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
