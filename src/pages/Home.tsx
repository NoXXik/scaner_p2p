import React from 'react';
import {useLazyHomePageQuery} from "../services/APIService";
import {userLogout} from "../store/reducers/UserSlice";
import {useAppDispatch} from "../hooks/redux";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [homePage, {data, error}] = useLazyHomePageQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    console.log(data)

    const handleHomepage = (e: any) => {
        e.preventDefault()
        homePage('/')
        console.log(localStorage.getItem('user'))
    }

    const handleLogout = (e: any) => {
        e.preventDefault()
        dispatch(userLogout())
        navigate('/login')
    }
    return (
        <div>
            Home page
            <div>
                <button onClick={(e) => handleHomepage(e)} style={{background: 'gray', borderRadius: 3}}>homepage</button>
            </div>
            <div>
                <button onClick={(e) => handleLogout(e)} style={{background: 'gray', borderRadius: '5'}}>logout</button>
            </div>
        </div>
    );
};

export default Home;