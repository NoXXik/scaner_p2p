import {combineReducers, configureStore} from "@reduxjs/toolkit";
import orderReducer from "./reducers/UserSlice";
import {orderAPI} from "../services/APIService";

const rootReducer = combineReducers({
    user: orderReducer,
    [orderAPI.reducerPath]: orderAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(orderAPI.middleware)
    })
}
export const selectUser = (state: RootState) => state.user
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
