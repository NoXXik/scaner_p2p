import React, {FC} from 'react';
import {orderAPI} from "../services/APIService";
import {useInput} from "../hooks/UseInput";


const RegistrationForm: FC = () => {
    const [userRegistration, {data, isLoading, isSuccess, error}] = orderAPI.useUserRegistrationMutation()

    const registration = async (event: any, email: string, password: string) => {
        event.preventDefault()
        await userRegistration({email: email, password: password})
    }
    const email = useInput('', {isEmpty: true, minLenght: 8, isEmail: true})
    const password = useInput('', {isEmpty: true, minLenght: 8, maxLenght: 16, isPassword: true})
    const confirmPassword = useInput('', {
        isEmpty: true,
        minLenght: 8,
        maxLenght: 16,
        isPassword: true,
        confirmPassword: password.value
    })

    if (isSuccess) {
        return <h1>You are registered</h1>
    }

    return (
        <div>
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
                        {isLoading && <div>Loading</div>}
                        <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>
                        {(email.isDirty && email.isError) &&
                            <div style={{background: "red", color: "white"}}>{email.error}</div>}
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input onBlur={event => email.onBlur(event)} value={email.value}
                                   onChange={event => email.onChange(event)} className="input100" type="text"
                                   name="email"/>
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>
                        {(password.isDirty && password.isError) &&
                            <div style={{background: "red", color: "white"}}>{password.error}</div>}
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                            <input onBlur={event => password.onBlur(event)} value={password.value}
                                   onChange={event => password.onChange(event)} className="input100" type="password"
                                   name="pass"/>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>
                        {(confirmPassword.isDirty && confirmPassword.isError) &&
                            <div style={{background: "red", color: "white"}}>{confirmPassword.error}</div>}
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                            <input onBlur={event => confirmPassword.onBlur(event)} value={confirmPassword.value}
                                   onChange={event => confirmPassword.onChange(event)} className="input100"
                                   type="password" name="pass"/>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button
                                    disabled={!email.isActiveInput || !password.isActiveInput || !confirmPassword.isActiveInput}
                                    onClick={(e) => registration(e, email.value, password.value)}
                                    className="login100-form-btn">
                                    Registration
                                </button>
                            </div>
                        </div>
                        <div className="text-center p-t-115">
						<span className="txt1">
                            Do you have an account
                        </span>
                            <a className="txt2" href="/login">
                                Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;