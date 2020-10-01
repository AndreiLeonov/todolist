import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditSpan} from "./EditSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    //removeTaskHandler: (taskId: string, todolistId: string) => void
    //changeTaskStatus: (taskId: string, NewCheckBoxValue: boolean ,todolistId: string) => void
    //changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    let dispatch = useDispatch();
    const removeTaskHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let NewCheckBoxValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, NewCheckBoxValue, props.todolistId));
    }
    const changeTaskTitle = useCallback( (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newTitle));
    }, [dispatch, props.todolistId, props.task.id])

    return (
        <div key={props.task.id} className={props.task.isDone ? "isDone" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditSpan
                title={props.task.title}
                saveNewTitle={changeTaskTitle}
            />
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});