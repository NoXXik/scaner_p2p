import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser, UserState} from "../../models/IUser";



const initialState: UserState = {
    access_token: '',
    refresh_token: '',
    user: {
        email: '',
        id: 0,
        is_active: false,
        registration_date: '',
        subscribe: false,
        sub_expiration: '',
        role: '',
    },
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth (state, action: PayloadAction<UserState>) {
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.user = action.payload.user
        },
        userLogout (state) {
            localStorage.clear()
            state.access_token = ''
            state.refresh_token = ''
            state.user = initialState.user
        }
    }
})

export default userSlice.reducer
export const {setAuth, userLogout} = userSlice.actions