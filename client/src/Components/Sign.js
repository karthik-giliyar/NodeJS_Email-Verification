import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import {faKey} from '@fortawesome/free-solid-svg-icons'

function Sign() {
    // HOOKS
    const [show, setShow] = useState(true);
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signInEmail, setSignInEmail] = useState("");
    const [otp, setOTP] = useState();


    const navigate = useNavigate();


    // SELECTOR
    const headerTwo = document.getElementsByClassName("header-two")[0]
    const headerOne = document.getElementsByClassName("header-one")[0]
    // const message = document.getElementsByClassName("message")[0]
    // const timer = document.getElementsByClassName("timer")[0]

    //FUNCTIONS 
    if(headerTwo !== undefined){
        if(show === true){
            headerOne.classList.remove("selected")
            headerTwo.classList.add("selected")
        }
    }
    if(show === false){
        headerOne.classList.add("selected")
        headerTwo.classList.remove("selected")
    }
    
    const signup = (event) => {
        event.preventDefault()

        const signuprequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:signUpEmail, password:signUpPassword })
        };

        fetch('http://localhost:8000/api/user/signup', signuprequest)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    console.log(data)
                    navigate('/')
                }
                else{
                    console.log(data)
                }
            })
            .catch(error => console.log('error', error));
            

    }

    const otprequst = (event) => {

        event.preventDefault()

        const signinrequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:signInEmail })
        };

        fetch('http://localhost:8000/api/user/signin', signinrequest)
            .then(response => response.json())
            .then(data =>  console.log(data))
            .catch(error => console.log('error', error));

    }

    const signin = (event) => {
        event.preventDefault()

        const signincheck = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:signInEmail, otp: otp })
        };

        fetch('http://localhost:8000/api/user/verify', signincheck)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.success){
                    console.log(data)
                    navigate('/')
                }else{
                    console.log(data)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="banner">
            <div className="main-container">
                <div className="sub-container-one">
                    <div className="sub-container-two">
                        <div className="header-container">
                            <div className="header-one" onClick={()=>setShow(true)}>Sign Up</div>
                            <div className="header-two selected" onClick={()=>setShow(false)}> Sign In</div>
                        </div>
                        <div className="form-container" >
                            <div className="form-one" style={{display:show?"block":"none"}}>
                                <form onSubmit={signup}>
                                    <FontAwesomeIcon className="fa-icon-one" icon={faUser} />
                                    <input type="email" name="email" placeholder="Enter Email Here ... " onChange={ e => setSignUpEmail(e.target.value)} required/><br/>
                                    <FontAwesomeIcon className="fa-icon-two" icon={faLock} />
                                    <input type="password" placeholder="Enter Password Here ..." onChange={ e => setSignUpPassword(e.target.value)} required/><br/>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                            <div className="form-two" style={{display:show?"none":"block"}}>
                                <form>
                                    <FontAwesomeIcon className="fa-icon-three" icon={faUser} />
                                    <input type="email" name="email" placeholder="Enter Email Here ... " onChange={ e => setSignInEmail(e.target.value)} required/><br/>
                                    <FontAwesomeIcon className="fa-icon-four" icon={faKey} />
                                    <input type="number" placeholder="Enter OTP Here ..." onChange={ e => setOTP(e.target.value)} required/><br/>
                                    <input type="text" className="hidden" name="val" />
                                </form>

                                <div className="otp-logout-container">
                                    <button onClick={otprequst}>get OTP</button>
                                    <div className="message-box">
                                        <p className="message">.</p>
                                        <h3 className="timer">.</h3>
                                    </div>
                                <button onClick={signin}>Login</button>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign;
