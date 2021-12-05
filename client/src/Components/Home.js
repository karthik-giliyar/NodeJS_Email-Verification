import React  from 'react'
import { useNavigate } from 'react-router-dom'



function Home( ) {
    // HOOKES
    

    const navigate = useNavigate()
    
    return (
        <div>
            <div className="navbar">
                <div className="nav-container">
                    <div className="logo"><h2>Home</h2></div>
                    <div className="user-container">
                        <div className="nav"><h3 onClick ={navigate('/form')}>SignUp/SignIn</h3></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home
