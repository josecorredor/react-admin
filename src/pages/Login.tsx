import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data}= await axios.post('/login', {
            email,
            password
        });
        setRedirect(true);
    }
    if (redirect){
        return <Navigate to={'/'}/>;
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="titleRegister">Sign In</h1>
                <div className="form-floating">
                <input type="email" className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="floatingPassword">Email</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" required  onChange={e => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                <p className="copy">&copy; 2021</p>
            </form>
        </main>
    )
};
    


export default Login;