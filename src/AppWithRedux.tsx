import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {ChangeTodolistTitleAC, RemoveTodolistAC, AddTodolistAC, ChangeTodolistFilterAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType } from './state/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);

    let dispatch = useDispatch();

    function changeTodoListTitle(todolistId: string, newTitle: string) {
        const action = ChangeTodolistTitleAC (todolistId, newTitle);
        dispatch(action);
    }

    function changeFilter(newFilterValue: FilterValuesType, todolostId: string) {
        const action = ChangeTodolistFilterAC (todolostId, newFilterValue);
        dispatch(action);
    }

    let removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId);
        dispatch(action);
    }

    const addTodoList = useCallback( (title: string) => {
        dispatch(AddTodolistAC (title))
    },[dispatch]);

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tdlst) => {

                            return <Grid item>
                                <Paper elevation={10} style={{padding: '10px'}}>
                                    <TodoList
                                        key={tdlst.id}
                                        id={tdlst.id}
                                        title={tdlst.title}
                                        changeFilter={changeFilter}
                                        filter={tdlst.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
