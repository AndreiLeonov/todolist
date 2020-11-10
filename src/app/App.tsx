import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography, CircularProgress} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import { logoutTC } from '../features/Login/authReducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    let dispatch = useDispatch()

    useEffect( () => {
        dispatch(initializeAppTC())
    }, [])

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const logoutHandler = useCallback( () => {
        dispatch(logoutTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn &&
                        <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/404'} render={() => <h1>404</h1>}/>
                        <Redirect to={'/404'} from={'*'}/>
                    </Switch>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App
