import React from 'react';
import {auth,provider} from "../firebase.config";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuth}) => {
    const navigate = useNavigate();

    const signInWithGoogle = () =>{
        signInWithPopup(auth,provider)
        .then((result)=>{
            console.log(result)
            localStorage.setItem("isAuth",true)
            setIsAuth(true)
            navigate("react-blog/");
        })
        .catch((err)=>console.log(err.message))
    }
    return (
        <div className='loginPage'>
            <div>
                <p>Sign In with Google to continue</p>
                <button className='login-btn'
                 onClick={signInWithGoogle}>
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default Login;