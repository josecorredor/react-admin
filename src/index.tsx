import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/RoleCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Products from './pages/products/Products';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import Orders from './pages/orders/Orders';
import Profile from './pages/users/Profile';
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import Expenses from './pages/accounting/Expenses';
import ExpensesCreate from './pages/accounting/ExpensesCreate';
import ExpensesEdit from './pages/accounting/ExpensesEdit';

axios.defaults.withCredentials = true;
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<Dashboard/>} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Users" element={<Users />} />
        <Route path="Users/create" element={<UserCreate />} />
        <Route path="Users/:id_person/edit" element={<UserEdit />} />
        <Route path="roles" element={<Roles />} />
        <Route path="profile" element={<Profile />} />
        <Route path="roles/create" element={<RoleCreate />} />
        <Route path="roles/:id_role/edit" element={<RoleEdit />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/:id_product/edit" element={<ProductEdit />} />
        <Route path="orders" element={<Orders />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="expenses/create" element={<ExpensesCreate />} />
        <Route path="expenses/:id_expenses/edit" element={<ExpensesEdit />} />
      </Route>
      
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      
      <Route path="*" element={<main>
        <h2>Route no found</h2>
      </main>} /> 
    </Routes>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
