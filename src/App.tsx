import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(taskId: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter((t: TaskType) => t.id !== taskId);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(newFilterValue: FilterValuesType, todolostId: string) {
        let todolist = todolists.find(tdlst => tdlst.id === todolostId);
        if (todolist) {
            todolist.filter = newFilterValue;
            setTodolists([...todolists]);
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    function changeTodoListTitle(todolistId: string, newTitle: string) {
        let todoList = todolists.find(t => t.id === todolistId);
        if (todoList) {
            todoList.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tdlst => tdlst.id !== todolistId);
        setTodolists(filteredTodolist);

        delete tasksObj[todolistId];
        setTasks({...tasksObj});

    }

    let [tasksObj, setTasks] = useState({
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

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodolistType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        };
        setTodolists([...todolists, newTodoList]);
        setTasks({
            ...tasksObj, [newTodoListId]: []
        })

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


export default App;
