import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Admin/Products';
import Users from '../pages/Admin/Users';
import Login from '../pages/Login';
import SignUp from '../pages/SingUp';
import MyOrders from '../pages/Customer/MyOrders';
import MyProfile from '../pages/Customer/MyProfile';
import Orders from '../pages/Admin/Orders';
import Customers from '../pages/Admin/Customers';


const AppRoutes: React.FC = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />  {/* Rota default */}
                <Route path='/my-orders' Component={MyOrders}/>
                <Route path='/my-profile' Component={MyProfile}/>
                <Route path='/products' Component={Products}/>
                <Route path='/orders' Component={Orders} />
                <Route path='/customers' Component={Customers} />
                <Route path='/users' Component={Users} />
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={SignUp} />
            </Routes>
        </BrowserRouter>

    );
};

export default AppRoutes;


