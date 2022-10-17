import React, {useEffect} from 'react';
import "./components/form/css/main.css"
import "./components/form/css/util.css"
import LoginForm from "./components/LoginForm";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setAuth} from "./store/acton-creator/UserActions";
import {useSelector} from "react-redux";
import {useUserLoginMutation} from "./services/APIService";
import {IUser, UserState} from "./models/IUser";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import ProtectedPage from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import P2P from "./pages/P2P";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {selectUser} from "./store/store";


const App = () => {
    const dispatch = useAppDispatch()
    const userStore = useAppSelector(selectUser)as UserState
    const user = JSON.parse(localStorage.getItem("user") || "{}") as UserState

    useEffect(() => {
        dispatch(setAuth(user))
    }, [])
    return (
        <div>
            <Header props={user.user}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/registration' element={<RegistrationForm/>}/>
                    <Route path='/profile' element={<ProtectedPage children={<Portfolio/>}/>}/>
                    <Route path='/p2pscanner' element={<ProtectedPage children={<P2P/>}/>}/>
                </Routes>
        </div>
    );
};

export default App;