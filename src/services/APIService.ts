import {createApi, fetchBaseQuery, FetchBaseQueryMeta} from "@reduxjs/toolkit/dist/query/react";
import {IOrder} from "../models/IOrder";
import {IUser, IUserLogin, IUserReg, UserState} from "../models/IUser";
import {useAppSelector} from "../hooks/redux";
import {setAuth, userLogout} from "../store/reducers/UserSlice";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import {RootState} from "../store/store";

interface OrdersBody {
    limit: number,
    fiat: string,
    assets: string[],
    payments: string[],
}

const FetchBaseQueryAuth = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
    prepareHeaders: (headers: Headers, { getState }) => {
        const token = (getState() as RootState).user.access_token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const BaseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await FetchBaseQueryAuth(args, api, extraOptions)
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserState
    console.log(`${user.refresh_token} userrrrr`,)
    if (result.error && result.error.status === 401) {
        const resultRefresh = await FetchBaseQueryAuth({url: '/user/refresh', method: "POST", body: {refresh_token: user.refresh_token, user: user.user}}, api, extraOptions)
        if (resultRefresh.data) {
            const userRes = resultRefresh.data as UserState
            console.log('setAuth')
            api.dispatch(setAuth({access_token: userRes.access_token, refresh_token: userRes.refresh_token, user: userRes.user}))
            console.log('result')
            result = await FetchBaseQueryAuth(args, api, extraOptions)
        } else {
            api.dispatch(userLogout())
        }
    }
    return result
}

export const orderAPI = createApi({
    reducerPath: "order",
    baseQuery: BaseQueryWithReAuth,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        fetchOrders: builder.mutation<IOrder[], OrdersBody>({
            query: ({limit, fiat, assets, payments}) => ({
                url: `/orders/search`,
                method: "POST",
                body: {
                    "asset": assets,
                    "fiat": [
                        fiat
                    ],
                    "amount": 5000,
                    "payment_method": payments,
                    "merchant_status": true
                }
            }),
        }),
        userRegistration: builder.mutation<any, IUserReg>({
            query: (userRegistration) => ({
                url: '/user/registration',
                method: "POST",
                body: {
                    "email": userRegistration.email,
                    "password": userRegistration.password
                }
            })
        }),
        userLogin: builder.mutation<UserState, IUserLogin>({
            query: (userLogin: IUserLogin) => ({
                url: '/user/login',
                method: "POST",
                body: {
                    "email": userLogin.email,
                    "password": userLogin.password
                },
            })
        }),
        refreshToken: builder.mutation<UserState, {refresh_token: string, user: IUser}>({
            query: (body:{refresh_token: string, user: IUser} ) => ({
                url: '/user/refresh',
                method: "POST",
                body: {
                    "refresh_token": body.refresh_token,
                    "user": body.user
                },
            })
        }),
        homePage: builder.query({
            query: () => ({
                url: '/',
                method: "GET"
            })
        })
    })
})

export const {
    useUserLoginMutation,
    useUserRegistrationMutation,
    useFetchOrdersMutation,
    useLazyHomePageQuery,
    useRefreshTokenMutation
} = orderAPI

