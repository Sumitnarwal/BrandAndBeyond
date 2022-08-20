

import React, { useState } from 'react'
import axios from "axios"
import "./Auth.css"
import { useNavigate } from 'react-router-dom'

//import Logo from "../../img/logo.png"
//import { useDispatch } from 'react-redux'
//import {  useSelector } from 'react-redux'
//import { login,signUp } from '../../Actions/AuthAction.jsx'


function Auth() {
    const [isSignUp, setIsSignUp] = useState(true)
    const [isSignUpError, setSignUpError] = useState(false)
    const [signUpErrorMsg, setSignUpErrorMsg] = useState('');

    const [isLoginError, setLoginError] = useState(false)
    const [loginErrorMsg, setloginErrorMsg] = useState('');

    const navigate = useNavigate()
    const loading = true
    const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", email: "",dateOfBirth:"" })

    const [confirmPass, setConfirmPass] = useState(true)
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            data.password === data.confirmpass ? submitUserInfo(data) : setConfirmPass(false);

        }
        else {
            loginUser(data)
        }
    }

    const loginUser = (data) => {

        axios.post("http://localhost:1234/login",
            {
                email: data.email,
                password: data.password,
            }
        )
            .then(res => {
                if (res.status == 200) {
                    //     console.log(res.data.user)
                    sessionStorage.setItem('LoggedUser', JSON.stringify(res.data.user));
                    navigate("/profile", { replace: true })

                }
            })
            .catch(err => {
                if (err) {
                     alert("Id or Password is Incorrect")

                }
            })

    }
    const submitUserInfo = (data) => {
        //api call for sunmit user
        axios.post("http://localhost:1234/register",
            {
                email: data.email,
                lastname: data.lastname,
                firstname: data.firstname,
                password: data.password,
                dateOfBirth:data.dateOfBirth
            }
        )
            .then(res => {
                if (res.status == 200) {
                    setSignUpError(true);
                    console.log(res.data.user)
                    sessionStorage.setItem('LoggedUser', JSON.stringify(res.data.user));
                    navigate("/profile")
                }
            })
            .catch(err => {
                if (err) {
                    // console.log(err.response.data.message)
                    setSignUpError(true);
                    setSignUpErrorMsg(err.response.data.message)

                }
            })
    }
    const resetform = () => {
        setConfirmPass(true)
        setData({ firstname: "", lastname: "", password: "", confirmpass: "", email: "",dateOfBirth:"" })
    }
    return (

        <div className='Auth'>

            <div className='a-right'>
                <form className='infoForm authForm' onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Login In"}</h3>

                    {isSignUp && <div>
                        <input required type={"text"} value={data.firstname} placeholder="First Name" className='infoInput' name='firstname' onChange={handleChange} />
                        <input required type={"text"} value={data.lastname} placeholder="Last Name" className='infoInput' name='lastname' onChange={handleChange} />
                    </div>
                    }
                    {isSignUp &&    <div>
                    <input required type="date" value={data.dateOfBirth} className='infoInput' name='dateOfBirth' placeholder='dateOfBirth' onChange={handleChange} />
                </div>
                    }
                    <div>
                        <input required type="email" value={data.email} className='infoInput' name='email' placeholder='Email' onChange={handleChange} />
                    </div>
                    <div>
                        <input required type="password" value={data.password} className='infoInput' name='password' placeholder='Password' onChange={handleChange} />

                        {isSignUp &&
                            <input required type="password" value={data.confirmpass} className='infoInput' name='confirmpass' placeholder='Conform Password' onChange={handleChange} />
                        }
                    </div>
                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "15px" }}>
                        *Conform Password is not same
                    </span>
                  
                    <div>
                        <span style={{ fontSize: "14px", cursor: "pointer", color: "Blue" }} onClick={() => { setIsSignUp((prev) => !prev); resetform() }}>
                            {isSignUp ?
                                "Already have an account. Login!" : "Dont't have an account? Sign Up"

                            }
                        </span>
                    </div>
                    <div>
                        <span style={{ fontSize: "14px", cursor: "pointer", color: "Red" }} >
                            {isSignUpError ?
                                signUpErrorMsg : ""
                            }
                        </span>
                    </div>
                    <button type='submit' className='button infoButton'
                    //     dispatch={loading}
                    >
                        {isSignUp ?
                            "Signup" : "Log In"
                        }

                    </button>
                </form>
            </div>
        </div>

    )
}





export default Auth