import {authAPI} from "../api/todolists-api"
import {setIsLoggedInAC} from "../features/Login/authReducer"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//asyncThunks:
export const initializeAppTC = createAsyncThunk( "app/initializeAppTC", async (param, thunkAPI) => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value:true}));
        } else {
        }
        return;
    });

const slice = createSlice( {
    name: "app",
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error;
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
          });
    }
})

export const appReducer = slice.reducer;
export const {setAppErrorAC, setAppStatusAC} = slice.actions

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>