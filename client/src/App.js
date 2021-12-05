import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import Sign from './Components/Sign';
import NotFound from './Components/NotFound';


export const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/form" element={<Sign/>}/>
                <Route exact path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App;
