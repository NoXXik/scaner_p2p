import React, {FC, useEffect, useState} from 'react';
import {useInput} from "../hooks/UseInput";
import {useUserRegistrationMutation, useUserLoginMutation, useFetchOrdersMutation, orderAPI} from "../services/APIService"
import {setAuth} from "../store/acton-creator/UserActions";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../hooks/redux";
import {useNavigate} from "react-router-dom";

const LoginForm: FC = () => {
    const [userLogin, {data: loginData, isSuccess: loginIsSuccess, isLoading: loginIsLoading, error: loginError}] = useUserLoginMutation()
    const email = useInput('', {isEmpty: true, minLenght: 8, isEmail: true})
    const password = useInput('', {isEmpty: true, minLenght: 8, maxLenght: 16, isPassword: true})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        await userLogin({email: email.value, password: password.value})
    }

    useEffect(() => {
        if (loginIsSuccess && loginData) {
            dispatch(setAuth({...loginData}))
            navigate('/')
        }
    }, [loginIsSuccess])

    if (loginError) {
        console.log(loginError)
    }

    return (
        <div>
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
                        {loginIsLoading && <div>Loading</div>}
                        <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>
                        {(email.isDirty && email.isError) && <div style={{background: "red", color: "white"}}>{email.error}</div>}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input onBlur={event => email.onBlur(event)} value={email.value} onChange={event => email.onChange(event)} className="input100" type="text" name="email"/>
                                <span className="focus-input100" data-placeholder="Email"></span>
                        </div>
                        {(password.isDirty && password.isError) && <div style={{background: "red", color: "white"}}>{password.error}</div>}
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                            <input onBlur={event => password.onBlur(event)} value={password.value} onChange={event => password.onChange(event)} className="input100" type="password" name="pass"/>
                                <span className="focus-input100" data-placeholder="Password"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button disabled={!email.isActiveInput || !password.isActiveInput} onClick={(e) => handleLogin(e)} className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="text-center p-t-115">
						<span className="txt1">
							Don’t have an account?
						</span>

                            <a className="txt2" href="/registration" style={{cursor: 'pointer'}}>
                                Sign Up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;