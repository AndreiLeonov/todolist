import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    id: string
    title: string
    changeFilter: (newFilterValue: FilterValuesType, todolostId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolostId: string) => void
    changeTodoListTitle: (todolostId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {


    let tasksObj = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

    let dispatch = useDispatch();

    let tasksForTodoList = tasksObj;
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
    }

    const AllClickHandler = () => props.changeFilter("all", props.id);
    const ActiveClickHandler = () => props.changeFilter("active", props.id);
    const CompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    //const addTask = (title: string) => dispatch(addTaskAC(title, props.id));
    const addTask = useCallback( (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch]);


    return (<div>
            <h3><EditSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {tasksForTodoList.map((t) => {

                    const removeTaskHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let NewCheckBoxValue = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(t.id, NewCheckBoxValue, props.id));
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(props.id, t.id, newTitle));
                    }

                    return (
                        <div key={t.id} className={t.isDone ? "isDone" : ""}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={changeTaskStatus}
                            />
                            <EditSpan
                                title={t.title}
                                saveNewTitle={changeTaskTitle}
                            />
                            <IconButton onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "text"}
                    color={"default"}
                    onClick={AllClickHandler}>ALL</Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={ActiveClickHandler}>ACTIVE
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={CompletedClickHandler}>COMPLETED
                </Button>
            </div>
        </div>
    );
}
