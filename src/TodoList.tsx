import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

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

export const TodoList = React.memo( (props: PropsType) => {
    console.log("TodoList")


    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

    let dispatch = useDispatch();

    let tasksForTodoList = tasks;
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
    }

    const AllClickHandler = useCallback( () => props.changeFilter("all", props.id),[props.changeFilter, props.id] );
    const ActiveClickHandler = useCallback( () => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const CompletedClickHandler = useCallback( () => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = useCallback( (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id]);

    const addTask = useCallback( (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id]);


    return (<div>
            <h3><EditSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                    tasksForTodoList.map(t => <Task
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />)
                }
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
})

