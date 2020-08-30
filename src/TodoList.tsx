import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolostId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todolostId: string) => void
    addTask: (title: string, todolostId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolostId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolostId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolostId: string) => void
    changeTodoListTitle: (todolostId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const AllClickHandler = () => props.changeFilter("all", props.id);
    const ActiveClickHandler = () => props.changeFilter("active", props.id);
    const CompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addTask = (title: string) => props.addTask(title, props.id);


    return (<div>
            <h3><EditSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map((t) => {

                    const removeTaskHandler = () => props.removeTask(t.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let NewCheckBoxValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, NewCheckBoxValue, props.id)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id);
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
