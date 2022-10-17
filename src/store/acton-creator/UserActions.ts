import {AppDispatch} from "../store";
import {userSlice} from "../reducers/UserSlice";
import {UserState} from "../../models/IUser";
import {useAppDispatch} from "../../hooks/redux";

export const setAuth = (user: UserState) => async (dispatch: AppDispatch) => {
    try {
        console.log("setAuth")
        dispatch(userSlice.actions.setAuth(user))
    } catch (e) {
        console.log(e)
    }
}

export const userLogout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userLogout())
    } catch (e) {
        console.log(e)
    }
}