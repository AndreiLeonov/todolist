import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {ChangeTodolistTitleAC, todolistsReducer, RemoveTodolistAC, AddTodolistAC, ChangeTodolistFilterAC} from "./state/todolists-reducer";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {
            id: todolistId1,
            title: "WHAT TO LEARN?",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "WHAT TO BUY?",
            filter: "completed"
        }
    ]);

    // Используем хук useState
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {
    //         id: todolistId1,
    //         title: "WHAT TO LEARN?",
    //         filter: "all"
    //     },
    //     {
    //         id: todolistId2,
    //         title: "WHAT TO BUY?",
    //         filter: "completed"
    //     }
    // ]);

    let [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJs", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book HTMLS&CSS", isDone: true},
            {id: v1(), title: "Book JS", isDone: false},
        ]
    });

    function removeTask(taskId: string, todolistId: string) {
        const action = removeTaskAC(taskId, todolistId);
        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTasks(action);
    }

    function changeTodoListTitle(todolistId: string, newTitle: string) {
        const action = ChangeTodolistTitleAC (todolistId, newTitle);
        dispatchToTodolists(action);
    }

    function changeFilter(newFilterValue: FilterValuesType, todolostId: string) {
        const action = ChangeTodolistFilterAC (todolostId, newFilterValue);
        dispatchToTodolists(action);
    }

    let removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC (title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

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

                            let tasksForTodoList = tasksObj[tdlst.id];

                            if (tdlst.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                            }
                            if (tdlst.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                            }
                            return <Grid item>
                                <Paper elevation={10} style={{padding: '10px'}}>
                                    <TodoList
                                        key={tdlst.id}
                                        id={tdlst.id}
                                        title={tdlst.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tdlst.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
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


export default AppWithReducers;
