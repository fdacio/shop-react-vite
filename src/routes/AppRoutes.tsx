import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Admin/Products';
import Users from '../pages/Admin/Users';
import Login from '../pages/Login';


const AppRoutes: React.FC = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />  {/* Rota default */}
                <Route path='/products' Component={Products}/>
                <Route path='/users' Component={Users} />
                <Route path="/login" Component={Login} />
            </Routes>
        </BrowserRouter>

    );
};

export default AppRoutes;


