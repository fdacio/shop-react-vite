import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Admin/Products';
import Users from '../pages/Admin/Users';
import Login from '../pages/Login';
import SignUp from '../pages/SingUp';


const AppRoutes: React.FC = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />  {/* Rota default */}
                <Route path='/products' Component={Products}/>
                <Route path='/users' Component={Users} />
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={SignUp} />
            </Routes>
        </BrowserRouter>

    );
};

export default AppRoutes;


